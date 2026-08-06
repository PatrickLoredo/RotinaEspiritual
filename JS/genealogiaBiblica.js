
let genealogiaCompleta = JSON.parse(localStorage.getItem('genealogiaCompleta')) || [];

let idsPersonagensCadastrados = JSON.parse(localStorage.getItem('idsPersonagens')) || [];
let idsCidadesCadastrados = JSON.parse(localStorage.getItem('idsCidades')) || [];
let idsProfissoesCadastrados = JSON.parse(localStorage.getItem('idsProfissoes')) || [];

let cidadesBiblicas = JSON.parse(localStorage.getItem('cidadesBiblicas')) || [];
let tribosFamiliasBiblicas = JSON.parse(localStorage.getItem('tribosFamilias')) || [];
let profissoesBiblicas = JSON.parse(localStorage.getItem('profissoesBiblicas')) || [];
let conduta = ['Bom Exemplo','Mau Exemplo','Se tornou Mal','Se tornou Bom'];


window.onload = function () {
    let elementoModal = document.getElementById('');

    if(elementoModal){
        const modal = new bootstrap.Modal(elementoModal);
        modal.show();
    }
    
    mostraDataAtual('dataInicialVerificaDiasReunioes');
    mostraDataAtual('dataEstudoSentinela');
    mostraDataAtual('dataAtualizacaoAnotacaoSentinela');
};

/* __________________ CLASS - PERSONAGEM BIBLICO __________________*/
class PersonagemBiblico {
    constructor(id, nome, nascimento, morte, idadeTotal, naturalidade, triboFamilia,territorioNascimento, profissao, pai, mae, irmaos, filhos, conjuge, concumbinas, parentes, espiritualidade, conduta,realizacoes,licoes){
        this.id = id;
        this.nome = nome;
        this.nascimento = nascimento;
        this.morte = morte;
        this.idadeTotal = idadeTotal;
        this.naturalidade = naturalidade;
        this.triboFamilia = triboFamilia;
        this.territorioNascimento = territorioNascimento;
        this.profissao = profissao;
        this.pai = pai;
        this.mae = mae;
        this.irmaos = irmaos;
        this.filhos = filhos;
        this.conjuge = conjuge;
        this.concumbinas = concumbinas;
        this.parentes = parentes;
        this.espiritualidade = espiritualidade;
        this.conduta = conduta;
        this.realizacoes = realizacoes;
        this.licoes = licoes;
    }
}

/* __________________ CLASS - LOCALIDADE BIBLICA __________________*/
class localidadeNascimento{
    constructor(id,cidade,territorio){
        this.id = id;
        this.cidade = cidade;
        this.territorio = territorio;
    }
}

/* __________________ CLASS - PROFISSAO BIBLICA __________________*/
class ProfissaoBiblica{
    constructor(id,profissao){
        this.id = id;
        this.profissao = profissao;
    }
}

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++ FUNÇÕES GERAIS ++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*-------------------------- FUNÇÃO SALVAR CADASTRO DE GENEALOGIA NO ARRAY DENTRO DO NAVEGADOR [OK]--------------------------*/
function salvarGenealogia(){
    localStorage.setItem('genealogiaCompleta',JSON.stringify(genealogiaCompleta));
}

/*-------------------------- FUNÇÃO PARA VERIFICAR PRÓXIMO ID [OK]--------------------------*/
function verificaId(array,idPreenchimento){
    let idInputPreenchimento = document.getElementById(idPreenchimento);
    let proximoCodigo = array.length+1;

    idInputPreenchimento.value = proximoCodigo;
}

