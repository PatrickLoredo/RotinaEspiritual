let arrayCadastrosTextoDiario = [];

let livrosBiblicos = [
    "Gênesis",
    "Êxodo",
    "Levítico",
    "Números",
    "Deuteronômio",
    "Josué",
    "Juízes",
    "Rute",
    "1 Samuel",
    "2 Samuel",
    "1 Reis",
    "2 Reis",
    "1 Crônicas",
    "2 Crônicas",
    "Esdras",
    "Neemias",
    "Ester",
    "Jó",
    "Salmos",
    "Provérbios",
    "Eclesiastes",
    "Cânticos",
    "Isaías",
    "Jeremias",
    "Lamentações",
    "Ezequiel",
    "Daniel",
    "Oseias",
    "Joel",
    "Amós",
    "Obadias",
    "Jonas",
    "Miquéias",
    "Naum",
    "Habacuque",
    "Sofonias",
    "Ageu",
    "Zacarias",
    "Malaquias",
    "Mateus",
    "Marcos",
    "Lucas",
    "João",
    "Atos dos Apóstolos",
    "Romanos",
    "1 Coríntios",
    "2 Coríntios",
    "Gálatas",
    "Efésios",
    "Filipenses",
    "Colossenses",
    "1 Tessalonicenses",
    "2 Tessalonicenses",
    "1 Timóteo",
    "2 Timóteo",
    "Tito",
    "Filemom",
    "Hebreus",
    "Tiago",
    "1 Pedro",
    "2 Pedro",
    "1 João",
    "2 João",
    "3 João",
    "Judas",
    "Apocalipse"
];

class CadastroTextoDiario{
    constructor(data,livroBiblico,Capitulo,Versiculo,textoBiblico,comentarios = []){
        this.data = data; //inputDateaTextoDiario
        this.livroBiblico = livroBiblico; //selectLivroBiblicoTextoDiario
        this.Capitulo = Capitulo; //capituloTextoDiario
        this.Versiculo = Versiculo; //versiculoTextoDiario
        this.textoBiblico = textoBiblico; //textoBiblicoTranscritoTextoDiarop
        this.comentarios = comentarios; //comentarioTextoDiario
   }
}
function alteraData(idCampo, escolha) {
    let campoData = document.getElementById(idCampo);
    let campoModal = document.getElementById('dataNovoCadastroDiarioTexto');
    let data;

    if (campoData.value) {
        data = new Date(campoData.value + "T00:00:00");
   } 
    else {
        data = new Date();
   }

    if (escolha === '-1') {
        data.setDate(data.getDate() - 1);
   }
    else if (escolha === '0') {
        data = new Date();
   }
    else if (escolha === '1') {
        data.setDate(data.getDate() + 1);
   }

    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();

    campoData.value = `${ano}-${mes}-${dia}`;
    campoModal.value = `${ano}-${mes}-${dia}`;
}

function salvarTextoDiario() {
    localStorage.setItem(
        "cadastrosTextoDiario",
        JSON.stringify(arrayCadastrosTextoDiario)
    );
}

function recuperarTextoDiario() {
    let dados = localStorage.getItem("cadastrosTextoDiario");
    if (dados) {
        let lista = JSON.parse(dados);
        arrayCadastrosTextoDiario = lista.map(item => 
            new CadastroTextoDiario(
                item.data,
                item.livroBiblico,
                item.Capitulo,
                item.Versiculo,
                item.textoBiblico,
                item.comentarios
            )
        );
    }
}

