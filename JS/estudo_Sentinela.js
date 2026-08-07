let arrayEstudosSentinela = JSON.parse(localStorage.getItem('arrayEstudosSentinela')) || [];
let codigosUtilizados = JSON.parse(localStorage.getItem('codigosUtilizados')) || [];

window.onload = function () {
    let elementoModal = document.getElementById('modalCadastroAnotacaoSentinela');

    /*if(elementoModal){
        const modal = new bootstrap.Modal(elementoModal);
        modal.show();

        document.getElementById('btnTodasAnotacoes').click()
        document.getElementById('btnChevronCitacao').click()

    }*/

    mostraDataAtualSentinela('dataEstudoSentinela');
    mostraDataAtualSentinela('dataAtualizacaoAnotacaoSentinela');
    populaLivrosBiblicos();
    defineDataInicialSentinela()
    atualizaAccordionLivrosBiblicos();
};

function defineDataInicialSentinela() {

    const campoDataInicial = document.getElementById("dataInicialVerificaDiasReunioes");

    if (!campoDataInicial) {
        console.log("Campo de data inicial não encontrado.");
        return;
    }

    if (!arrayEstudosSentinela || arrayEstudosSentinela.length === 0) {
        console.log("Nenhum estudo da Sentinela cadastrado.");
        return;
    }

    let registroMaisAntigo = arrayEstudosSentinela[0];

    for (let i = 1; i < arrayEstudosSentinela.length; i++) {

        if (new Date(arrayEstudosSentinela[i].data) < new Date(registroMaisAntigo.data)) {
            registroMaisAntigo = arrayEstudosSentinela[i];
        }
    }

    campoDataInicial.value = registroMaisAntigo.data;

    console.log("Data inicial Sentinela:", registroMaisAntigo.data);
}

class Anotacao {
    constructor(tipo, dataAtualizacao, anotacaoPessoal,numeroParagrafo) {
        this.tipo = tipo;
        this.registros = [
            {
                dataAtualizacao: dataAtualizacao,
                anotacaoPessoal: anotacaoPessoal,
                numeroParagrafo: numeroParagrafo
            }
        ];
    }
}

class EstudoSentinela {
    constructor(id, data, diaSemana, titulo, objetivoEstudo, totalParagrafos, status) {
        this.id = String(id);
        this.data = data;
        this.diaSemana = diaSemana;
        this.titulo = titulo;
        this.objetivoEstudo = objetivoEstudo;
        this.totalParagrafos = totalParagrafos;
        this.anotacoes = [];
        this.status = status;
    }

    adicionarAnotacao(tipo, dataAtualizacao, anotacaoPessoal, numeroParagrafo) {
    let tipoEncontrado = this.anotacoes.find(
        anotacao => anotacao.tipo === tipo
    );
    
    if (!tipoEncontrado) {
        let novaAnotacao = new Anotacao(
            tipo,
            dataAtualizacao,
            anotacaoPessoal,
            numeroParagrafo
        );
        this.anotacoes.push(novaAnotacao);
    } 
    
    else {
        tipoEncontrado.registros.push({
            dataAtualizacao: dataAtualizacao,
            anotacaoPessoal: anotacaoPessoal,
            numeroParagrafo: numeroParagrafo
        });
    }}
}

/* ------------------------------[ok] ------------------------------ */
function formatarData(data) {
    if (!data) return "";

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}
/* ------------------------------[ok] ------------------------------ */
function salvarDadosNavegador() {
    localStorage.setItem(
        'arrayEstudosSentinela',
        JSON.stringify(arrayEstudosSentinela)
    );

    localStorage.setItem(
        'codigosUtilizados',
        JSON.stringify(codigosUtilizados)
    );
}

/* ------------------------------[ok] ------------------------------ */
function mostraDataAtualSentinela(idCampo) {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();

    var dataAtual = `${ano}-${mes}-${dia}`;

    var campo = document.getElementById(idCampo);

    if (campo) {
        campo.value = dataAtual;
    }
}