/*-------------------------- FUNÇÃO PARA POPULAR SELECTS [OK]--------------------------*/
function popularSelect(idSelect, nomeChaveStorage, categoria) {
    const select = document.getElementById(idSelect);
    if (!select) return;

    select.innerHTML = '<option value="">-</option>';

    const lista = JSON.parse(localStorage.getItem(nomeChaveStorage)) || [];

    if (categoria === 'profissao') {
        const profissoesAdicionadas = new Set();

        lista.forEach(item => {
            if (profissoesAdicionadas.has(item.profissao)) return;
            profissoesAdicionadas.add(item.profissao);

            const option = document.createElement('option');
            option.value = item.profissao;
            option.textContent = item.profissao.toUpperCase();

            select.appendChild(option);
        });
    }

    if (categoria === 'cidade') {
        const cidadesAdicionadas = new Set();

        lista.forEach(item => {
            if (cidadesAdicionadas.has(item.cidade)) return;
            cidadesAdicionadas.add(item.cidade);

            const option = document.createElement('option');
            option.value = item.cidade;
            option.textContent = item.cidade.toUpperCase();

            // Guarda o território da cidade
            option.setAttribute('data-territorio', item.territorio);

            select.appendChild(option);
        });
    }

    if (categoria === 'territorio') {
        const territoriosAdicionados = new Set();

        lista.forEach(item => {
            if (territoriosAdicionados.has(item.territorio)) return;
            territoriosAdicionados.add(item.territorio);

            const option = document.createElement('option');
            option.value = item.territorio;
            option.textContent = item.territorio.toUpperCase();

            select.appendChild(option);
        });
    }
}

/*-------------------------- FUNÇÃO PARA CALCULAR IDADE DO PERSONAGEM BIBLICO [OK]--------------------------*/
function calculaIdadePersonagem() {
    let anoNascimento = parseInt(document.getElementById('anoNascimentoPersonagemBiblico').value);
    let anoMorte = parseInt(document.getElementById('anoMortePersonagemBiblico').value);

    let periodoNascimento = document.getElementById('periodoNascimentoPersonagemBiblico').value;
    let periodoMorte = document.getElementById('periodoMortePersonagemBiblico').value;

    let totalAnos = 0;

    if (periodoNascimento === 'naoInformado' || periodoMorte === 'naoInformado') {
        alert('Período de nascimento ou morte não informado.');
        return;
    }

    if (periodoNascimento === 'ec' && periodoMorte === 'aec') {
        alert('O período da morte não pode ocorrer antes do nascimento.');
        return;
    }

    if (periodoNascimento === periodoMorte) {

        if (periodoNascimento === 'aec') {
            totalAnos = anoNascimento - anoMorte;
        } else {
            totalAnos = anoMorte - anoNascimento;
        }

    } else {
        // De AEC para EC (não existe ano zero)
        totalAnos = anoNascimento + anoMorte - 1;
    }

    document.getElementById('totalAnosVividosPersonagemBiblico').value = totalAnos;
}


/*++++++++++++++++++++++++++++++++++++++++++++++++++++++  TERRITÓRIO LOCAL  ++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*-------------------------- FUNÇÃO PARA SALVAR CIDADE E TERRITORIO [OK]--------------------------*/
function salvarCidadeTerritorio(){
    const idCidade = document.getElementById('inputIdNovaCidadeBiblica').value.trim();
    const nomeCidade = document.getElementById('nomeCidadeCadastro').value.trim();
    const nomeTerritorio = document.getElementById('nomeTerritorioCadastro').value.trim();

    if (idCidade === '' || nomeCidade === '' || nomeTerritorio === '') {
        alert('Campos obrigatórios não foram preenchidos.\n\nInforme todos os os campos de ID e NOME DA CIDADE E TERRITÓRIO e tente novamente.');
        return;
    }

    const CidadeExiste = cidadesBiblicas.some(
        p => p.cidade === nomeCidade && p.territorio === nomeTerritorio
    );

    if (CidadeExiste) {
        alert('Cidade e território já cadastrados anteriormente!\n\nInsira uma nova combinação de Cidade e Território.');
        return;
    }

    const novaCidade = new localidadeNascimento(idCidade, nomeCidade, nomeTerritorio);

    cidadesBiblicas.push(novaCidade);
    idsCidadesCadastrados.push(idCidade);

    localStorage.setItem('cidadesBiblicas', JSON.stringify(cidadesBiblicas));
    localStorage.setItem('idsCidades', JSON.stringify(idsCidadesCadastrados));

    alert(`Cidade ${nomeCidade.toUpperCase()} e território ${nomeTerritorio.toUpperCase()} cadastrada com sucesso!`);
   
    limparCidade();
    document.getElementById('nomeCidadeCadastro').value ='-';
    verificaId(idsCidadesCadastrados,'inputIdNovaCidadeBiblica');
    exibeListaCidades();
}

