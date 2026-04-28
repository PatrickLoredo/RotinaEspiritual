let editores = {};


//---------------------- FUNÇÕES DE TODAS PAGINAS ----------------------
//INICIA AUTOMATICAMENTE
window.onload = function () {

    atualizaRelogio('relogioPagina');

    setInterval(function () {
        atualizaRelogio('relogioPagina');
    }, 1000);

    mostraCategoriasSalvas();
    popularSelect('categoriaNovoEstudoPessoal');
    gerarCodigoEstudoPessoal();

    // 🔵 verificar se precisa clicar em alguma categoria após reload
    const categoria = localStorage.getItem("categoriaSelecionada");

    if(categoria){
        const botao = document.getElementById(`categoriaSalva_${categoria}`);

        if(botao){
            botao.click();
        }

        localStorage.removeItem("categoriaSelecionada");
    }
};

// ===============================
// 🔥 CONFIG GLOBAL QUILL
// ===============================

var Size = Quill.import('attributors/class/size');
Size.whitelist = ['8px','10px','12px','14px','16px','18px','20px','24px','32px'];
Quill.register(Size, true);

const toolbarOptions = [
  [{ font: [] }],
  [{ size: Size.whitelist }],

  ['bold', 'italic', 'underline', 'strike'],

  [{ color: [] }, { background: [] }],

  [{ script: 'sub' }, { script: 'super' }],

  [{ header: 1 }, { header: 2 }, 'blockquote', 'code-block'],

  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],

  [{ align: [] }],

  ['link', 'image', 'video'],

  ['clean']
];

const quillNovoEstudo = new Quill('#editorInfoNovoEstudoPessoal', {
    theme: 'snow',
    modules: {
        toolbar: {
            container: toolbarOptions,
            handlers: {
                image: function () {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();

                    input.onchange = async () => {
                        const file = input.files[0];

                        if (!file) return;

                        // 🔥 aqui você comprime a imagem
                        const base64 = await comprimirImagem(file, 0.7, 800);

                        const range = quillNovoEstudo.getSelection();
                        quillNovoEstudo.insertEmbed(range.index, 'image', base64);
                    };
                }
            }
        }
    }
});

//ATUALIZA A FUNCAO DO RELOGIO A CADA SEGUNDO
function atualizaRelogio(idRelogio){
    var data = new Date();
    var dia = String(data.getDate()).padStart(2,'0');
    var mes = String(data.getMonth()+1).padStart(2,'0');
    var ano = data.getFullYear();

    var horas = String(data.getHours()).padStart(2,'0');
    var minutos = String(data.getMinutes()).padStart(2,'0');
    var segundos = String(data.getSeconds()).padStart(2,'0');

    var dataAtual = (`${dia}/${mes}/${ano}`)
    var horaAtual = (`${horas}:${minutos}:${segundos}`)

    var campoRelogio = document.getElementById(idRelogio);
    campoRelogio.innerHTML = '';
    campoRelogio.innerHTML = `${dataAtual} - ${horaAtual}`;
}

// ALTERA O ICONE CHEVRON DO COLLAPSE QUANDO CLICADO
function verificaTrocaIconeCollapse(id){
    var icone = document.getElementById(id);

    if (icone.classList.contains('fa-chevron-down')) {
        icone.classList.remove('fa-chevron-down');
        icone.classList.add('fa-chevron-up');
    } else {
        icone.classList.remove('fa-chevron-up');
        icone.classList.add('fa-chevron-down'); 
    }
}

function mostraDataAtual(idCampo){
    var data = new Date();
    var dia = String(data.getDate()).padStart(2,'0');
    var mes = String(data.getMonth()+1).padStart(2,'0');
    var ano = data.getFullYear();

    var dataAtual = `${ano}-${mes}-${dia}`;
    var campo = document.getElementById(idCampo);
    campo.value = dataAtual;
}

function mostrarDiaSemana(idCampoDataEscolhida,idCampoDiaSemana){
    var data = document.getElementById(idCampoDataEscolhida).value;

    if(!data) return;

    var diaSemana = new Date(data).getDay();

    var dias = ["Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado","Domingo"];

    var diaEscolhido = dias[diaSemana];

    var campo = document.getElementById(idCampoDiaSemana);
    campo.value = diaEscolhido;
}

