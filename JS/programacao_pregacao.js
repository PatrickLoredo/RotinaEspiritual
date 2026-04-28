window.onload = function () {
    atualizaRelogio('relogioPagina');
    exibeMesAtual('exibir','campoMesEscolhido','campoAnoEscolhido');
    exibeCalendario();

    setInterval(function () {
        atualizaRelogio('relogioPagina');
    }, 1000); // 1 segundo
};

// ATUALIZA A FUNÇÃO DO RELÓGIO A CADA SEGUNDO
function atualizaRelogio(idRelogio) {
    var dataHoje = new Date();

    // Dia, mês e ano
    var diaHoje = String(dataHoje.getDate()).padStart(2, '0');
    var mesHoje = String(dataHoje.getMonth() + 1).padStart(2, '0'); // mês começa em 0
    var anoHoje = dataHoje.getFullYear();

    // Horas, minutos e segundos
    var horas = String(dataHoje.getHours()).padStart(2, '0');
    var minutos = String(dataHoje.getMinutes()).padStart(2, '0');
    var segundos = String(dataHoje.getSeconds()).padStart(2, '0');

    var dataAtual = `${diaHoje}/${mesHoje}/${anoHoje}`;
    var horaAtual = `${horas}:${minutos}:${segundos}`;

    var campoRelogio = document.getElementById(idRelogio);
    campoRelogio.innerHTML = `${dataAtual} - ${horaAtual}`;
}

let arrayDiasSemana = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sábado'
]


let arrayCadastrosProgramacaoPregacao = []


//Muda cor do Alert conforme tipo de Atividade de Pregação
function identificaTipoAtividadePregacao(atividadeEscolhida, idAlert) {
    const el = document.getElementById(idAlert);

    // remove todas as classes primeiro
    el.classList.remove(
        'alert-primary',
        'alert-danger',
        'alert-success',
        'alert-warning',
        'alert-info',
        'alert-secondary'
    );

    // adiciona a correta
    switch (atividadeEscolhida) {
        case 'MinisterioCampo':
            el.classList.add('alert-primary');
            break;

        case 'Revisitas':
            el.classList.add('alert-danger');
            break;

        case 'Estudos':
            el.classList.add('alert-success');
            break;

        case 'Cartas':
            el.classList.add('alert-warning');
            break;

        case 'Carrinho':
            el.classList.add('alert-info');
            break;

        default:
            el.classList.add('alert-secondary');
    }
}

//calcula o valor das horas programadas
function calcularTotalHorasAtividade(idInicio, idFinal, idTotal) {
    var campoInicio = document.getElementById(idInicio);
    var campoFinal = document.getElementById(idFinal);
    var campoTotal = document.getElementById(idTotal);

    // Separar horas e minutos e converter para minutos
    var [hInicio, mInicio] = campoInicio.value.split(':').map(Number);
    var [hFinal, mFinal] = campoFinal.value.split(':').map(Number);

    var totalMinutos = (hFinal * 60 + mFinal) - (hInicio * 60 + mInicio);

    // Se for negativo, assumimos que passou da meia-noite
    if (totalMinutos < 0) totalMinutos += 24 * 60;

    var horas = Math.floor(totalMinutos / 60);
    var minutos = totalMinutos % 60;

    // Atualizar o campo total com formato HH:MM
    campoTotal.value = `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}`;
}


// =======================
// 🔹 MESES
// =======================
let arrayMeses = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
];

var mesAtualIndex = new Date().getMonth();
var anoAtualIndex = new Date().getFullYear();

// =======================
// 🔹 MAPA DIAS SEMANA
// =======================
const mapaSemana = {
    'Domingo': 0,
    'Segunda-Feira': 1,
    'Terça-Feira': 2,
    'Quarta-Feira': 3,
    'Quinta-Feira': 4,
    'Sexta-Feira': 5,
    'Sábado': 6
};

var diaSelecionadoSemana = null;

// =======================
// 🔹 ATUALIZAR DIA SEMANA
// =======================
function atualizarDiaSemana(){
    var select = document.getElementById('diaSemanaSelect');
    diaSelecionadoSemana = mapaSemana[select.value];
    exibeCalendario();
}

// =======================
// 🔹 TROCAR MÊS
// =======================
function exibeMesAtual(tipo, idCampoMes, idCampoAno) {
    var campoMes = document.getElementById(idCampoMes);
    var campoAno = document.getElementById(idCampoAno);

    if (tipo === 'exibir') {
        var hoje = new Date();
        mesAtualIndex = hoje.getMonth();
        anoAtualIndex = hoje.getFullYear();
    }
    else if (tipo === 'voltar') {
        mesAtualIndex--;
        if (mesAtualIndex < 0) {
            mesAtualIndex = 11;
            anoAtualIndex--;
        }
    }
    else if (tipo === 'adiantar') {
        mesAtualIndex++;
        if (mesAtualIndex > 11) {
            mesAtualIndex = 0;
            anoAtualIndex++;
        }
    }

    campoMes.innerHTML = arrayMeses[mesAtualIndex];
    campoAno.innerHTML = anoAtualIndex;

    // 🔥 Atualiza calendário automaticamente
    exibeCalendario();
}

// =======================
// 🔹 CALENDÁRIO
// =======================
function exibeCalendario(){
    var campoExibeCalendario = document.getElementById('exibeCalendario');

    var primeiroDiaSemana = new Date(anoAtualIndex, mesAtualIndex, 1).getDay();
    var ultimoDia = new Date(anoAtualIndex, mesAtualIndex + 1, 0).getDate();

    campoExibeCalendario.innerHTML = "";

    let html = '';

    const diasSemana = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

    // Cabeçalho
    html += '<div class="row text-center fw-bold">';
    diasSemana.forEach(dia => {
        html += `<div class="col border bg-light">
        ${dia}</div>`;
    });
    html += '</div>';

    html += '<div class="row text-center">';

    // Espaços vazios
    for (let i = 0; i < primeiroDiaSemana; i++) {
        html += `<div class="col border calendario-dia bg-white"></div>`;
    }

    // Dias do mês
    for (let dia = 1; dia <= ultimoDia; dia++) {

        let diaSemanaAtual = new Date(anoAtualIndex, mesAtualIndex, dia).getDay();

        let classeExtra = '';

        if (diaSemanaAtual === diaSelecionadoSemana) {
            classeExtra = 'bg-success text-white';
        }

        html += `<div class="col btn border calendario-dia ${classeExtra}">
                    <span class="diaAmostra bg-secondary text-white rounded-pill px-2">${dia}</span>
                 </div>`;

        if ((dia + primeiroDiaSemana) % 7 === 0) {
            html += '</div><div class="row text-center">';
        }
    }

    // Completar final
    let total = primeiroDiaSemana + ultimoDia;
    let resto = total % 7;

    if (resto !== 0) {
        for (let i = resto; i < 7; i++) {
            html += `<div class="col border calendario-dia bg-white"></div>`;
        }
    }

    html += '</div>';

    campoExibeCalendario.innerHTML = html;
}