/* ------------------------------[ok] ------------------------------ */
function verificaQtdDiasSentinela() {
    let dataInicial = document.getElementById('dataInicialVerificaDiasReunioes').value;
    let dataFinal = document.getElementById('dataFinalVerificaDiasReunioes').value;
    let diaSemanaReuniao = Number(document.getElementById("diaReuniaoFinalSemana").value);
    const exibicaoDatasSentinela = document.getElementById('exibicaoDatasSentinela');

    if (dataInicial === '' || dataFinal === '') {
        alert('A data INICIAL e FINAL do período deve ser informada');
        return;
    }

    if (dataFinal < dataInicial) {
        verificaValidadeDataFinal();
        return; 
    }

    // Criamos uma cópia para não modificar o objeto Date original de forma inesperada
    let inicio = new Date(dataInicial + "T00:00:00");
    let fim = new Date(dataFinal + "T00:00:00");

    exibicaoDatasSentinela.innerHTML = '';

    while (inicio <= fim) {
        if (inicio.getDay() === diaSemanaReuniao) {
            
            let dataExibicao = inicio.toLocaleDateString('pt-BR'); 
            
            let ano = inicio.getFullYear();
            let mes = String(inicio.getMonth() + 1).padStart(2, '0');
            let dia = String(inicio.getDate()).padStart(2, '0');
            let dataFormatadaISO = `${ano}-${mes}-${dia}`;

            let estudoEncontrado = arrayEstudosSentinela.find(element => element.data === dataFormatadaISO);

            let coluna = document.createElement('div');
            coluna.classList.add('col-6');

            let botao = document.createElement('button');
            botao.classList.add('btn', 'btn-sm', 'w-100', 'm-1');
            
            botao.onclick = function () {
                recuperaDadosSentinela(dataFormatadaISO);
            };
            
            botao.ondblclick = function () {
                inserenovoCadastroSentinela();
            };

            // CORRIGIDO: Encadeamento correto dos IFs e ELSE IFs
            if (estudoEncontrado) {
                if (estudoEncontrado.status === 'concluido') {
                    botao.classList.add('btn-success');
                    botao.innerHTML = `<i class="fa-solid fa-check-double me-1"></i>
                    <span class="uppercase tamanho07">${dataExibicao} &nbsp; [Concluído]</span>`;
                } 
                else if (estudoEncontrado.status === 'iniciado') { // Adicionado o 'else if' aqui
                    botao.classList.add('btn-primary');
                    botao.innerHTML = `<i class="fa-solid fa-book-open me-1"></i>
                    <span class="uppercase tamanho07">${dataExibicao} &nbsp; [Iniciado]</span>`;
                } 
                else {
                    botao.classList.add('btn-info');
                    botao.innerHTML = `<i class="fa-solid fa-book-open me-1"></i>
                    <span class="uppercase tamanho07">${dataExibicao} &nbsp; [OUTRO]</span>`;
                }
            } else {
                botao.classList.add('btn-outline-secondary');
                botao.innerHTML = `<i class="fa-solid fa-book me-1 uppercase"></i><span class="uppercase tamanho07"> ${dataExibicao} &nbsp;  [Pendente]</span>`;
            }

            coluna.appendChild(botao);
            exibicaoDatasSentinela.appendChild(coluna);
        }
        
        // Avança para o próximo dia
        inicio.setDate(inicio.getDate() + 1);
        document.getElementById('btnVerficaDiasReunioes').click();
    }
}

