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
    let novoTexto = new CadastroTextoDiario(
        document.getElementById("inputDateTextoDiario").value,
        document.getElementById("selectLivroBiblicoTextoDiario").value,
        document.getElementById("capituloTextoDiario").value,
        document.getElementById("versiculoTextoDiario").value,
        document.getElementById("textoBiblicoTranscritoTextoDiario").value,
        [
            document.getElementById("comentarioTextoDiario").value
        ]
    );

    arrayCadastrosTextoDiario.push(novoTexto);
    salvarTextoDiario();

    let confirmacao = confirm(
        "Deseja cadastrar um novo comentário para esse mesmo texto diário?"
    );

    if (confirmacao) {
        document.getElementById("comentarioTextoDiario").value = "";
   } 
    else {
        limparFormularioTextoDiario();
        document
        .getElementById("btnCloseModalCadastroTextoDiario")
        .click();
   }
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

window.onload = function () {
    alteraData('inputDateTextoDiario','0');
    popularLivrosBiblicos('selectLivroBiblicoTextoDiario');
    recuperarTextoDiario();
};