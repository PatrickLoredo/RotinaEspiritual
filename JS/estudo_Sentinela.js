// 🗂️ ESTRUTURA DE DADOS
let arrayASentinela = {
    comentario: [],
    ilustracao: [],
    citacao: [],
    experiencia: []
};

// 🔢 CONTADORES PARA GERAR CÓDIGOS ÚNICOS
let contadoresSentinela = {
    inserir: {
        comentario: 0,
        ilustracao: 0,
        citacao: 0,
        experiencia: 0
    },
    exibir: {
        comentario: 0,
        ilustracao: 0,
        citacao: 0,
        experiencia: 0
    }
};

// 📚 CLASSE
class cadastroASentinela {
    constructor(ano, id, data, numero_estudo, titulo_estudo, paragrafo, comentario) {
        this.ano = ano;
        this.id = id;
        this.data = data;
        this.numero_estudo = numero_estudo;
        this.titulo_estudo = titulo_estudo;
        this.paragrafo = paragrafo;
        this.comentario = comentario;
    }
}

// 🔄 CARREGA DADOS SALVOS
function carregarDadosSentinela() {
    let dadosSalvos = localStorage.getItem('arrayASentinela');

    if (dadosSalvos) {
        arrayASentinela = JSON.parse(dadosSalvos);
    } else {
        arrayASentinela = {
            comentario: [],
            ilustracao: [],
            citacao: [],
            experiencia: []
        };
    }

    console.log('Dados carregados:', arrayASentinela);

    atualizarContadores();
}

// 🔢 ATUALIZA CONTADORES COM BASE NO QUE JÁ EXISTE
function atualizarContadores() {
    Object.keys(arrayASentinela).forEach(categoria => {
        arrayASentinela[categoria].forEach(item => {
            const numero = parseInt(item.id.split('_')[1]);

            if (contadoresSentinela.inserir[categoria] <= numero) {
                contadoresSentinela.inserir[categoria] = numero;
            }
        });
    });

    console.log('Contadores atualizados:', contadoresSentinela);
}

// 💾 SALVA NOVO CADASTRO
function salvarCadastroASentinela(escolha, categoria) {

    carregarDadosSentinela();
    const idField = document.getElementById('idCodigoSentinela');
    const data = document.getElementById('dataInsereSentinela').value;
    const numero_estudo = document.getElementById('numeroEstudoSentinela').value;
    const titulo_estudo = document.getElementById('tituloEstudoSentinela').value;
    const paragrafo = document.getElementById('paragrafoSentinela').value;
    const comentario = document.getElementById('comentarioSentinela').value;

    if (!data || !numero_estudo || !titulo_estudo || !paragrafo || !comentario) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    const escolhaNormalizada = escolha.toLowerCase().trim();

    const categoriaNormalizada = categoria
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

    if (
        !contadoresSentinela[escolhaNormalizada] ||
        contadoresSentinela[escolhaNormalizada][categoriaNormalizada] === undefined
    ) {
        console.error("Erro:", escolha, categoria);
        alert("Categoria ou tipo inválido");
        return;
    }

    contadoresSentinela[escolhaNormalizada][categoriaNormalizada]++;
    const numero = contadoresSentinela[escolhaNormalizada][categoriaNormalizada];

    const id = `${categoriaNormalizada}_${numero}`;
    idField.value = id;

    const ano = data.split('-')[0];

    const cadastro = new cadastroASentinela(
        ano,
        id,
        data,
        numero_estudo,
        titulo_estudo,
        paragrafo,
        comentario
    );

    if (!arrayASentinela[categoriaNormalizada]) {
        arrayASentinela[categoriaNormalizada] = [];
    }

    arrayASentinela[categoriaNormalizada].push(cadastro);

    localStorage.setItem('arrayASentinela', JSON.stringify(arrayASentinela));

    console.log('Salvo:', arrayASentinela);

    alert('Cadastro salvo com sucesso!');

    document.getElementById('numeroEstudoSentinela').value = '';
    document.getElementById('tituloEstudoSentinela').value = '';
    document.getElementById('paragrafoSentinela').value = '';
    document.getElementById('comentarioSentinela').value = '';
}

// 🆔 GERA CÓDIGO ÚNICO PARA O NOVO CADASTRO
function geraCodigoSentinela(tipo, subtipo, idCodigo) {
    // normaliza (remove acento e deixa minúsculo)
    subtipo = subtipo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // valida tipo e subtipo corretamente
    if (
        !contadoresSentinela[tipo] ||
        !(subtipo in contadoresSentinela[tipo])
    ) {
        console.error("Tipo ou subtipo inválido:", tipo, subtipo);
        return;
    }


    // prefixos

    const subtiposValidos = {
        comentario: "Coment",
        ilustracao: "Ilustr",
        citacao: "Citacao",
        experiencia: "Experien"
    };

    // pega elemento
    const elemento = document.getElementById(idCodigo);

    if (!elemento) {
        console.error("Elemento não encontrado:", idCodigo);
        return;
    }

    // gera código
    elemento.value = `${subtiposValidos[subtipo]}_${contadoresSentinela[tipo][subtipo]}`;
}

