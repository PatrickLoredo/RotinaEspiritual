let arraySaidasCampo = JSON.parse(localStorage.getItem("saidaCampo")) || [];

class SaidaCampo{
    constructor(id,dataCadastro,dataAtualizacao,anotacao,status){
        this.id = id;
        this.dataCadastro = dataCadastro;
        this.dataAtualizacao = dataAtualizacao;
        this.anotacao = anotacao;
        this.status = status;
    }
}

window.onload = function () {
    atualizaRelogio('relogioPagina');

    setInterval(function () {
        atualizaRelogio('relogioPagina');
    }, 1000); // 1 segundo

    popularLivrosBiblicos('livrosBiblicosSaidaCampo')
};

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

function popularLivrosBiblicos(id) {
    let campoPopular = document.getElementById(id);

    for (let i = 0; i < livrosBiblicos.length; i++) {
        let option = document.createElement('option');
        option.value = livrosBiblicos[i];
        option.innerText = livrosBiblicos[i];
        campoPopular.appendChild(option);
    }
}