//----------------------- FUNÇÕES DA PAGINA INDEX -----------------------
function verificaAlertAberto(tipo) {

    const categorias = {
        todasTarefas: document.getElementById("alertasTodasTarefas"),
        tarefasAtrasadas: document.getElementById("alertasAtrasadas"),
        tarefasProximas: document.getElementById("alertasProximas"),
        tarefasNoPrazo: document.getElementById("alertasNoPrazo"),
        tarefasConcluidas: document.getElementById("alertasConcluidas")
    };

    Object.keys(categorias).forEach(categoria => {
        if (categoria === tipo) {
            categorias[categoria].classList.remove('collapse');
            categorias[categoria].classList.add('show');
        } else {
            categorias[categoria].classList.remove('show');
            categorias[categoria].classList.add('collapse');
        }
    });
}

//----------------------- FUNÇÕES DA PAGINA ESTUDO PESSSOAL -----------------------
let arrayCategoriasEstudoPessoal = [];
let arrayConjuntoEstudosPessoais = [];

// categorias
const dadosCategorias = localStorage.getItem("estudos");
if(dadosCategorias){
    arrayCategoriasEstudoPessoal = JSON.parse(dadosCategorias);
}

// estudos salvos
const dadosEstudos = localStorage.getItem("estudosSalvos");
if(dadosEstudos){
    arrayConjuntoEstudosPessoais = JSON.parse(dadosEstudos);
}

// CLASSE PARA CRIAÇÃO DE OBJETOS DE ESTUDO PESSOAL
class EstudoPessoal {
    constructor(codigo, data, categoria, titulo, descricao){
        this.codigo = codigo;
        this.data = data;
        this.categoria = categoria;
        this.titulo = titulo;
        this.descricao = descricao;
    }
}

//Função para criar novo estudo pessoal, salvar no array e localStorage, atualizar telas e fechar modal
function criarEstudo(){
    const codigo = document.getElementById('codigoNovoEstudoPessoal').value;
    const data = document.getElementById('dataNovoEstudoPessoal').value;
    const categoria = document.getElementById('categoriaNovoEstudoPessoal').value;
    const titulo = document.getElementById('tituloNovoEstudoPessoal').value;
    const descricao = quillNovoEstudo.root.innerHTML;
    const btnCadastro = document.getElementById('btnCadastroNovoEstudo');


    const novoEstudo = new EstudoPessoal(codigo, data, categoria, titulo, descricao);
     
    arrayConjuntoEstudosPessoais.push(novoEstudo)
    localStorage.setItem("estudosSalvos", JSON.stringify(arrayConjuntoEstudosPessoais));

    console.log(novoEstudo);

    alert("Salvo com sucesso!");

    mostraCategoriasSalvas();
    popularSelect('categoriaNovoEstudoPessoal')
    gerarCodigoEstudoPessoal()
    btnCadastro.click();
    document.getElementById(`categoriaSalva_${categoria}`).click();
}

//Gera Código do Estudo Pessoal -- Formato EP_ + quantidade de itens no array + 1
function gerarCodigoEstudoPessoal(){
    document.getElementById('codigoNovoEstudoPessoal').value = `EP_${arrayConjuntoEstudosPessoais.length+1}`;
    document.getElementById('tituloNovoEstudoPessoal').value = '';
}