// ⏰ RELÓGIO
function atualizaRelogio(idRelogio) {
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();

    var horas = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');

    var dataAtual = (`${dia}/${mes}/${ano}`)
    var horaAtual = (`${horas}:${minutos}:${segundos}`)

    var campoRelogio = document.getElementById(idRelogio);
    campoRelogio.innerHTML = '';
    campoRelogio.innerHTML = `${dataAtual} - ${horaAtual}`;
}

// 📅 MOSTRA DATA ATUAL NO CAMPO DE INSERÇÃO
function mostraDataAtual(id){
    var campoExibicaoData = document.getElementById(id);

    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();

    campoExibicaoData.value = `${ano}-${mes}-${dia}`;
}

// 🖥️ EXIBE FORMULÁRIO DE INSERÇÃO
function funcaoSentinela(escolha,categoria){
    const campoExibicaoResultadoEscolhaSentinela = document.getElementById('campoExibicaoResultadoEscolhaSentinela');

    var amostragem = `
        <div class="row mb-3">
            <div class="col-4 col-sm-3 col-md-2 col-lg-2">
                <label class="label-format mb-2">id</label>
                <input type="text" style="font-size: 0.8rem" class="form-control uppercase text-center" id="idCodigoSentinela" disabled>
            </div>
            <div class="col-5  col-sm-5 col-md-4 col-lg-2">
                <label class="label-format mb-2 text-center">data</label>
                <input type="date" style="font-size: 0.8rem" class="form-control uppercase text-center text-center" id="dataInsereSentinela">
            </div>
            <div class="col-3  col-sm col-md-3 col-lg-1">
                <label class="label-format mb-2">Estudo</label>
                <input type="number" id="numeroEstudoSentinela" style="font-size: 0.8rem" class="form-control uppercase text-center text-center" min=1 value="1">
            </div>
            <div class="col-8 col-md-9 col-lg-5 mt-3 mt-lg-0">
                <label class="label-format mb-2">Título do Estudo</label>
                <input type="text" id="tituloEstudoSentinela" style="font-size: 0.8rem" class="form-control uppercase text-center" placeholder="Digite o título do estudo de A Sentinela">
            </div>
            <div class="col col-md-3 col-lg-2 mt-3 mt-lg-0">
                <label class="label-format mb-2">Parágrafo</label>
                <input type="number" id="paragrafoSentinela" style="font-size: 0.8rem" class="form-control uppercase text-center text-center" min=1 value="1">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <label class="label-format bg-danger text-light p-2 mb-2 rounded-pill">${categoria}</label>                        
                <textarea id="comentarioSentinela" class="form-control uppercase mb-5" rows="7" placeholder="Digite o(a) ${categoria.toUpperCase()}"></textarea>
                <textarea id="citacaoSentinela" style="display:none;"></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col text-center">
                <button class="btn btn-sm btn-success" onclick="salvarCadastroASentinela('${escolha}','${categoria}')">
                    <i class="fa fa-save"></i>
                    <span class="uppercase" style="font-size: 0.8rem">Salvar</span>
                </button>
                <button class="btn btn-sm btn-primary">
                    <i class="fa fa-broom"></i>
                    <span class="uppercase" style="font-size: 0.8rem">Limpar</span>
                </button>
            </div>
        </div>
    `

    campoExibicaoResultadoEscolhaSentinela.innerHTML = amostragem;
    mostraDataAtual('dataInsereSentinela');
}

