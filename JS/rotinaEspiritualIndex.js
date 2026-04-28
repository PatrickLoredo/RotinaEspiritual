//INICIA AUTOMATICAMENTE
window.onload = function () {
    atualizaRelogio('relogioPagina');

    setInterval(function () {
        atualizaRelogio('relogioPagina');
    }, 1000); // 1 segundo

    mostraCategoriasSalvas();
    popularSelect('categoriaNovoEstudoPessoal')
    gerarCodigoEstudoPessoal();
};

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