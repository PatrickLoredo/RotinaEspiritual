window.onload = function () {
    atualizaAccordionLivrosBiblicos();

    atualizaRelogio('relogioPagina');

    setInterval(function () {
        atualizaRelogio('relogioPagina');
    }, 1000); // 1 segundo

    /*const modalCadastroJoias = new bootstrap.Modal(document.getElementById('modalCadastroJoias'));
    modalCadastroJoias.show();*/
}

let tiposLivosBiblicos = [
    "Escrituras Hebraicas",
    "Escrituras Gregas",
]

//ATUALIZA A FUNCAO DO RELOGIO A CADA SEGUNDO
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

let escriturasHebraicas = [
    { nome: "Gênesis", alias: "Gên", capitulos: 50, lidos: [], versiculos: ['', 31, 25, 24, 26, 32] },
    { nome: "Êxodo", alias: "Êxo", capitulos: 40, lidos: [] },
    { nome: "Levítico", alias: "Lev", capitulos: 27, lidos: [] },
    { nome: "Números", alias: "Núm", capitulos: 36, lidos: [] },
    { nome: "Deuteronômio", alias: "Deu", capitulos: 34, lidos: [] },
    { nome: "Josué", alias: "Jos", capitulos: 24, lidos: [] },
    { nome: "Juízes", alias: "Jz", capitulos: 21, lidos: [] },
    { nome: "Rute", alias: "Rut", capitulos: 4, lidos: [] },
    { nome: "1 Samuel", alias: "1Sa", capitulos: 31, lidos: [] },
    { nome: "2 Samuel", alias: "2Sa", capitulos: 24, lidos: [] },
    { nome: "1 Reis", alias: "1Rs", capitulos: 22, lidos: [] },
    { nome: "2 Reis", alias: "2Rs", capitulos: 25, lidos: [] },
    { nome: "1 Crônicas", alias: "1Cr", capitulos: 29, lidos: [] },
    { nome: "2 Crônicas", alias: "2Cr", capitulos: 36, lidos: [] },
    { nome: "Esdras", alias: "Esd", capitulos: 10, lidos: [] },
    { nome: "Neemias", alias: "Nee", capitulos: 13, lidos: [] },
    { nome: "Ester", alias: "Est", capitulos: 10, lidos: [] },
    { nome: "Jó", alias: "Jó", capitulos: 42, lidos: [] },
    { nome: "Salmos", alias: "Sal", capitulos: 150, lidos: [] },
    { nome: "Provérbios", alias: "Pro", capitulos: 31, lidos: [] },
    { nome: "Eclesiastes", alias: "Ecl", capitulos: 12, lidos: [] },
    { nome: "Cânticos", alias: "Cân", capitulos: 12, lidos: [] },
    { nome: "Isaías", alias: "Isa", capitulos: 66, lidos: [] },
    { nome: "Jeremias", alias: "Jer", capitulos: 52, lidos: [], versiculos: ['',19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18] },
    { nome: "Lamentações", alias: "Lam", capitulos: 5, lidos: [] },
    { nome: "Ezequiel", alias: "Eze", capitulos: 48, lidos: [] },
    { nome: "Daniel", alias: "Dan", capitulos: 12, lidos: [] },
    { nome: "Oseias", alias: "Ose", capitulos: 14, lidos: [] },
    { nome: "Joel", alias: "Joe", capitulos: 3, lidos: [] },
    { nome: "Amós", alias: "Amó", capitulos: 9, lidos: [] },
    { nome: "Obadias", alias: "Oba", capitulos: 1, lidos: [] },
    { nome: "Jonas", alias: "Jon", capitulos: 4, lidos: [] },
    { nome: "Miquéias", alias: "Miq", capitulos: 7, lidos: [] },
    { nome: "Naum", alias: "Nau", capitulos: 3, lidos: [] },
    { nome: "Habacuque", alias: "Hab", capitulos: 3, lidos: [] },
    { nome: "Sofonias", alias: "Sof", capitulos: 3, lidos: [] },
    { nome: "Ageu", alias: "Age", capitulos: 2, lidos: [] },
    { nome: "Zacarias", alias: "Zac", capitulos: 14, lidos: [] },
    { nome: "Malaquias", alias: "Mal", capitulos: 100, lidos: [] }
];
let escriturasGregas = [
    { nome: "Mateus", alias: "Mat", capitulos: 28, lidos: [] },
    { nome: "Marcos", alias: "Mar", capitulos: 16, lidos: [] },
    { nome: "Lucas", alias: "Luc", capitulos: 24, lidos: [] },
    { nome: "João", alias: "Joã", capitulos: 21, lidos: [] },
    { nome: "Atos dos Apóstolos", alias: "Atos", capitulos: 28, lidos: [] },
    { nome: "Romanos", alias: "Rom", capitulos: 16, lidos: [] },
    { nome: "1 Coríntios", alias: "1Co", capitulos: 16, lidos: [] },
    { nome: "2 Coríntios", alias: "2Co", capitulos: 13, lidos: [] },
    { nome: "Gálatas", alias: "Gál", capitulos: 6, lidos: [] },
    { nome: "Efésios", alias: "Efé", capitulos: 6, lidos: [] },
    { nome: "Filipenses", alias: "Fil", capitulos: 4, lidos: [] },
    { nome: "Colossenses", alias: "Col", capitulos: 4, lidos: [] },
    { nome: "1 Tessalonicenses", alias: "1Ts", capitulos: 5, lidos: [] },
    { nome: "2 Tessalonicenses", alias: "2Ts", capitulos: 3, lidos: [] },
    { nome: "1 Timóteo", alias: "1Tm", capitulos: 6, lidos: [] },
    { nome: "2 Timóteo", alias: "2Tm", capitulos: 4, lidos: [] },
    { nome: "Tito", alias: "Tit", capitulos: 3, lidos: [] },
    { nome: "Filemom", alias: "Flm", capitulos: 1, lidos: [] },
    { nome: "Hebreus", alias: "Heb", capitulos: 13, lidos: [] },
    { nome: "Tiago", alias: "Tia", capitulos: 5, lidos: [] },
    { nome: "1 Pedro", alias: "1Pe", capitulos: 5, lidos: [] },
    { nome: "2 Pedro", alias: "2Pe", capitulos: 3, lidos: [] },
    { nome: "1 João", alias: "1Jo", capitulos: 5, lidos: [] },
    { nome: "2 João", alias: "2Jo", capitulos: 1, lidos: [] },
    { nome: "3 João", alias: "3Jo", capitulos: 1, lidos: [] },
    { nome: "Judas", alias: "Jud", capitulos: 1, lidos: [] },
    { nome: "Apocalipse", alias: "Apo", capitulos: 22, lidos: [] }
];