// Exibe Categoria Cadastrada -- Altera cor do button conforme quantidade de itens no array
function mostraCategoriasSalvas(){
    var categoriasEstudosRealizados = document.getElementById("categoriasEstudosRealizados");

    categoriasEstudosRealizados.innerHTML = '';

    if(arrayCategoriasEstudoPessoal.length === 0){
        categoriasEstudosRealizados.innerHTML = `
            <div class="col"></div>
            <div class="col-10">
                <div class="alert alert-primary text-center uppercase tamanho08">Nenhuma Categoria Salva</div>
            </div>
            <div class="col"></div>
        `   
    }
    for(let i = 0 ; i < arrayCategoriasEstudoPessoal.length;i++){
        if(i%2 === 0){
            categoriasEstudosRealizados.innerHTML += `
                <div class="col-auto mb-2">
                    <button class="w-100 btn btn-sm btn-success uppercase px-3"
                    id="categoriaSalva_${arrayCategoriasEstudoPessoal[i].tituloEstudoPessoal}"
                    onclick="carregarEstudos('filtrar', '${arrayCategoriasEstudoPessoal[i].tituloEstudoPessoal}')">
                        ${arrayCategoriasEstudoPessoal[i].tituloEstudoPessoal}
                    </button>
                </div>
            `
        }
        else{
            categoriasEstudosRealizados.innerHTML += `
                <div class="col-auto mb-2">
                    <button class="w-100 btn btn-sm btn-primary uppercase px-3"
                    onclick="carregarEstudos('filtrar', '${arrayCategoriasEstudoPessoal[i].tituloEstudoPessoal}')">
                        ${arrayCategoriasEstudoPessoal[i].tituloEstudoPessoal}
                    </button>
                </div>
            `   
        }
    }
}

//Função para carregar estudos pessoais cadastrados, com opção de filtro por categoria, exibir na tela, atualizar editores e botões de ação
function carregarEstudos(tipoEscolha, categoria = null){
    editores = {};

    const container = document.getElementById('campoExibicaoEstudosCategoria');
    container.classList.remove('collapse');
    container.classList.add('show');

    let lista = arrayConjuntoEstudosPessoais
        .map((e, i) => ({ ...e, indexOriginal: i }));

    if(tipoEscolha === 'filtrar' && categoria){
        lista = lista.filter(e => e.categoria === categoria);
    }

    if(lista.length === 0){
        container.innerHTML = `
        <div class="alert alert-primary text-center uppercase tamanho08">
            Nenhum Estudo Encontrado ${categoria ? `para a categoria <b>${categoria}</b>` : ''}
        </div>`;
        return;
    }

    let html = '';

    lista.forEach(estudo => {
        const index = estudo.indexOriginal;
        const id = `estudo_${index}`;

        html += `
        <div class="row" id="${id}">
            <div class="col">

                <div class="row alert alert-primary">

                    <div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-2">
                        <label class="uppercase tamanho07 d-flex justify-content-center">Data</label>
                        <input class="form-control text-center" type="date" id="input_dataEstudo_${index}" value="${estudo.data}"disabled style="font-size: 0.8em;"></div>

                    <div class="col-12 col-sm-8 col-md-9 col-lg-3 mb-2">
                        <label class="uppercase tamanho07 d-flex justify-content-center">Categoria</label>
                        <select class="form-select text-center" id="input_categoriaEstudo_${index}" disabled style="font-size: 0.8em;">
                            <option selected>${estudo.categoria}</option>
                        </select>
                    </div>

                    <div class="col-12 col-md-9 col-lg mb-2">
                        <label class="uppercase tamanho07 d-flex justify-content-center">Título</label>
                        <input class="form-control text-center uppercase" id="input_tituloEstudo_${index}" value="${estudo.titulo}" disabled style="font-size: 0.8em;">
                    </div>

                    <div class="col-12 col-md-3 col-lg-2 d-flex gap-2 align-items-center">
                        <button class="btn btn-primary"
                            id="btnEditarEstudo_${id}"
                            onclick="editarEstudo('${id}')">
                            <i class="fa fa-edit"></i>&nbsp;
                            <span class="uppercase">Editar</span>
                        </button>

                        <button class="btn btn-success d-none"
                            id="btnSalvarEstudo_${id}"
                            onclick="salvarEdicaoEstudo('${id}')">
                            <i class="fa fa-save"></i>&nbsp;
                            <span class="uppercase">Salvar</span>
                        </button>

                        <button class="btn btn-dark"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseEstudo_${id}"
                            onclick="trocaChevron('chevron_${id}')">
                            <i class="fa fa-chevron-down" id="chevron_${id}"></i>
                        </button>

                    </div>

                </div>

                <div class="row mt-3 collapse" id="collapseEstudo_${id}">
                    <div class="col-12 quill-wrapper">
                        <div id="editor_${id}"></div>
                    </div>
                </div>

            </div>
        </div>`;
    });

    container.innerHTML = html;

    // inicializa quill
    lista.forEach(estudo => {
        const index = estudo.indexOriginal;
        const id = `estudo_${index}`;

        const quill = new Quill(`#editor_${id}`, {
            theme: 'snow',
            modules: { toolbar: toolbarOptions }
        });

        quill.enable(false);

        if(estudo.descricao){
            quill.root.innerHTML = estudo.descricao;
        }

        editores[id] = quill;
    });
}