/* ------------------------------[ok] ------------------------------ */
function recuperaDadosSentinela(data) {

    // Limpa todos os campos antes de carregar novos dados
    limparCamposSentinela();

    let colunaAnotacaoTemaSentinela = document.getElementById("colunaAnotacaoTemaSentinela");

    let estudoEncontrado = arrayEstudosSentinela.find(element => element.data === data);

    let campoID = document.getElementById('idCadastroEstudoSentinela');
    let campoDATA = document.getElementById('dataEstudoSentinela');
    let campoDIASEMANA = document.getElementById('diaSemanaCadastroEstudoSentinela');
    let campoTITULO_ESTUDO = document.getElementById('tituloCadastroEstudoSentinela');
    let campoOBJETIVO_ESTUDO = document.getElementById('objetivoCadastroEstudoSentinela');
    let campoQTDPARAGRAFOS_ESTUDO = document.getElementById('qdParagrafosCadastroEstudoSentinela');

    const formatarParaInputDate = (dataBr) => {
        if (!dataBr || !dataBr.includes('/')) return dataBr;

        let partes = dataBr.split('/');
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
    };

    if (estudoEncontrado) {

        colunaAnotacaoTemaSentinela.classList.remove('d-none');

        campoID.value = estudoEncontrado.id;
        campoDATA.value = formatarParaInputDate(estudoEncontrado.data);

        if (estudoEncontrado.diaSemana) {
            campoDIASEMANA.value = estudoEncontrado.diaSemana;
        } else {
            verificaDiaSemana(
                formatarParaInputDate(estudoEncontrado.data),
                'diaSemanaCadastroEstudoSentinela'
            );
        }

        campoTITULO_ESTUDO.value = estudoEncontrado.titulo;
        campoOBJETIVO_ESTUDO.value = estudoEncontrado.objetivoEstudo;
        campoQTDPARAGRAFOS_ESTUDO.value = estudoEncontrado.totalParagrafos;

    } else {

        let confirmacao = confirm(
            `Nenhum Estudo Cadastrado para a data ${data}.\nDeseja Cadastrar?`
        );

        if (confirmacao) {

            colunaAnotacaoTemaSentinela.classList.remove('d-none');

            verificaId();

            campoDATA.value = formatarParaInputDate(data);

            verificaDiaSemana(
                formatarParaInputDate(data),
                'diaSemanaCadastroEstudoSentinela'
            );

            campoQTDPARAGRAFOS_ESTUDO.value = 17;

        } else {

            colunaAnotacaoTemaSentinela.classList.add('d-none');

        }
    }
}

/* ------------------------------[ok] ------------------------------ */
function limparCamposSentinela(categoria) {
    document.getElementById('idCadastroEstudoSentinela').value = '';
    document.getElementById('dataEstudoSentinela').value = '';
    document.getElementById('diaSemanaCadastroEstudoSentinela').value = '';
    document.getElementById('tituloCadastroEstudoSentinela').value = '';
    document.getElementById('objetivoCadastroEstudoSentinela').value = '';
}

/* ------------------------------[ok] ------------------------------ */
function verificaDiaSemana(data, idDiaSemana) {
    let campoMostraDiaSemana = document.getElementById(idDiaSemana);
    let dataAtual;
    if (data.includes('/')) {
        const [dia, mes, ano] = data.split('/');
        dataAtual = new Date(ano, mes - 1, dia);
    } else if (data.includes('-')) {
        const [ano, mes, dia] = data.split('-');
        dataAtual = new Date(ano, mes - 1, dia);
    }

    const diasSemana = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado"
    ];

    campoMostraDiaSemana.value = diasSemana[dataAtual.getDay()];
}

/* ------------------------------[ok] ------------------------------ */
function verificaId() {
    const campoId = document.getElementById('idCadastroEstudoSentinela');
    let qtdCodigosUtilizados = codigosUtilizados.length;

    campoId.value = qtdCodigosUtilizados + 1;
}

/* ------------------------------[ok] ------------------------------ */
function verificaValidadeDataFinal() {
    let dataInicialVerificaDiasReunioes = document.getElementById('dataInicialVerificaDiasReunioes').value;
    let dataFinalVerificaDiasReunioes = document.getElementById('dataFinalVerificaDiasReunioes').value;


    if (dataFinalVerificaDiasReunioes < dataInicialVerificaDiasReunioes) {
        alert('Data FINAL informada é menor que a data INICIAL.\nInforme uma data superior a data de inicio.')
    }
}

