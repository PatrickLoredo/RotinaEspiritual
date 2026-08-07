window.onload = function () {
    alteraData('inputDateTextoDiario','0');
};

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