//Exibe todos os estudos pessoais cadastrados, sem filtro de categoria
function ExibetodosEstudos(){
    editores = {};

    const campoExibicao = document.getElementById('campoExibicaoEstudosCategoria');
    campoExibicao.innerHTML = "";

    const lista = arrayConjuntoEstudosPessoais
        .map((e, i) => ({ ...e, indexOriginal: i }));

    if(lista.length === 0){
        campoExibicao.innerHTML = `
        <div class="alert alert-primary text-center uppercase tamanho08">
            Nenhum Estudo Encontrado
        </div>`;
        return;
    }

    let html = '';

    for(let i = 0; i < lista.length; i++){
        const estudo = lista[i];
        const index = estudo.indexOriginal;
        const id = `estudo_${index}`;

        html += `
        <div class="row" id="${id}">
            <div class="col">
                <div class="row alert alert-danger">

                    <div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-2">
                        <label class="uppercase tamanho08 d-flex justify-content-center form-label">Data do Estudo</label>
                        <input class="form-control text-center" type="date"
                        id="input_dataEstudo_${index}" value="${estudo.data}" disabled style="font-size: 0.8em;">
                    </div>

                    <div class="col-12 col-sm-8 col-md-9 col-lg-3 mb-2">
                        <label class="tamanho08 d-flex justify-content-center form-label">Categoria</label>
                        <select class="form-select text-center"
                        id="input_categoriaEstudo_${index}" disabled style="font-size: 0.8em;">
                            <option selected>${estudo.categoria}</option>
                        </select>
                    </div>

                    <div class="col-12 col-md-9 col-lg mb-4 mb-md-0">
                        <label class="uppercase tamanho08 d-flex justify-content-center form-label">Título</label>
                        <input class="form-control text-center uppercase"
                        id="input_tituloEstudo_${index}" value="${estudo.titulo}" disabled style="font-size: 0.8em;">
                    </div>

                    <div class="col-12 col-md-3 col-lg-2 d-flex flex-nowrap align-items-center gap-2">
                        <label class="uppercase tamanho08 d-flex justify-content-center form-label" style="visibility:hidden;">Ações</label>

                        <button class="btn btn-primary mt-3"
                        id="btnEditarEstudo_${id}"
                        onclick="editarEstudo('${id}')">
                            <i class="fa fa-edit"></i>&nbsp;
                            <span class="uppercase">Editar</span>
                        </button>

                        <button class="btn btn-success d-none mt-3"
                        id="btnSalvarEstudo_${id}"
                        onclick="salvarEdicaoEstudo('${id}')">
                            <i class="fa fa-save"></i>&nbsp;
                            <span class="uppercase">Salvar</span>
                        </button>

                        <button class="btn btn-dark mt-3"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEstudo_${id}"
                        onclick="trocaChevron('chevron_${id}')">
                            <i class="fa fa-chevron-down" id="chevron_${id}"></i>
                        </button>
                    </div>

                </div>

                <div class="row mt-4 collapse" id="collapseEstudo_${id}">
                    <div id="editor_${id}"></div>
                </div>

            </div>
        </div>
        `;
    }

    campoExibicao.innerHTML = html;

    // inicializa quill
    for(let i = 0; i < lista.length; i++){
        const estudo = lista[i];
        const index = estudo.indexOriginal;
        const id = `estudo_${index}`;

        const quill = new Quill(`#editor_${id}`, {
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            }
        });

        quill.enable(false);

        if(estudo.descricao){
            quill.root.innerHTML = estudo.descricao;
        }

        editores[id] = quill;
    }
}