/* ------------------------------[ok] ------------------------------ */
function mostraEscolhaAnotacaoSentinela(escolha) {

    const campos = {
        citacao: document.getElementById("campoCitacao"),
        ilustracao: document.getElementById("campoIlustracao"),
        aplicacao: document.getElementById("campoAplicacao"),
        comentario: document.getElementById("campoComentario"),
        reflexao: document.getElementById("campoReflexao")
    };

    // Esconde todos
    Object.values(campos).forEach(campo => {
        campo.classList.add("d-none");
    });

    // Se não escolheu nada, apenas sai
    if (escolha === "nenhum") {
        return;
    }

    // Mostra somente o selecionado
    if (campos[escolha]) {
        campo = campos[escolha];
        campo.classList.remove("d-none");
    }
}

/* ------------------------------[XXXXXXXX] ------------------------------ */
function salvarCabecalhoSentinela() {
    const id = document.getElementById('idCadastroEstudoSentinela').value;
    const data = document.getElementById('dataEstudoSentinela').value;
    const diaSemana = document.getElementById('diaSemanaCadastroEstudoSentinela').value;
    const titulo = document.getElementById('tituloCadastroEstudoSentinela').value;
    const objetivo = document.getElementById('objetivoCadastroEstudoSentinela').value;
    const totalParagrafos = document.getElementById('qdParagrafosCadastroEstudoSentinela').value;
    const statusSelecionado = document.querySelector('.statusCadastroEstudoSentinela:checked');
    const status = statusSelecionado ? statusSelecionado.value : '';

    if (!id || !data || !diaSemana || !titulo || !objetivo || !totalParagrafos || !status) {
        alert('Preencha todos os campos e tente novamente!');
        return;
    }

    let estudoEncontrado = arrayEstudosSentinela.find(
        estudo => String(estudo.id) === String(id)
    );

    // Atualização
    if (estudoEncontrado) {
        estudoEncontrado.data = data;
        estudoEncontrado.diaSemana = diaSemana;
        estudoEncontrado.titulo = titulo;
        estudoEncontrado.objetivoEstudo = objetivo;
        estudoEncontrado.totalParagrafos = totalParagrafos;
        estudoEncontrado.status = status;

        // garante que anotações antigas não sejam perdidas
        if (!Array.isArray(estudoEncontrado.anotacoes)) {
            estudoEncontrado.anotacoes = [];
        }

        salvarDadosNavegador();

        alert('Estudo atualizado com sucesso!');
    }


    // Novo cadastro
    else {
        let novoEstudo = new EstudoSentinela(
            id,
            data,
            diaSemana,
            titulo,
            objetivo,
            totalParagrafos,
            status
        );

        arrayEstudosSentinela.push(novoEstudo);
        if (!codigosUtilizados.includes(id)) {
            codigosUtilizados.push(id);
        }

        salvarDadosNavegador();
        alert('Estudo cadastrado com sucesso!');
    }
    
    document.getElementById('btnVerficaDiasReunioes').click()
    confirmaDesejoCadastroAnotacao(data);

}

/* ------------------------------[XXXXXXXX] ------------------------------ */
function salvarAnotacaoSentinela() {
    let data = document.getElementById('recuperaDataSentinela').value;
    let dataAtualizacao = document.getElementById('dataAtualizacaoAnotacaoSentinela').value;
    let tipo = document.getElementById('tipoAnotacaoSentinela').value;
    let numeroParagrafo = document.getElementById('paragrafoAnotacaoSentinela').value;

    let campos = {
        citacao: document.getElementById('campoCitacaoInput'),
        ilustracao: document.getElementById('campoIlustracaoInput'),
        comentario: document.getElementById('campoComentarioInput'),
        aplicacao: document.getElementById('campoAplicacaoInput'),
        reflexao: document.getElementById('campoReflexaoInput')
    };

    if (tipo === 'nenhum') {
        alert('Selecione um tipo de anotação.');
        return;
    }

    let estudo = arrayEstudosSentinela.find(item => item.data === data);

    if (!estudo) {
        alert('Estudo não encontrado.');
        return;
    }

    let novaAnotacao = adicionarAnotacaoAoEstudo(estudo, tipo, dataAtualizacao, campos[tipo].value, numeroParagrafo);
    

    salvarDadosNavegador();

    alert('Anotação salva com sucesso!');
    limparAnotacao();
}