let livrosBiblicos = [];
livrosBiblicos[0] = escriturasHebraicas;
livrosBiblicos[1] = escriturasGregas;


const progressoSalvo = localStorage.getItem("progressoBiblia");
if (progressoSalvo) {
    livrosBiblicos = JSON.parse(progressoSalvo);
}

function salvarProgresso() {
    localStorage.setItem("progressoBiblia", JSON.stringify(livrosBiblicos));
}

function atualizaAccordionLivrosBiblicos() {

    var accordionContainer = document.getElementById("collapseLivrosBiblicos");

    if (!accordionContainer) {
        console.error("Elemento collapseLivrosBiblicos não encontrado!");
        return;
    }

    accordionContainer.innerHTML = "";

    for (let i = 0; i < tiposLivosBiblicos.length; i++) {

        accordionContainer.innerHTML += `
        <div class="row">
            <div class="col-12">
                <div class="alert alert-primary">
                    <div class="row">
                        <div class="col-9 col-col-sm-10 cl-md-10 col-lg-10 col-xg-10 d-flex justify-content-center align-items-center">
                            <span class="uppercase tamanho09 fw-bold">${tiposLivosBiblicos[i]}</span>
                        </div>
                        <div class="col">
                            <button class="btn btn-dark" type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapse${i}">
                                <i class="fa fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>

                    <div class="collapse mt-3" id="collapse${i}">
                        <div class="card card-body">
                            <div class="row" id="collapseLivrosBiblicos${i}"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;


        // container interno dos livros
        let containerLivros = document.getElementById(`collapseLivrosBiblicos${i}`);

        // array de livros desse tipo
        let livros = livrosBiblicos[i];

        for (let j = 0; j < livros.length; j++) {
            containerLivros.innerHTML += `
                <div class="col-3 mb-2">
                    <button class="btn btn-primary w-100 uppercase"
                        onclick="verificaQtdCapitulos(${i},${j})"
                        style="font-size: 0.6rem;">
                        ${livros[j].alias}
                    </button>
                </div>
            `;
        }
    }
}

function verificaQtdCapitulos(tipoIndex, livroIndex) {
    const tipo = tiposLivosBiblicos[tipoIndex];
    const livro = livrosBiblicos[tipoIndex][livroIndex];

    const exibicaoQtdCapitulosLivros = document.getElementById("exibicaoQtdCapitulosLivros");
    const qtdCapitulos = livro.capitulos;

    exibicaoQtdCapitulosLivros.innerHTML = ""; // limpa antes
    exibicaoQtdCapitulosLivros.innerHTML = `
        <div class="alert alert-info mb-3">
            <div class="row d-flex justify-content-center ">
                <div class="col text-center">
                    <span class="uppercase tamanho08">Capítulos do Livro de &nbsp;<b>${livro.nome}</b>  &nbsp;(${tipo})</span>
                </div>
                <div class="col-auto">
                    <button class="btn btn-sm btn-dark" onclick="location.reload();">
                        <i class="fa fa-refresh"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    for (let i = 1; i <= qtdCapitulos; i++) {
        const classe = livro.lidos.includes(i) ? "btn-success" : "btn-secondary";

        exibicaoQtdCapitulosLivros.innerHTML += `
            <button class="btn ${classe} mb-1 me-1"
                onclick="toggleCapitulo(this, ${tipoIndex}, ${livroIndex}, ${i}); exibirCapitulo('${tipo}', '${livro.nome}', ${i})"
                ondblclick="abreCadastroJoias('${livro.nome}', ${i})"
                style="width:48px;height:48px;font-size:0.9rem;">
                ${i}
            </button>
        `;
    }
}

function abreCadastroJoias(nomelivro, capituloEscolhido) {
    // Abre o modal
    const modalCadastroJoias = new bootstrap.Modal(document.getElementById('modalCadastroJoias'));
    modalCadastroJoias.show();

    // Elementos do modal
    var idJoia = document.getElementById('idJoia');
    var dataJoiaEspiritual = document.getElementById('dataJoiaEspiritual');
    var nomeLivroJoiaEspiritual = document.getElementById('nomeLivroJoiaEspiritual');
    var capituloJoiaEspiritual = document.getElementById('capituloJoiaEspiritual');
    var selectVersiculos = document.getElementById('qtdVerisculosExibe');


    // Data de hoje
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    dataJoiaEspiritual.value = `${ano}-${mes}-${dia}`;

    // Preenche livro e capítulo
    nomeLivroJoiaEspiritual.value = nomelivro;
    capituloJoiaEspiritual.value = capituloEscolhido;

    // Limpa o select antes de popular
    selectVersiculos.innerHTML = '';

    // Procura o livro no array
    let livro = escriturasHebraicas.find(l => l.nome === nomelivro);

    if (livro) {
        // Pega a quantidade de versículos do capítulo
        let nVersiculos = livro.versiculos[capituloEscolhido] || 0;

        // Cria as opções de 1 até nVersiculos
        for (let i = 1; i <= nVersiculos; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.text = i;
            selectVersiculos.appendChild(option);
        }
    }

    let totalJoias = 0;

    for (let cat in joiasEspirituais) {
        if (joiasEspirituais[cat][nomelivro] && joiasEspirituais[cat][nomelivro][capituloEscolhido]) {

            let versiculos = joiasEspirituais[cat][nomelivro][capituloEscolhido];

            for (let ver in versiculos) {
                totalJoias += versiculos[ver].length;
            }
        }
    }

idJoia.value = `${String(totalJoias).padStart(2,"0")}${nomelivro.slice(0,3)}_cp${capituloEscolhido}`;
}

function toggleCapitulo(btn, tipoIndex, livroIndex, capitulo) {

    const livro = livrosBiblicos[tipoIndex][livroIndex];
    const pos = livro.lidos.indexOf(capitulo);

    if (pos === -1) {
        livro.lidos.push(capitulo);
        btn.classList.remove("btn-secondary");
        btn.classList.add("btn-success");
    } else {
        livro.lidos.splice(pos, 1);
        btn.classList.remove("btn-success");
        btn.classList.add("btn-secondary");
    }

    salvarProgresso();
}

class JoiaEspiritual {
    constructor(dataJoiaEspiritual, nomeLivro, capitulo, versiculo, textoBiblico, anotacaoJoia, categoriaJoia, fonteMateria) {
        this.dataJoiaEspiritual = dataJoiaEspiritual;
        this.nomeLivro = nomeLivro;
        this.capitulo = capitulo;
        this.versiculo = versiculo;
        this.textoBiblico = textoBiblico;
        this.anotacaoJoia = anotacaoJoia;
        this.catagoriaJoia = categoriaJoia;
        this.fonteMateria = fonteMateria;
    }
}

let joiasEspirituais = JSON.parse(localStorage.getItem("joiasEspirituais")) || {};


function salvarJoiaEspiritual() {

    let data = document.getElementById("dataJoiaEspiritual").value;
    let livro = document.getElementById("nomeLivroJoiaEspiritual").value;
    let capitulo = document.getElementById("capituloJoiaEspiritual").value;
    let versiculo = document.getElementById("qtdVerisculosExibe").value;
    let textoBiblico = document.getElementById('textoBiblicoJoiaEspiritual').value;
    let anotacao = document.getElementById("anotacaoJoiaEspiritual").value;
    let fonte = document.getElementById("fonteMateriaJoia").value;

    const radioSelecionado = document.querySelector('input[name="tipoJoia"]:checked');
    let categoria = radioSelecionado ? radioSelecionado.id : null;

    if (!categoria) {
        alert("Selecione uma categoria.");
        return;
    }

    if (!livro || !capitulo || !versiculo) {
        alert("Livro, capítulo ou versículo inválido.");
        return;
    }

    if (!joiasEspirituais[categoria]) joiasEspirituais[categoria] = {};
    if (!joiasEspirituais[categoria][livro]) joiasEspirituais[categoria][livro] = {};
    if (!joiasEspirituais[categoria][livro][capitulo]) joiasEspirituais[categoria][livro][capitulo] = {};
    if (!joiasEspirituais[categoria][livro][capitulo][versiculo]) {
        joiasEspirituais[categoria][livro][capitulo][versiculo] = [];
    }

    let lista = joiasEspirituais[categoria][livro][capitulo][versiculo];

    let existe = lista.some(j => j.anotacao === anotacao);

    if (existe) {
        alert("Esta joia já foi cadastrada para este versículo.");
        return;
    }

    lista.push({
        data: data,
        textoBiblico: textoBiblico,
        anotacao: anotacao,
        fonteMateria: fonte
    });

    localStorage.setItem("joiasEspirituais", JSON.stringify(joiasEspirituais));

    alert(`Joia adicionada em ${livro} ${capitulo}:${versiculo}`);
}

function mostraDataAtualLeituraBiblia(idCampo){
    var data = new Date();
    var dia = String(data.getDate()).padStart(2,'0');
    var mes = String(data.getMonth()+1).padStart(2,'0');
    var ano = data.getFullYear();

    var dataAtual = `${ano}-${mes}-${dia}`;
    var campo = document.getElementById(idCampo);
    campo.value = dataAtual;
}

function mostraJoiasEspirituais() {
    var exibicaoQtdCapitulosLivros = document.getElementById("exibicaoQtdCapitulosLivros");

    exibicaoQtdCapitulosLivros.innerHTML = '';
    exibicaoQtdCapitulosLivros.innerHTML += `
        <div class="row">
            <div class="col-auto">
                <div class="row" style="visibility: hidden;">teste</div>
                <div class="row">
                    <span type="button" class="bg-primary text-light px-2 py-1 mt-1 rounded" onclick="mostraJoiasPesquisa('todas','todas')">
                        <i class="fa fa-solid fa-gem"></i>
                        <span class="uppercase" style="font-size: 0.7rem">&nbsp;&nbsp;Todas Jóias</span>
                    </span>
                </div>
            </div>

            <div class="col-auto text-center">
                <label class="uppercase mb-2" style="font-size: 0.7rem">
                    Pesquisar por:
                </label>
                <select class="form-select text-center uppercase" style="font-size: 0.7rem" onchange="tipoPesquisaJoia(this.value)">
                    <option value="-">-</option>
                    <option value="pesquisaJoiaCategoria">Categoria</option>
                    <option value="pesquisaJoiaDataCadastro">Data de Cadastro da Jóia</option>
                    <option value="pesquisaJoiaNomeLivro">Nome do Livro</option>
                    <option value="pesquisaJoiaTermoAnotado">Termo anotado</option>
                </select>
            </div>

            <div class="col-auto d-none text-center m-2 m-sm-0 m-lg-0" id="colunaDataExibe">
                <label class="uppercase mb-2" style="font-size: 0.7rem">
                    data da Jóia Espiritual:
                </label>
                <div class="input-group">
                    <input type="date" class="form-control uppercase text-center" id="dataPesquisa" style="font-size: 0.7rem">
                    <button class="btn btn-sm btn-primary"
                    onclick="mostraJoiasPesquisa('data',document.getElementById('dataPesquisa').value)">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>

            <div class="col d-none text-center m-2 m-sm-0 m-lg-0" id="colunaTipoEscrituraExibe">
                <label class="uppercase mb-2" style="font-size: 0.7rem">
                    Tipo de Escritura:
                </label>
                <div class="input-group">
                    <select class="form-select uppercase text-center" style="font-size:0.7rem"
                    onchange="escolhaTipoEscritura(this.value)">
                        <option value="-" selected>-</option>
                        <option value="escriturasHebraicas">Escrituras Hebraicas</option>
                        <option value="escriturasGregas">Escrituras Gregas</option>
                    </select>
                </div>
            </div>

            <div class="col d-none text-center m-2 m-sm-0 m-lg-0" id="colunaNomeLivroExibe">
                <label class="uppercase mb-2" style="font-size: 0.7rem">
                    Nome do Livro:
                </label>
                <div class="input-group">
                    <select class="form-select uppercase text-center" id="mostraLivrosEscriturasJoias" style="font-size:0.7rem"></select>
                    <button class="btn btn-sm btn-primary"
                    onclick="mostraJoiasPesquisa('nomeLivro', document.getElementById('mostraLivrosEscriturasJoias').value)">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>

            <div class="col d-none text-center" id="colunaTermoAnotadoExibe">
                <label class="uppercase mb-2" style="font-size: 0.7rem">
                    Termo Anotado:
                </label>
                <div class="input-group">
                    <input type="text" class="form-control uppercase" id="termoPesquisa" style="font-size: 0.7rem">
                    <button class="btn btn-sm btn-primary"
                    onclick="mostraJoiasPesquisa('termoAnotado', document.getElementById('termoPesquisa').value)">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>

            <div class="col-3 d-none text-center" id="colunaCategoriasExibe">
                <label class="uppercase mb-2" style="font-size: 0.7rem">
                    nome da categoria:
                </label>
                <div class="input-group">
                    <select class="form-select text-center uppercase" id="categoriaPesquisa" style="font-size: 0.7rem">
                        <option>Sobre Jeová</option>
                        <option>Pregação</option>
                        <option>Vida Cristã</option>
                        <option>Qualidades</option>
                        <option>Defeitos</option>
                        <option>Outro Tema</option>
                    </select>
                    <button class="btn btn-sm btn-primary"
                    onclick="mostraJoiasPesquisa('categoria', document.getElementById('categoriaPesquisa').value)">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    `

    console.log("Filtradas:", joiasFiltradas.length);
    console.log("Tipo:", tipo);
    console.log("Valor:", valor);
    console.log("Array completo:", joiasEspirituais);
}

function escolhaTipoEscritura(valor) {
    // mostra o container do select
    var colunaNomeLivroExibe = document.getElementById('colunaNomeLivroExibe');
    colunaNomeLivroExibe.classList.remove('d-none');

    // pega o select
    var mostraLivrosEscriturasJoias = document.getElementById('mostraLivrosEscriturasJoias');

    // limpa o select antes
    mostraLivrosEscriturasJoias.innerHTML = '';

    // opção padrão
    let defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Selecione o livro';
    mostraLivrosEscriturasJoias.appendChild(defaultOption);

    let livrosParaExibir = [];

    if (valor === 'escriturasHebraicas') {
        livrosParaExibir = escriturasHebraicas;
    } else if (valor === 'escriturasGregas') {
        livrosParaExibir = escriturasGregas;
    } else {
        // se escolher "-", mantém o select oculto
        colunaNomeLivroExibe.classList.add('d-none');
    }

    // percorre o array e cria as opções
    livrosParaExibir.forEach(livro => {
        let option = document.createElement('option');
        option.value = livro.nome;
        option.text = livro.nome;
        mostraLivrosEscriturasJoias.appendChild(option);
    });
}

function tipoPesquisaJoia(valor) {
    var selectCategorias = document.getElementById("colunaCategoriasExibe");
    var colunaDataExibe = document.getElementById("colunaDataExibe");
    var colunaTipoEscrituraExibe = document.getElementById("colunaTipoEscrituraExibe");
    var colunaTermoAnotadoExibe = document.getElementById("colunaTermoAnotadoExibe");
    var colunaNomeLivroExibe = document.getElementById('colunaNomeLivroExibe');

    mostraDataAtualLeituraBiblia('dataPesquisa')

    switch (valor) {
        case '-':
            selectCategorias.classList.add('d-none');
            colunaDataExibe.classList.add('d-none');
            colunaTipoEscrituraExibe.classList.add('d-none');
            colunaTermoAnotadoExibe.classList.add('d-none');
            colunaNomeLivroExibe.classList.add('d-none'); // esconde o select
            break;

        case 'pesquisaJoiaCategoria':
            selectCategorias.classList.remove('d-none');
            colunaDataExibe.classList.add('d-none');
            colunaTipoEscrituraExibe.classList.add('d-none');
            colunaTermoAnotadoExibe.classList.add('d-none');
            colunaNomeLivroExibe.classList.add('d-none'); // esconde o select
            break;

        case 'pesquisaJoiaDataCadastro':
            selectCategorias.classList.add('d-none');
            colunaDataExibe.classList.remove('d-none');
            colunaTipoEscrituraExibe.classList.add('d-none');
            colunaTermoAnotadoExibe.classList.add('d-none');
            colunaNomeLivroExibe.classList.add('d-none'); // esconde o select
            break;

        case 'pesquisaJoiaNomeLivro':
            selectCategorias.classList.add('d-none');
            colunaDataExibe.classList.add('d-none');
            colunaTipoEscrituraExibe.classList.remove('d-none'); // mostra tipo de escritura
            colunaTermoAnotadoExibe.classList.add('d-none');
            colunaNomeLivroExibe.classList.remove('d-none');      // mostra select de livros
            break;

        case 'pesquisaJoiaTermoAnotado':
            selectCategorias.classList.add('d-none');
            colunaDataExibe.classList.add('d-none');
            colunaTipoEscrituraExibe.classList.add('d-none');
            colunaTermoAnotadoExibe.classList.remove('d-none');
            colunaNomeLivroExibe.classList.add('d-none'); // esconde o select
            break;
    }
}

function mostraJoiasPesquisa(tipo, valor) {
    var collapseMostraJoias = document.getElementById('collapseMostraJoias');
    collapseMostraJoias.innerHTML = '';

    const mapaCategorias = {
        "Sobre Jeová": "joiaSobreJeova",
        "Pregação": "joiaSobrePregacao",
        "Vida Cristã": "joiaSobreVidaCrista",
        "Qualidades": "joiaSobreQualidades",
        "Defeitos": "joiaSobreDefeitos",
        "Outro Tema": "joiaSobreOutroTema"
    };

    // Mapa inverso: ID → nome da categoria
    const nomeCategoria = {
        "joiaSobreJeova": "Sobre Jeová",
        "joiaSobrePregacao": "Pregação",
        "joiaSobreVidaCrista": "Vida Cristã",
        "joiaSobreQualidades": "Qualidades",
        "joiaSobreDefeitos": "Defeitos",
        "joiaSobreOutroTema": "Outro Tema"
    };

    let joiasFiltradas = [];

    // Transformar objeto aninhado em array plano
    for (let catID in joiasEspirituais) {
        for (let livro in joiasEspirituais[catID]) {
            for (let cap in joiasEspirituais[catID][livro]) {
                for (let ver in joiasEspirituais[catID][livro][cap]) {
                    let registros = joiasEspirituais[catID][livro][cap][ver];
                    registros.forEach((item, index) => {
                        joiasFiltradas.push({
                            categoriaID: catID,
                            livro: livro,
                            capitulo: cap,
                            versiculo: ver,
                            indice: index,
                            textoBiblico: item.textoBiblico,
                            data: item.data,
                            anotacao: item.anotacao,
                            fonte: item.fonteMateria
                        });
                    });
                }
            }
        }
    }

    // Aplicar filtro
    let resultados = [];
    switch (tipo) {
        case 'categoria':
            resultados = joiasFiltradas.filter(j => j.categoriaID === mapaCategorias[valor]);
            break;
        case 'data':
            resultados = joiasFiltradas.filter(j => j.data === valor);
            break;
        case 'nomeLivro':
            resultados = joiasFiltradas.filter(j => j.livro === valor);
            break;
        case 'termoAnotado':
            resultados = joiasFiltradas.filter(j => j.anotacao.toLowerCase().includes(valor.toLowerCase()));
            break;
        case 'todas':
            resultados = joiasFiltradas;
        break;
    }

    // Ordenar capítulo e versículo
    resultados.sort((a, b) => {
        const capA = Number(a.capitulo);
        const capB = Number(b.capitulo);
        const verA = Number(a.versiculo);
        const verB = Number(b.versiculo);
        if (capA !== capB) return capA - capB;
        return verA - verB;
    });

    if (resultados.length === 0) {
        collapseMostraJoias.innerHTML = `
            <div class="alert alert-warning uppercase text-center fw-bold" style="font-size: 0.7rem">
                <i class="fa fa-ban"></i>&nbsp;&nbsp;
                <span>Nenhuma joia encontrada para os critérios selecionados.</span>
            </div>
        `;
        collapseMostraJoias.classList.remove('collapse');
        collapseMostraJoias.classList.add('show');
        return;
    }

    // 🔹 Agrupar resultados por livro/cap/versículo
    const grupoJoias = {};
    resultados.forEach(j => {
        const key = `${j.livro}-${j.capitulo}-${j.versiculo}`;
        if (!grupoJoias[key]) grupoJoias[key] = [];
        grupoJoias[key].push(j);
    });

    // Renderizar cards agrupados
    for (let key in grupoJoias) {
        const grupo = grupoJoias[key];
        const primeiro = grupo[0]; // pega os dados básicos do primeiro registro

        collapseMostraJoias.innerHTML += `
            <div class="card mb-2 border-start border-primary border-1">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            ${grupo.map((j, index) => {
                                const dataFormatada = new Date(j.data).toLocaleDateString('pt-BR');
                                return `
                                <div class="mb-2 border-bottom pb-2">
                                    <!-- Linha do título + botões -->
                                    <div class="row">
                                        <div class="col">
                                            <div class="row">
                                                <div class="col">
                                                    <p class="text-muted fst-italic mb-1" style="font-size:0.92rem"> "${j.textoBiblico}" - <b class="uppercase" style="color: red">${j.livro} ${j.capitulo}:${j.versiculo}</b></p>
                                                    <p class="fw-bold mb-0 uppercase" style="font-size: 0.8rem"> </p>
                                                </div>
                                                <div class="col-auto">
                                                    <button class="btn btn-sm btn-dark"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapse_${j.categoriaID}_${j.livro}_${j.capitulo}_${j.versiculo}_${index}">
                                                        <i class="fa fa-solid fa-chevron-down"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row collapse" id="collapse_${j.categoriaID}_${j.livro}_${j.capitulo}_${j.versiculo}_${index}">
                                        <div class="row mt-3">
                                            <hr>
                                            <div class="col-3 d-flex align-items-center">
                                                <p class="small text-muted mb-1">
                                                    <i class="fa fa-calendar"></i> ${dataFormatada} &nbsp;|&nbsp;
                                                    <i class="fa fa-tag text-primary"></i> ${nomeCategoria[j.categoriaID] || j.categoriaID}
                                                </p>
                                            </div>
                                            <div class="col"></div>
                                        </div>

                                        <div class="col">                                            
                                            <div class="row mt-2">
                                                <div class="col">
                                                    <div class="card">
                                                        <div class="card-body">
                                                            <p class="card-text text-dark uppercase mb-1" style="font-size: 0.7rem">
                                                                ${j.anotacao}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-auto d-flex flex-column">
                                                    <button class="btn btn-sm btn-primary me-1"
                                                        onclick="toggleEditarJoia(this,'${j.categoriaID}','${j.livro}','${j.capitulo}','${j.versiculo}',${j.indice})">
                                                        <i class="fa fa-edit"></i>
                                                    </button>
                                                    <button class="btn btn-sm btn-danger mt-1"
                                                        onclick="apagarJoia('${j.categoriaID}','${j.livro}','${j.capitulo}','${j.versiculo}',${j.indice})">
                                                        <i class="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>


                                            <div class="row mt-3">
                                                <div class="col">
                                                    <span class="uppercase mb-1" style="font-size: 0.7rem">Fonte de Matéria: </span><br>
                                                    ${j.fonte ?
                                                        `<button class="btn btn-sm btn-primary mt-1">
                                                            <small class="text-muted uppercase" style="font-size="0.8rem;">
                                                                <a href="${j.fonte}" target="_blank" style="color: white">${j.fonte}</a>
                                                            </small>
                                                        </button>` : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    collapseMostraJoias.classList.remove('collapse');
    collapseMostraJoias.classList.add('show');
}

function apagarJoia(catID, livro, cap, ver, index) {

    if (!confirm("Deseja realmente apagar esta joia espiritual?")) {
        return;
    }

    joiasEspirituais[catID][livro][cap][ver].splice(index, 1);

    // Remove estruturas vazias
    if (joiasEspirituais[catID][livro][cap][ver].length === 0) {
        delete joiasEspirituais[catID][livro][cap][ver];
    }

    if (Object.keys(joiasEspirituais[catID][livro][cap]).length === 0) {
        delete joiasEspirituais[catID][livro][cap];
    }

    if (Object.keys(joiasEspirituais[catID][livro]).length === 0) {
        delete joiasEspirituais[catID][livro];
    }

    localStorage.setItem("joiasEspirituais", JSON.stringify(joiasEspirituais));

    alert("Joia espiritual apagada com sucesso!");

}

function editarJoia(catID, livro, cap, ver, index) {

    let joia = joiasEspirituais[catID][livro][cap][ver][index];

    let novaAnotacao = prompt("Editar anotação:", joia.anotacao);

    if (novaAnotacao === null) return;

    let novaFonte = prompt("Editar fonte:", joia.fonteMateria);

    joiasEspirituais[catID][livro][cap][ver][index].anotacao = novaAnotacao;
    joiasEspirituais[catID][livro][cap][ver][index].fonteMateria = novaFonte;

    localStorage.setItem("joiasEspirituais", JSON.stringify(joiasEspirituais));

    alert("Joia espiritual editada com sucesso!");

    location.reload();
}

function toggleEditarJoia(btn, catID, livro, cap, ver, index) {

    let icone = btn.querySelector("i");

    // SE ESTÁ EM MODO EDITAR
    if (btn.classList.contains("btn-primary")) {

        btn.classList.remove("btn-primary");
        btn.classList.add("btn-success");

        icone.classList.remove("fa-edit");
        icone.classList.add("fa-save");

        // habilitar edição do texto
        let card = btn.closest(".card");
        let texto = card.querySelector(".card-text");

        texto.contentEditable = true;
        texto.focus();

    }

    // SE ESTÁ EM MODO SALVAR
    else {

        let card = btn.closest(".card");
        let texto = card.querySelector(".card-text");

        let novoTexto = texto.innerText;

        joiasEspirituais[catID][livro][cap][ver][index].anotacao = novoTexto;

        localStorage.setItem("joiasEspirituais", JSON.stringify(joiasEspirituais));

        texto.contentEditable = false;

        btn.classList.remove("btn-success");
        btn.classList.add("btn-primary");

        icone.classList.remove("fa-save");
        icone.classList.add("fa-edit");

        alert("Joia atualizada!");
    }

}

function mostraDataAtualLeituraBiblia(idCampo){
    var campoData = document.getElementById(idCampo);
    var data = new Date();
    var dia = String(data.getDate()).padStart(2,'0');
    var mes = String(data.getMonth()+1).padStart(2,'0');
    var ano = data.getFullYear();

    campoData.value = `${ano}-${mes}-${dia}`; //importante manter assim para ser exibido no formato dd/mm/aaaa no input
}