function cadastrarTextoDiario() {
    let dataTexto = document.getElementById("inputDateTextoDiario").value;
    let comentario = document.getElementById("comentarioTextoDiario").value;

    // Verifica se já existe texto para essa data
    let textoExistente = arrayCadastrosTextoDiario.find(item => 
        item.data === dataTexto
    );

    // Se já existe a data
    if(textoExistente){
        textoExistente.comentarios.push(comentario);
        salvarTextoDiario();
        alert("Novo comentário adicionado ao texto diário!");
        document.getElementById("comentarioTextoDiario").value = '';
        return;
    }

    // Se não existe a data, cria novo texto diário
    let novoTexto = new CadastroTextoDiario(
        dataTexto,
        document.getElementById("selectLivroBiblicoTextoDiario").value,
        document.getElementById("capituloTextoDiario").value,
        document.getElementById("versiculoTextoDiario").value,
        document.getElementById("textoBiblicoTranscritoTextoDiario").value,
        [
            comentario
        ]
    );

    arrayCadastrosTextoDiario.push(novoTexto);
    salvarTextoDiario();
    alert(
        `Texto diário cadastrado com sucesso para ${novoTexto.livroBiblico} ${novoTexto.Capitulo}:${novoTexto.Versiculo}`
    );
    document.getElementById("comentarioTextoDiario").value = '';
}

function limparFormularioTextoDiario(){
    document.getElementById("inputDateTextoDiario").value = '';
    document.getElementById("selectLivroBiblicoTextoDiario").value = '';
    document.getElementById("capituloTextoDiario").value = '';
    document.getElementById("versiculoTextoDiario").value = '';
    document.getElementById("textoBiblicoTranscritoTextoDiario").value = '';
    document.getElementById("comentarioTextoDiario").value = '';
}

function popularLivrosBiblicos(id) {
    let campoPopular = document.getElementById(id);

    for (let i = 0; i < livrosBiblicos.length; i++) {
        let option = document.createElement('option');
        option.value = livrosBiblicos[i];
        option.innerText = livrosBiblicos[i];
        campoPopular.appendChild(option);
    }
}