//Comprime imagem usando Canvas e FileReader, retorna base64
function comprimirImagem(file, qualidade = 0.7, maxLargura = 800) {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = function (event) {
            const img = new Image();

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let largura = img.width;
                let altura = img.height;

                // 🔽 Reduz proporção
                if (largura > maxLargura) {
                    altura *= maxLargura / largura;
                    largura = maxLargura;
                }

                canvas.width = largura;
                canvas.height = altura;

                ctx.drawImage(img, 0, 0, largura, altura);

                // 🔥 Aqui acontece a compressão
                const base64 = canvas.toDataURL('image/jpeg', qualidade);

                resolve(base64);
            };

            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    });
}

//Função para mostrar ou ocultar categorias cadastradas para estudos pessoais
function mostraCategoriaOculta(id){
    var categoria = document.getElementById(id);
    if(categoria.classList.contains('d-none')){
        categoria.classList.remove('d-none');
    }
    else{
        categoria.classList.add('d-none');
    }
}

//Abre o modal de Categorias Cadastradas com a população do Array
function mostraModalCategoriasEstudos(){
    const campo = document.getElementById('campoExibeCategoriasEstudoPessoal');

    let html = '';

    if(arrayCategoriasEstudoPessoal.length === 0){
        html = '<div class="alert alert-primary text-center uppercase tamanho08">Nenhuma Categoria Salva</div>';
    } 
    else {
        for(let i = 0; i < arrayCategoriasEstudoPessoal.length; i++){
            html += `
                <div class="row mb-2">
                    <div class="col"></div>
                    
                    <div class="col-8">
                        <div class="input-group">
                            <input type="text" class="form-control text-center"
                            id="${i}"
                            value="${arrayCategoriasEstudoPessoal[i].tituloEstudoPessoal}"
                            disabled style="font-size: 0.8em;">
                            <button class="btn btn-sm btn-primary"
                            id="btn_${i}"
                            onclick="editarSalvarCategoriaEstudo('${i}')">
                                <i class="fa fa-edit" id="icone_${i}"></i>
                            </button>
                            <button class="btn btn-sm btn-danger"
                            id="btnTrash_${i}"
                            onclick="apagarCategoria('${i}')">
                                <i class="fa fa-trash" id="iconeTrash_${i}"></i>
                            </button>
                        </div>
                    </div>

                    <div class="col"></div>
                </div>
            `;
        }
    }

    campo.innerHTML = html;
}

//Edita nome da Categoria do Array
function editarSalvarCategoriaEstudo(id) {

    let inputEscolhido = document.getElementById(id);
    let button = document.getElementById(`btn_${id}`);
    let icone = document.getElementById(`icone_${id}`);

    if(inputEscolhido.disabled){
        // MODO EDIÇÃO
        inputEscolhido.dataset.valorAntigo = inputEscolhido.value;
        inputEscolhido.disabled = false;
        inputEscolhido.focus();

        button.classList.remove('btn-primary');
        button.classList.add('btn-success');

        icone.classList.remove('fa-edit');
        icone.classList.add('fa-save');

        // ✅ Aqui **não fecha o modal nem clica no botão**
    }
    else {
        // MODO SALVAR
        inputEscolhido.disabled = true;

        let nomeAntigo = inputEscolhido.dataset.valorAntigo;
        let nomeNovo = inputEscolhido.value;

        arrayCategoriasEstudoPessoal[id].tituloEstudoPessoal = nomeNovo;

        if(confirm(`Deseja alterar a categoria "${nomeAntigo}" para "${nomeNovo}" em todos os estudos cadastrados?`)){
            arrayConjuntoEstudosPessoais.forEach(estudo => {
                if(estudo.categoria === nomeAntigo){
                    estudo.categoria = nomeNovo;
                }
            });
            localStorage.setItem("estudosSalvos", JSON.stringify(arrayConjuntoEstudosPessoais));
        }

        button.classList.remove('btn-success');
        button.classList.add('btn-primary');
        icone.classList.remove('fa-save');
        icone.classList.add('fa-edit');

        localStorage.setItem("estudos", JSON.stringify(arrayCategoriasEstudoPessoal));

        mostraCategoriasSalvas();
        popularSelect('categoriaNovoEstudoPessoal');

        // 🔹 FECHAR MODAL APENAS APÓS SALVAR
        const modalEl = document.getElementById('exibeCategoriasEstudoPessoal');
        const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();

        // 🔹 CLICAR NO BOTÃO DA CATEGORIA EDITADA APÓS FECHAR
        modalEl.addEventListener('hidden.bs.modal', () => {
            const botaoCategoria = document.getElementById(`categoriaSalva_${nomeNovo}`);
            if(botaoCategoria){
                botaoCategoria.click();
            }
        }, { once: true }); // dispara apenas uma vez
    }
}