/*-------------------------- FUNÇÃO DE LIMPAR CAMPOS DE NOVA CIDADE [OK]--------------------------*/
function limparCidade() {
    document.getElementById('nomeCidadeCadastro').value = '';
    document.getElementById('nomeTerritorioCadastro').value = '';
    verificaId(idsCidadesCadastrados, 'inputIdNovaCidadeBiblica');
}

/*-------------------------- FUNÇÃO DE EXIBIR LISTA DE TODAS CIDADES CADASTRADAS [OK]--------------------------*/
function exibeListaCidades() {
    let campoApresentacao = document.getElementById('campoApresentacaoCidades');

    // Limpa a lista antes de exibir novamente
    campoApresentacao.innerHTML = '';

    cidadesBiblicas.forEach((cidade, indice) => {

        let linhaPrincipalCidadeIndividual = document.createElement('div');
        linhaPrincipalCidadeIndividual.classList.add('row', 'd-flex', 'align-items-center', 'mb-2');


        /* COLUNA ÍNDICE */
        let colunaIndiceSequencial = document.createElement('div');
        colunaIndiceSequencial.classList.add('col-auto');


        /* COLUNA CIDADE */
        let colunaNomeCidade = document.createElement('div');
        colunaNomeCidade.classList.add('col-auto');


        /* COLUNA SEPARADOR */
        let colunaSeparador = document.createElement('div');
        colunaSeparador.classList.add('col-auto');


        /* COLUNA TERRITÓRIO */
        let colunaNomeTerritorio = document.createElement('div');
        colunaNomeTerritorio.classList.add('col-auto');


        /* BOTÃO DE ÍNDICE */
        let botaoIndicadorSequencial = document.createElement('button');
        botaoIndicadorSequencial.classList.add(
            'btn',
            'btn-sm',
            'btn-danger',
            'fw-bold',
            'text-white',
            'tamanho16'
        );
        botaoIndicadorSequencial.style.fontSize = '1rem';
        botaoIndicadorSequencial.textContent = indice + 1;


        /* ÍCONE CIDADE 
        let iconeCidade = document.createElement('i');
        iconeCidade.classList.add('fa', 'fa-location-pin', 'text-success');*/


        /* NOME CIDADE */
        let spanCidade = document.createElement('span');
        spanCidade.classList.add('fw-bold', 'uppercase', 'tamanho09');
        spanCidade.textContent = cidade.cidade;


        /* SEPARADOR */
        let spanSeparador = document.createElement('span');
        spanSeparador.classList.add('fw-bold');
        spanSeparador.textContent = ' - ';


        /* ÍCONE TERRITÓRIO 
        let iconeTerritorio = document.createElement('i');
        iconeTerritorio.classList.add('fa', 'fa-signs-post', 'text-primary');*/


        /* NOME TERRITÓRIO */
        let spanTerritorio = document.createElement('span');
        spanTerritorio.classList.add('fw-bold', 'uppercase', 'tamanho09');
        spanTerritorio.textContent = cidade.territorio;


        // Montagem das colunas
        colunaIndiceSequencial.appendChild(botaoIndicadorSequencial);


        /*colunaNomeCidade.appendChild(iconeCidade);*/
        colunaNomeCidade.appendChild(document.createTextNode(' '));
        colunaNomeCidade.appendChild(spanCidade);


        colunaSeparador.appendChild(spanSeparador);


        /*colunaNomeTerritorio.appendChild(iconeTerritorio);*/
        colunaNomeTerritorio.appendChild(document.createTextNode(' '));
        colunaNomeTerritorio.appendChild(spanTerritorio);


        // Montagem da linha
        linhaPrincipalCidadeIndividual.appendChild(colunaIndiceSequencial);
        linhaPrincipalCidadeIndividual.appendChild(colunaNomeCidade);
        linhaPrincipalCidadeIndividual.appendChild(colunaSeparador);
        linhaPrincipalCidadeIndividual.appendChild(colunaNomeTerritorio);


        campoApresentacao.appendChild(linhaPrincipalCidadeIndividual);
    });
}

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++  PROFISSÃO  ++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*-------------------------- FUNÇÃO SALVAR NOVA PROFISSÃO [OK]--------------------------*/
function salvarProfissao() {
    const idProfissao = document.getElementById('idProfissaoBiblicaCadastro').value.trim();
    const nomeProfissao = document.getElementById('nomeProfissaoBiblicaCadastro').value.trim();

    if (idProfissao === '' || nomeProfissao === '') {
        alert('Campos obrigatórios não foram preenchidos.\n\nInforme todos os os campos de ID e NOME DA PROFISSÃO e tente novamente.');
        return;
    }

    const profissaoExiste = profissoesBiblicas.some(p => p.profissao === nomeProfissao);

    if (profissaoExiste) {
        alert('Profissão já cadastrada anteriormente!\n\nInsira uma nova profissão.');
        return;
    }

    const novaProfissao = new ProfissaoBiblica(idProfissao, nomeProfissao);

    profissoesBiblicas.push(novaProfissao);
    idsProfissoesCadastrados.push(idProfissao);

    localStorage.setItem('profissoesBiblicas', JSON.stringify(profissoesBiblicas));
    localStorage.setItem('idsProfissoes', JSON.stringify(idsProfissoesCadastrados));

    alert(`Profissão ${nomeProfissao.toUpperCase()} cadastrada com sucesso!`);

    limparProfissao();
    exibeListaProfissoes()
    verificaId(idsProfissoesCadastrados,'idProfissaoBiblicaCadastro'), exibeListaProfissoes()
}

