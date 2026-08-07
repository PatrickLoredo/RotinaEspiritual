console.log("JS carregado");

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

function veririficaDataTextoDiario(){

    const campoMensagemAlertTextoDiario = document.getElementById('mensagemAlertTextoDiario');
    const campoDataTextoDiario = document.getElementById('inputDateTextoDiario');

    console.log("Data pesquisada:", campoDataTextoDiario.value);
    console.log("Cadastros:", arrayCadastrosTextoDiario);


    let textoEncontrado = arrayCadastrosTextoDiario.find(item => 
        item.data === campoDataTextoDiario.value
    );


    if(textoEncontrado){

        campoMensagemAlertTextoDiario.innerHTML = `
            <div class="row">
                <div class="col">
                    <div class="alert alert-success uppercase tamanho07 text-center">
                        <i class="fa fa-check"></i>
                        Texto diário considerado para essa data
                    </div>
                <div class="col">
            </div>
            <div class="row">
                <div class="col">
                    <button class="btn btn-sm btn-primary w-100">
                        <i class="fa fa-circle-plus">
                    </button>
                <div class="col">
            </div>
        `;


        document.getElementById('detalhesTextoDiario').innerHTML = `
            <div class="card-header text-center">
                <label class="fw-bold">
                    Texto Diário - ${textoEncontrado.data}
                </label>

                <br>

                <cite>
                    ${textoEncontrado.textoBiblico}
                </cite>

                <br>

                <cite class="text-danger fw-bold">
                    ${textoEncontrado.livroBiblico}
                    ${textoEncontrado.Capitulo}:${textoEncontrado.Versiculo}
                </cite>
            </div>

            <div class="card-body" id="campoComentarios"></div>
        `;


        let campoComentarios = document.getElementById('campoComentarios');

        campoComentarios.innerHTML = "";

        textoEncontrado.comentarios.forEach(comentario => {

            campoComentarios.innerHTML += `
                <textarea class="form-control mb-2">
                    ${comentario}
                </textarea>
            `;

        });


    } else {


        campoMensagemAlertTextoDiario.innerHTML = `
            <div class="alert alert-danger uppercase tamanho07 text-center">
                <i class="fa fa-x"></i>
                Nenhum texto diário considerado para esta data
            </div>
        `;

    }
}


window.onload = function () {
    alteraData('inputDateTextoDiario','0');
    popularLivrosBiblicos('selectLivroBiblicoTextoDiario');
    recuperarTextoDiario();
    veririficaDataTextoDiario();
};