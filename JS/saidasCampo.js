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