/*-------------------------- FUNÇÃO DE LIMPAR CAMPOS DE NOVA PROFISSAO [OK]--------------------------*/
function limparProfissao() {
    document.getElementById('nomeProfissaoBiblicaCadastro').value = '';
    verificaId(idsProfissoesCadastrados, 'idProfissaoBiblicaCadastro');
}

/*-------------------------- FUNÇÃO DE EXIBIR LISTA DE TODAS PROFISSÕES CADASTRADAS [OK]--------------------------*/
function exibeListaProfissoes() {
    let campoApresentacao = document.getElementById('campoApresentacaoProfissoes');

    // Limpa a lista antes de exibir novamente
    campoApresentacao.innerHTML = '';

    profissoesBiblicas.forEach((profissao, indice) => {
        let linhaPrincipalProfissaoIndividual = document.createElement('div');
        linhaPrincipalProfissaoIndividual.classList.add('row','d-flex','align-items-center','mb-2');

        let colunaDentroLinhaPrincipalProfissao = document.createElement('div');
        colunaDentroLinhaPrincipalProfissao.classList.add('col-auto');

        let botaoIndicadorSequencial = document.createElement('button');
        botaoIndicadorSequencial.classList.add('btn','btn-sm','btn-danger','fw-bold','text-white','tamanho16');
        botaoIndicadorSequencial.style.fontSize = '1rem';
        botaoIndicadorSequencial.textContent = indice + 1;

        let colunaNomeProfissao = document.createElement('div');
        colunaNomeProfissao.classList.add('col');

        let spanNomeProfissaoIndividual = document.createElement('span');
        spanNomeProfissaoIndividual.classList.add('fw-bold','uppercase','tamanho09');
        spanNomeProfissaoIndividual.textContent = profissao.profissao;

        colunaDentroLinhaPrincipalProfissao.appendChild(botaoIndicadorSequencial);
        colunaNomeProfissao.appendChild(spanNomeProfissaoIndividual);

        linhaPrincipalProfissaoIndividual.appendChild(colunaDentroLinhaPrincipalProfissao);
        linhaPrincipalProfissaoIndividual.appendChild(colunaNomeProfissao);

        campoApresentacao.appendChild(linhaPrincipalProfissaoIndividual);
    });
}