//Apaga Categoria do Array
function apagarCategoria(id){
    let inputEscolhido = document.getElementById(id);
    const nomeCategoria = inputEscolhido.value.toUpperCase();

    if(confirm(`Deseja realmente apagar a categoria ${nomeCategoria}?`)){

        id = Number(id);

        // remove categoria do array
        arrayCategoriasEstudoPessoal.splice(id, 1);

        // salva categorias
        localStorage.setItem("estudos", JSON.stringify(arrayCategoriasEstudoPessoal));

        // pergunta se quer apagar estudos ligados
        if(confirm(`Deseja também apagar TODOS os estudos da categoria ${nomeCategoria}?`)){

            // remove estudos com essa categoria
            arrayConjuntoEstudosPessoais =
                arrayConjuntoEstudosPessoais.filter(e => e.categoria !== nomeCategoria);

            // salva estudos atualizados
            localStorage.setItem("estudosSalvos", JSON.stringify(arrayConjuntoEstudosPessoais));
            location.reload();
        }
        // atualiza telas
        mostraModalCategoriasEstudos();
        mostraCategoriasSalvas();
        popularSelect('categoriaNovoEstudoPessoal');
        gerarCodigoEstudoPessoal();

    }
}

//Função para Popular qualquer Select
function popularSelect(id){
    var idSelect = document.getElementById(id);

    idSelect.innerHTML = "";

    if(arrayCategoriasEstudoPessoal.length === 0){
        idSelect.innerHTML = `<option value="-">-</option>`;
    } 
    else {
        for(let i = 0; i < arrayCategoriasEstudoPessoal.length; i++){
            idSelect.innerHTML += `
                <option value="${arrayCategoriasEstudoPessoal[i].tituloEstudoPessoal}">
                    ${arrayCategoriasEstudoPessoal[i].tituloEstudoPessoal}
                </option>`;
        }
    }
}

//Função para Popular Select específico de cadastro de estudo pessoal, com opção de manter categoria selecionada ou resetar para padrão
function popularOption(idSelect,idOption, escolha){
    var idSelect = document.getElementById(idSelect);
    var idOption = document.getElementById(idOption);
    var escolha = escolha;

    idSelect.innerHTML = "";
    idOption.classList.add('d-none');

    if(arrayCategoriasEstudoPessoal.length === 0){
        idSelect.innerHTML = `<option value="-">-</option>`;
    } 
    else {
        for(let i = 0; i < arrayCategoriasEstudoPessoal.length; i++){
            idSelect.innerHTML += `
                <option value="${arrayCategoriasEstudoPessoal[i].tituloEstudoPessoal}">
                    ${arrayCategoriasEstudoPessoal[i].tituloEstudoPessoal}
                </option>`;
        }
    }
    idSelect.value = escolha;
}

//Salva nova Categoria no Array e LocalStorage
function salvarNovaCategoria(id){
    const input = document.getElementById(id);
    const valor = input.value.trim();

    if(!valor){
        alert('Nenhuma categoria foi informada.\nInforme o nome da nova Categoria e tente novamente!');
        input.focus();
        return;
    }

    const titulo = valor.toUpperCase();

    // procura índice existente
    const index = arrayCategoriasEstudoPessoal.findIndex(
        c => c.tituloEstudoPessoal === titulo
    );

    const novaCategoria = {
        tituloEstudoPessoal: titulo
    };

    if(index !== -1){
        // substitui existente
        arrayCategoriasEstudoPessoal[index] = novaCategoria;
    } else {
        // adiciona nova
        arrayCategoriasEstudoPessoal.push(novaCategoria);
    }

    arrayCategoriasEstudoPessoal.sort((a,b)=>
        a.tituloEstudoPessoal.localeCompare(b.tituloEstudoPessoal, 'pt-BR', {sensitivity:'base'})
    );

    localStorage.setItem("estudos", JSON.stringify(arrayCategoriasEstudoPessoal));

    input.value = "";

    mostraCategoriasSalvas();
    popularSelect('categoriaNovoEstudoPessoal');

    alert(index !== -1 ? "Categoria atualizada!" : "Categoria salva com sucesso!");
    location.reload();
}