function verificaDataTextoDiario() {
    const campoMensagemAlertTextoDiario = document.getElementById('mensagemAlertTextoDiario');
    const campoDataTextoDiario = document.getElementById('inputDateTextoDiario');
    const campoExibicaoInfoTextoDiario = document.getElementById('detalhesTextoDiario');
    const dataSelecionada = campoDataTextoDiario.value;

    const cadastroEncontrado = arrayCadastrosTextoDiario.find(
        cadastro => cadastro.data === dataSelecionada
    );

    if (cadastroEncontrado) {
        campoMensagemAlertTextoDiario.innerHTML = `
            <div class="row">
                <div class="col">
                    <div type="button"
                        class="alert alert-success uppercase tamanho07 text-center" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#detalhesTextoDiario">

                        <i class="fa fa-check"></i>
                        <i class="fa fa-eye"></i>

                        <span>clique para ver os comentarios cadastrados para o texto diario</span>
                    </div>
                </div>
            </div>
        `;

        campoExibicaoInfoTextoDiario.innerHTML = `
            <div class="row my-3 py-3 bg-primary text-light w-100 m-auto d-flex align-items-center" style="min-height: 2rem;">
                <div class="col text-center">
                    <div class="row">
                        <div class="col">
                            <span class="uppercase tamanho08 fw-bold">
                                "${cadastroEncontrado.textoBiblico}"
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <span class="uppercase tamanho08 fw-bold bg-danger px-2">
                                ${cadastroEncontrado.livroBiblico}
                                ${cadastroEncontrado.Capitulo}:${cadastroEncontrado.Versiculo}
                            </span>
                        </div>
                    </di>
                </div>
            </div>
        `;

        if (cadastroEncontrado.comentarios && cadastroEncontrado.comentarios.length > 0) {
            cadastroEncontrado.comentarios.forEach((comentario, indice) => {
                campoExibicaoInfoTextoDiario.innerHTML += `
                    <div class="container">
                        <div class="row mb-2">
                            <div class="col">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row align-items-center">
                                            <div class="col">
                                                <span
                                                    class="tamanho07 uppercase"
                                                    id="comentarioTexto-${indice}">
                                                    ${comentario}
                                                </span>
                                            </div>

                                            <div class="col-auto d-flex gap-2">
                                                <button
                                                    type="button"
                                                    id="btnEditarComentario-${indice}"
                                                    class="btn btn-sm btn-primary"
                                                    onclick="editarComentarioTextoDiario(${indice})">

                                                    <i class="fa fa-edit"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    id="btnSalvarComentario-${indice}"
                                                    class="btn btn-sm btn-success d-none"
                                                    onclick="salvarComentarioTextoDiario(${indice})">

                                                    <i class="fa fa-save"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    class="btn btn-sm btn-danger"
                                                    onclick="excluirComentarioTextoDiario(${indice})">

                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
        }
    } else {
        campoMensagemAlertTextoDiario.innerHTML = `
            <div class="row">
                <div class="col">
                    <div type="button"
                        class="alert alert-danger uppercase tamanho07 text-center"
                        data-bs-toggle="collapse"
                        data-bs-target="#detalhesTextoDiario">

                        <i class="fa fa-x"></i>

                        <span>
                            texto diário NÃO FOI CONSIDERADO para essa data
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-2">
                <div class="col">
                    <button
                        class="btn btn-sm btn-primary w-100"
                        data-bs-toggle="modal"
                        data-bs-target="#ModalCadastroTextoDiario">

                        <i class="fa fa-circle-plus"></i>
                    </button>
                </div>
            </div>
        `;

        campoExibicaoInfoTextoDiario.innerHTML = '';
    }
}

function editarComentarioTextoDiario(indice) {
    const campoDataTextoDiario = document.getElementById('inputDateTextoDiario');
    const dataSelecionada = campoDataTextoDiario.value;

    const cadastroEncontrado = arrayCadastrosTextoDiario.find(
        cadastro => cadastro.data === dataSelecionada
    );

    if (!cadastroEncontrado) {
        return;
    }

    const campoComentario = document.getElementById(`comentarioTexto-${indice}`);
    const btnEditar = document.getElementById(`btnEditarComentario-${indice}`);
    const btnSalvar = document.getElementById(`btnSalvarComentario-${indice}`);

    const comentarioAtual = cadastroEncontrado.comentarios[indice].trim();

    campoComentario.outerHTML = `
        <textarea class="form-control uppercase" 
        id="comentarioTexto-${indice}" rows="10" style="font-size: 0.7rem">${comentarioAtual}</textarea>
    `;

    btnEditar.classList.add('d-none');
    btnSalvar.classList.remove('d-none');
}

function salvarComentarioTextoDiario(indice) {
    const campoDataTextoDiario = document.getElementById('inputDateTextoDiario');
    const dataSelecionada = campoDataTextoDiario.value;

    const cadastroEncontrado = arrayCadastrosTextoDiario.find(
        cadastro => cadastro.data === dataSelecionada
    );

    if (!cadastroEncontrado) {
        return;
    }

    const campoComentario = document.getElementById(`comentarioTexto-${indice}`);

    cadastroEncontrado.comentarios[indice] = campoComentario.value.trim();

    salvarTextoDiario();

    verificaDataTextoDiario();

    alert(`O comentário do texto diário da data ${dataSelecionada} foi editado com sucesso.`);
}

function excluirComentarioTextoDiario(indice) {
    const campoDataTextoDiario = document.getElementById('inputDateTextoDiario');
    const dataSelecionada = campoDataTextoDiario.value;

    const cadastroEncontrado = arrayCadastrosTextoDiario.find(
        cadastro => cadastro.data === dataSelecionada
    );

    if (!cadastroEncontrado) {
        return;
    }

    const confirmarExclusao = confirm(
        `Tem certeza que deseja excluir o comentário do texto diário da data ${dataSelecionada}?`
    );

    if (!confirmarExclusao) {
        return;
    }

    cadastroEncontrado.comentarios.splice(indice, 1);

    salvarTextoDiario();

    verificaDataTextoDiario();

    alert(`O comentário do texto diário da data ${dataSelecionada} foi excluído com sucesso.`);
}

window.onload = function () {
    alteraData('inputDateTextoDiario','0');
    popularLivrosBiblicos('selectLivroBiblicoTextoDiario');
    recuperarTextoDiario();
    verificaDataTextoDiario();
};