/* ------------------------------[ok] ------------------------------ */
function adicionarAnotacaoAoEstudo(estudo, tipo, dataAtualizacao, anotacaoPessoal,numeroParagrafo) {
    if (!Array.isArray(estudo.anotacoes)) {
        estudo.anotacoes = [];
    }

    // Cria o objeto principal de anotações se ainda não existir
    if (estudo.anotacoes.length === 0) {
        estudo.anotacoes.push({});
    }

    // Cria o array do tipo se ainda não existir
    if (!estudo.anotacoes[0][tipo]) {
        estudo.anotacoes[0][tipo] = [];
    }

    // Adiciona o registro
    estudo.anotacoes[0][tipo].push({
        dataAtualizacao: dataAtualizacao,
        anotacaoPessoal: anotacaoPessoal,
        numeroParagrafo: numeroParagrafo
    });

        const campos = {
        citacao: document.getElementById("campoCitacaoInput"),
        ilustracao: document.getElementById("campoIlustracaoInput"),
        aplicacao: document.getElementById("campoAplicacaoInput"),
        comentario: document.getElementById("campoComentarioInput"),
        reflexao: document.getElementById("campoReflexaoInput")
    };

    for(let i=0;i<campos.length;i++){
        campos[0].value = '';
    }
}

/* ------------------------------[ok] ------------------------------ */
function confirmaDesejoCadastroAnotacao(data) {
    if (confirm('Deseja cadastrar anotações sobre o estudo?')) {
        document.getElementById('recuperaDataSentinela').value = data;
        const modal = new bootstrap.Modal(
            document.getElementById('modalCadastroAnotacaoSentinela')
        );
        modal.show();
    }
    limparCamposSentinela();
    document.getElementById('btnVerficaDiasReunioes').click();
}

/* ------------------------------[ok] ------------------------------*/ 
function exibeQtdAnotacoesnoCircle() {
    let dataRecuperada = document.getElementById('recuperaDataSentinela').value;
    let numeroParagrafo = document.getElementById('paragrafoAnotacaoSentinela').value;

    let circuloCitacao = document.getElementById("circuloCitacao");
    let circuloIlustracao = document.getElementById("circuloIlustracao");
    let circuloAplicacao = document.getElementById("circuloAplicacao");
    let circuloComentario = document.getElementById("circuloComentario");
    let circuloReflexao = document.getElementById("circuloReflexao");

    // Limpa os círculos
    circuloCitacao.innerText = 0;
    circuloIlustracao.innerText = 0;
    circuloAplicacao.innerText = 0;
    circuloComentario.innerText = 0;
    circuloReflexao.innerText = 0;

    if (numeroParagrafo < 1) {
        return;
    }

    // Localiza o estudo pela data
    let estudo = arrayEstudosSentinela.find(
        item => item.data === dataRecuperada
    );

    if (!estudo || !estudo.anotacoes) {
        return;
    }

    let qtdCitacao = 0;
    let qtdIlustracao = 0;
    let qtdAplicacao = 0;
    let qtdComentario = 0;
    let qtdReflexao = 0;

    estudo.anotacoes.forEach(anotacao => {
        if (anotacao.citacao) {
            qtdCitacao += anotacao.citacao.length;
        }
        if (anotacao.ilustracao) {
            qtdIlustracao += anotacao.ilustracao.length;
        }
        if (anotacao.aplicacao) {
            qtdAplicacao += anotacao.aplicacao.length;
        }
        if (anotacao.comentario) {
            qtdComentario += anotacao.comentario.length;
        }
        if (anotacao.reflexao) {
            qtdReflexao += anotacao.reflexao.length;
        }
    });


    // Mostra cada valor no seu círculo
    circuloCitacao.innerText = qtdCitacao;
    circuloIlustracao.innerText = qtdIlustracao;
    circuloAplicacao.innerText = qtdAplicacao;
    circuloComentario.innerText = qtdComentario;
    circuloReflexao.innerText = qtdReflexao;
}