//Função para trocar o ícone do chevron do estudo pessoal quando clicar para expandir ou recolher a descrição
function trocaChevron(id){
    var chevron = document.getElementById(id);

    if(chevron.classList.contains('fa-chevron-down')){
        chevron.classList.remove('fa-chevron-down');
        chevron.classList.add('fa-chevron-up');
    }
    else{
        chevron.classList.remove('fa-chevron-up');
        chevron.classList.add('fa-chevron-down');
    }
}

//Função para apagar estudo pessoal do array e localStorage, atualizar telas e fechar detalhes
function apagarEstudo(id){
    if(confirm('Deseja realmente apagar este estudo?')){

        const indice = Number(id.split('_')[1]);

        // pega o objeto antes de remover
        const estudo = arrayConjuntoEstudosPessoais[indice];
        const categoria = estudo.categoria;

        // remove
        arrayConjuntoEstudosPessoais.splice(indice, 1);

        // salva
        localStorage.setItem("estudosSalvos", JSON.stringify(arrayConjuntoEstudosPessoais));

        var categoriaRemovida = document.getElementById(`categoriaSalva_${categoria}`);

        categoriaRemovida
        
    }
}

//Função para habilitar edição dos campos do estudo pessoal, alterar botões de ação e salvar alterações
function editarEstudo(id){

    const index = Number(id.split("_")[1]);

    const inputData = document.getElementById(`input_dataEstudo_${index}`);
    const inputCategoria = document.getElementById(`input_categoriaEstudo_${index}`);
    const inputTitulo = document.getElementById(`input_tituloEstudo_${index}`);

    const btnEditar = document.getElementById(`btnEditarEstudo_estudo_${index}`);
    const btnSalvar = document.getElementById(`btnSalvarEstudo_estudo_${index}`);

    const quill = editores[`estudo_${index}`];

    const isEdit = inputData.disabled;

    if(isEdit){
        inputData.disabled = false;
        inputCategoria.disabled = false;
        inputTitulo.disabled = false;

        quill.enable(true);

        btnEditar.classList.add("d-none");
        btnSalvar.classList.remove("d-none");

    } else {
        inputData.disabled = true;
        inputCategoria.disabled = true;
        inputTitulo.disabled = true;

        quill.enable(false);

        btnEditar.classList.remove("d-none");
        btnSalvar.classList.add("d-none");
    }
}

//Função para salvar edição do estudo pessoal no array e localStorage, atualizar telas e fechar detalhes
function salvarEdicaoEstudo(id){

    const index = Number(id.split("_")[1]);

    const inputData = document.getElementById(`input_dataEstudo_${index}`);
    const inputCategoria = document.getElementById(`input_categoriaEstudo_${index}`);
    const inputTitulo = document.getElementById(`input_tituloEstudo_${index}`);

    const quill = editores[`estudo_${index}`];

    if(!quill){
        alert("Editor não encontrado");
        return;
    }

    arrayConjuntoEstudosPessoais[index].data = inputData.value;
    arrayConjuntoEstudosPessoais[index].categoria = inputCategoria.value;
    arrayConjuntoEstudosPessoais[index].titulo = inputTitulo.value;
    arrayConjuntoEstudosPessoais[index].descricao = quill.root.innerHTML;

    localStorage.setItem("estudosSalvos", JSON.stringify(arrayConjuntoEstudosPessoais));

    quill.enable(false);

    document.getElementById(`btnEditarEstudo_estudo_${index}`).classList.remove("d-none");
    document.getElementById(`btnSalvarEstudo_estudo_${index}`).classList.add("d-none");

    inputData.disabled = true;
    inputCategoria.disabled = true;
    inputTitulo.disabled = true;

    alert("Estudo atualizado!");
}