// 🖥️ EXIBE DADOS SALVOS
function gerarEstruturaExibicao(item, categoria) {

    // ✅ corrigido (sem bug de fuso)
    const [ano, mes, dia] = item.data.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return `
        <div class="alert alert-info mb-3">
            <div class="row">
                <div class="col col-sm-12 col-lg mt-lg-0 d-flex align-items-center justify-content-center">
                    Titulo: &nbsp;<strong><u>${item.titulo_estudo}</u></strong>
                </div>
                <div class="col-10 col-lg-auto mt-4 mt-lg-0">
                    <span class="badge bg-dark">${dataFormatada}</span>
                    <span class="badge bg-primary">Nº Estudo ${item.numero_estudo}</span>
                    <span class="badge bg-danger">Parágrafo: ${item.paragrafo}</span>
                </div>

                <!--BUTTON TOGGLE-->
                <div class="col-2 col-lg-1 mt-4 mt-lg-0">
                    <button class="btn btn-sm btn-dark" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#${item.id}"
                        onclick="mudaToggle('eye${item.id}','btn-dark')">
                        <i class="fa fa-eye" id="eye${item.id}"></i>
                    </button>
                </div>
            </div>

            <!--COLLAPSE-->
            <div class="collapse mt-3" id="${item.id}">
                <div class="row mt-3">
                    <div class="col-3 col-sm-2 col-lg-1"><hr></div>
                    <div class="col-6 col-sm-5 col-lg-3">
                        <span class="badge bg-warning text-dark mb-2 uppercase p-2 w-100" 
                        style="font-size: 0.7rem">
                            ${categoria}
                        </span>
                    </div>
                    <div class="col-3 col-sm"><hr></div>
                </div>

                <!--EXIBIÇÃO DO COMENTÁRIO-->
                <div class="row">
                    <div class="col">
                        <textarea class="form-control" rows="5" disabled id="comentario_${item.id}">${item.comentario}</textarea>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-auto col-sm-4 col-lg-2 text-start">
                        <button class="btn btn-sm btn-secondary">
                            <i class="fa fa-copy"></i>
                            <span class="uppercase" style="font-size: 0.7rem">Copiar</span>
                        </button>
                    </div>

                    <div class="col text-end">
                        <button class="btn btn-sm btn-primary"
                            id="btnEditar_${item.id}"
                            onclick="editarCampos('${item.id}')">
                            <i class="fa fa-edit"></i>
                            <span class="uppercase" style="font-size: 0.7rem">Editar</span>
                        </button>

                        <button class="btn btn-sm btn-success d-none"
                            id="btnSalvar_${item.id}"
                            onclick="salvarEdicao('${item.id}')">
                            <i class="fa fa-save"></i>
                            <span class="uppercase" style="font-size: 0.7rem">Salvar</span>
                        </button>

                        <button class="btn btn-sm btn-danger"
                             onclick="excluirComentario('${item.id}')">
                            <i class="fa fa-trash"></i>
                            <span class="uppercase" style="font-size: 0.7rem">Excluir</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 👁️ TOGGLE DE EXIBIÇÃO
function mudaToggle(idToggle,colorAtual){
    const elemento = document.getElementById(idToggle);
    const button = elemento.parentElement; // Botão pai do ícone

    if(elemento.classList.contains('fa-eye')){
        elemento.classList.remove('fa-eye');
        elemento.classList.add('fa-eye-slash');
        button.classList.remove(`${colorAtual}`);
        button.classList.add('btn-warning');
    } else {
        elemento.classList.remove('fa-eye-slash');
        elemento.classList.add('fa-eye');
        button.classList.remove('btn-warning');
        button.classList.add(`${colorAtual}`);
    }
}

// 🖥️ EXIBE DADOS SALVOS
function exibirDadoSentinela(categoria) {
    carregarDadosSentinela();

    const campo = document.getElementById('campoExibicaoResultadoEscolhaSentinela');
    const dados = arrayASentinela[categoria];

    if (!dados || dados.length === 0) {
        campo.innerHTML = '<div class="alert alert-danger uppercase d-flex justify-content-center align-items-center" role="alert" style="font-size: 0.8rem;">Nenhum registro encontrado.</div>';
        return;
    }

    let amostragem = `<h5 class="text-center mb-4">${categoria.toUpperCase()}</h5>`;

    dados.forEach(item => {
        amostragem += gerarEstruturaExibicao(item, categoria); // 
    });

    campo.innerHTML = amostragem;
}

// 🔓 Habilita edição
function editarCampos(id) {
    const campo = document.getElementById(`comentario_${id}`);
    const btnEditar = document.getElementById(`btnEditar_${id}`);
    const btnSalvar = document.getElementById(`btnSalvar_${id}`);

    if (!campo) return;

    campo.removeAttribute('disabled');
    campo.focus();

    btnEditar.classList.add('d-none');
    btnSalvar.classList.remove('d-none');
}

// 💾 Salva edição
function salvarEdicao(id) {
    const campo = document.getElementById(`comentario_${id}`);
    const btnEditar = document.getElementById(`btnEditar_${id}`);
    const btnSalvar = document.getElementById(`btnSalvar_${id}`);

    if (!campo) return;

    // percorre o array
    for (let categoria in arrayASentinela) {
        let comentarios = arrayASentinela[categoria];

        for (let i = 0; i < comentarios.length; i++) {
            if (String(comentarios[i].id) === String(id)) {

                comentarios[i].comentario = campo.value;

                // salva no localStorage
                localStorage.setItem(
                    'arrayASentinela',
                    JSON.stringify(arrayASentinela)
                );

                // UI
                campo.setAttribute('disabled', true);

                btnSalvar.classList.add('d-none');
                btnEditar.classList.remove('d-none');

                console.log('Comentário atualizado com sucesso!');
                return;
            }
        }
    }
}

// 🗑️ Exclui comentário
function excluirComentario(id) {
    if (!confirm('Tem certeza que deseja excluir este comentário?')) {
        return;
    }

    // Remove o comentário do array
    for (let categoria in arrayASentinela) {
        let comentarios = arrayASentinela[categoria];
        arrayASentinela[categoria] = comentarios.filter(item => String(item.id) !== String(id));
    }

    // Salva no localStorage
    localStorage.setItem('arrayASentinela', JSON.stringify(arrayASentinela));

    // Atualiza a exibição
    exibirDadoSentinela();

    console.log('Comentário excluído com sucesso!');
}


// 🔥 INICIALIZAÇÃO
window.onload = function () {
    rotacionarIcone('atualizarPaginaEstudoPessoal');
    carregarDadosSentinela(); // 🔥 FALTAVA ISSO
    atualizaRelogio('relogioPagina');
    setInterval(() => atualizaRelogio('relogioPagina'), 1000);
};