/* ------------------------------[ok] ------------------------------*/ 
function exibeCadastroDetalhadoAnotacoes(categoria, id){
    let dataRecuperada = document.getElementById('recuperaDataSentinela').value;
    let campoExibicao = document.getElementById(id);

    let estudo = arrayEstudosSentinela.find(item => item.data === dataRecuperada);

    if (!estudo) {
        return;
    }

    campoExibicao.innerHTML = '';

    let contador = 1;

    estudo.anotacoes.forEach(anotacao => {
        if (anotacao[categoria]) {
            anotacao[categoria].forEach(registro => {
                let linha = document.createElement('div');
                linha.classList.add('row', 'mb-2');


                let coluna = document.createElement('div');
                coluna.classList.add('col');


                let card = document.createElement('div');
                card.classList.add('card');


                let cardHeader = document.createElement('div');
                cardHeader.classList.add('card-header');


                cardHeader.innerHTML = `
                    <div class="row mb-2">
                        <div class="col-auto">
                            <label class="uppercase fw-bold tamanho07 mb-2">
                                Última Atualização:
                            </label><br>
                            <span class="uppercase fw-bold tamanho07 bg-danger text-white px-4 py-2 mb-2">
                                ${formatarData(registro.dataAtualizacao)}
                            </span>
                        </div>

                        <div class="col-auto text-center">
                            <label class="uppercase fw-bold tamanho07 mb-2">
                                referente a(o) ${categoria} do(a)
                            </label><br>
                            <span class="uppercase fw-bold tamanho07 bg-primary text-white px-4 py-2 mb-2">
                                páragrafo ${registro.numeroParagrafo}
                            </span>
                        </div>
                        
                        <div class="col"></div>

                        <div class="col-auto">
                            <button class="btn btn-sm btn-secondary"
                                data-bs-toggle="collapse"
                                data-bs-target="#body_${contador}"
                                onclick="mudaChevron('icone_${contador}')">
                                <i class="fa fa-chevron-down" id="icone_${contador}"></i>
                            </button>
                        </div>
                    </div>
                `;


                let cardBody = document.createElement('div');
                cardBody.classList.add('card-body');


                cardBody.innerHTML = `
                    <div class="row collapse" id="body_${contador}">
                        <div class="col">

                            <div class="row">
                                <div class="col">
                                    <strong class="uppercase tamanho07">
                                        Registro de ${categoria}:
                                    </strong>
                                </div>
                            </div>


                            <div class="row">
                                <div class="col">
                                    <cite class="uppercase tamanho07">
                                        ${registro.anotacaoPessoal}
                                    </cite>
                                </div>
                            </div>

                        </div>

                    </div>
                `;


                card.appendChild(cardHeader);
                card.appendChild(cardBody);

                coluna.appendChild(card);
                linha.appendChild(coluna);

                campoExibicao.appendChild(linha);
                contador++;

            });
        }
    });
}

/* ------------------------------[ok] ------------------------------ */
function mudaChevron(idChevron) {
    const chevron = document.getElementById(idChevron);

    if (chevron.classList.contains('fa-chevron-down')) {
        chevron.classList.remove('fa-chevron-down');
        chevron.classList.add('fa-chevron-up');
    } else {
        chevron.classList.remove('fa-chevron-up');
        chevron.classList.add('fa-chevron-down');
    }
}

function limparAnotacao(){
    const tipoAnotacaoSentinela = document.getElementById('tipoAnotacaoSentinela').value;

    const campos = {
        citacao: document.getElementById('campoCitacaoInput'),
        ilustracao: document.getElementById('campoIlustracaoInput'),
        aplicacao: document.getElementById('campoAplicacaoInput'),
        comentario: document.getElementById('campoComentarioInput'),
        reflexao: document.getElementById('campoReflexaoInput')
    };

    if (campos[tipoAnotacaoSentinela]) {
        campos[tipoAnotacaoSentinela].value = '';
    }
}