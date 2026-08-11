let diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
let agendamentosAdoracaoFamilia = JSON.parse(localStorage.getItem("agendamentosAdoracaoFamilia")) || [];

var dataCadastroAdoracaoFamilia = document.getElementById('dataAtualAdoracaoEmFamilia');
var diaSemanaCadastroAdoracaoFamilia = document.getElementById('diaSemanaAdoracaoFamilia');
var assuntoCadastroAdoracaoFamilia = document.getElementById('assuntoAdoracaoFamilia');


//INICIA AUTOMATICAMENTE
window.onload = function () {
    atualizaRelogio('relogioPagina');

    setInterval(function () {
        atualizaRelogio('relogioPagina');
    }, 1000); // 1 segundo

    mostraDataAtual('dataAtualAdoracaoEmFamilia');
    consultaAgendamentodAdoracaoFamilia();
};

//ATUALIZA A FUNCAO DO RELOGIO A CADA SEGUNDO
function atualizaRelogio(idRelogio){
    var dataHoje = new Date();
    var diaHoje = String(dataHoje.getDate()).padStart(2,'0');
    var mesHOje = String(dataHoje.getMonth()+1).padStart(2,'0');
    var anoHOje = dataHoje.getFullYear();

    var horas = String(dataHoje.getHours()).padStart(2,'0');
    var minutos = String(dataHoje.getMinutes()).padStart(2,'0');
    var segundos = String(dataHoje.getSeconds()).padStart(2,'0');

    var dataAtual = (`${diaHoje}/${mesHOje}/${anoHOje}`)
    var horaAtual = (`${horas}:${minutos}:${segundos}`)

    var campoRelogio = document.getElementById(idRelogio);
    campoRelogio.innerHTML = '';
    campoRelogio.innerHTML = `${dataAtual} - ${horaAtual}`;
}

//MOSTRA A DATA ATUAL NO CAMPO DE DATA
function mostraDataAtual(idCampo){
    var campoData = document.getElementById(idCampo);
    var data = new Date();
    var dia = String(data.getDate()).padStart(2,'0');
    var mes = String(data.getMonth()+1).padStart(2,'0');
    var ano = data.getFullYear();

    campoData.value = `${ano}-${mes}-${dia}`;
}

//MOSTRA O DIA DA SEMANA CORRESPONDENTE A DATA SELECIONADA
function mostraDiaSemana(dataSelecionada, idCampo){
    
    if(!dataSelecionada) return;

    var campoDiaSemana = document.getElementById(idCampo);
    var data = new Date(dataSelecionada + "T00:00:00"); 
    // adicionamos T00:00:00 para evitar erro de fuso horário

    var diaSemana = diasSemana[data.getDay()];
    campoDiaSemana.value = diaSemana;
}

//CLASSE PARA CRIAR OS OBJETOS DE ADORAÇÃO EM FAMÍLIA
class adoracaoEmFamilia {
    constructor(data, diaSemana, assunto, status){
        this.data = data;
        this.diaSemana = diaSemana;
        this.assunto = assunto;
        this.status = status
    }
}

//SALVA O AGENDAMENTO DE ADORAÇÃO EM FAMÍLIA NO LOCALSTORAGE
function salvarAdoracaoEmFamilia(){
    let data = dataCadastroAdoracaoFamilia.value;
    let diaSemana = diaSemanaCadastroAdoracaoFamilia.value;
    let assunto = assuntoCadastroAdoracaoFamilia.value.trim();

    if(!data || !diaSemana || !assunto){
        alert("Preencha todos os campos!");
        return;
    }

    // converte a data do input para objeto Date
    let dataAgendamento = new Date(data + "T00:00:00"); 
    let hoje = new Date();
    hoje.setHours(0,0,0,0); // zera horas para comparar só a data

    // define status automaticamente
    let status = dataAgendamento < hoje ? "Atrasado" : "Agendado";

    let novaAdoracao = new adoracaoEmFamilia(
        data,
        diaSemana,
        assunto,
        status
    );

    agendamentosAdoracaoFamilia.push(novaAdoracao);

    localStorage.setItem(
        "agendamentosAdoracaoFamilia",
        JSON.stringify(agendamentosAdoracaoFamilia)
    );

    alert("Agendamento salvo com sucesso!");

    assuntoCadastroAdoracaoFamilia.value = "";
    dataCadastroAdoracaoFamilia.value = "";
    diaSemanaCadastroAdoracaoFamilia.value = "";

    mostraDataAtual('dataAtualAdoracaoEmFamilia');
    consultaAgendamentodAdoracaoFamilia();
}

// CONSULTA OS AGENDAMENTOS DE ADORAÇÃO EM FAMÍLIA E EXIBE NA TELA
// CONSULTA OS AGENDAMENTOS DE ADORAÇÃO EM FAMÍLIA E EXIBE NA TELA
function consultaAgendamentodAdoracaoFamilia() {
    var campoMensagem = document.getElementById('exibicaoAgendamentosAdoracaoEmFamilia');

    if (agendamentosAdoracaoFamilia.length === 0) {

        campoMensagem.innerHTML = `
            <div class="alert alert-danger">
                <div class="row d-flex justify-content-center">
                    <div class="col-1 text-center">
                        <i class="fa fa-calendar-xmark fa-fade"></i>
                    </div>

                    <div class="col-10 text-start">
                        <span class="uppercase tamanho08">
                            Nenhuma Adoração em Família em aberto
                        </span>
                    </div>
                </div>
            </div>
        `;

    } else {
        campoMensagem.innerHTML = '';
        agendamentosAdoracaoFamilia.forEach(function (item, index) {
            // Define a cor do card conforme o status
            let corCard = item.status.toLowerCase() === 'concluído'
                ? 'alert-success'
                : 'alert-secondary';

            campoMensagem.innerHTML += `
                <div class="alert ${corCard}" id="agendamentoAdoracaoFamilia-${index}">

                    <div class="row text-center mb-3">
                        <div class="col-12 col-sm-4 col-lg-3 absoluto absoluto-${item.status.toLowerCase()}">
                            ${item.status}
                        </div>
                    </div>

                    <div class="row text-center">
                        <div class="col-5 col-lg-3">
                            <input type="date"
                                id="data-${index}"
                                class="form-control text-center uppercase mb-2"
                                style="font-size:0.7rem;"
                                value="${item.data}"
                                onchange="mostraDiaSemana(this.value, 'diaSemana-${index}')"
                                disabled>
                        </div>

                        <div class="col-7 col-lg-3">
                            <input type="text"
                                id="diaSemana-${index}"
                                class="form-control text-center uppercase mb-2"
                                style="font-size:0.7rem;"
                                value="${item.diaSemana}"
                                disabled>
                                
                        </div>

                        <div class="col d-none"></div>

                        <div class="col-12 col-lg-3 mt-2 mt-lg-0">
                            <div class="input-group">
                                <input type="text"
                                    id="status-${index}"
                                    class="form-control text-center uppercase mb-2"
                                    style="font-size:0.7rem;"
                                    value="${item.status}"
                                    disabled>

                                <button class="btn btn-sm btn-success mb-2"
                                    onclick="checarAgendamentoAdoracaoFamilia('concluído', ${index})">
                                    <i class="fa fa-circle-check"></i>
                                </button>

                                <button class="btn btn-sm btn-primary mb-2"
                                    onclick="checarAgendamentoAdoracaoFamilia('agendado', ${index})">
                                    <i class="fa fa-calendar"></i>
                                </button>
                            </div>
                        </div>

                        <div class="col-12 mt-2 mt-lg-0 d-flex justify-content-center gap-1">
                            <div class="input-group">
                                <button class="btn btn-sm btn-primary mb-4 w-25"
                                    onclick="editarAgendamentoAdoracaoFamilia(${index})">
                                    <i class="fa fa-pen-to-square"></i>
                                </button>

                                <button class="btn btn-sm btn-success mb-4 w-25"
                                    onclick="confirmarAgendamentoAdoracaoFamilia(${index})">
                                    <i class="fa fa-save"></i>
                                </button>

                                <button class="btn btn-sm btn-danger mb-4 w-25"
                                    onclick="excluirAgendamentoAdoracaoFamilia(${index})">
                                    <i class="fa fa-trash"></i>
                                </button>

                                <button class="btn btn-sm btn-dark mb-4 w-25"
                                    onclick="compartilharWhatsApp(${index})">
                                    <i class="fa fa-share"></i>
                                </button>
                            </div>
                        </div>

                        <div class="col-12">
                            <textarea
                                id="assunto-${index}"
                                class="form-control uppercase mb-2"
                                style="font-size:0.7rem;"
                                rows="7"
                                disabled>${(item.assunto || '').trim()}</textarea>
                        </div>

                    </div>
                </div>
            `;
        });
    }
}


function compartilharWhatsApp(index) {

    const dataAdoracao = document.getElementById(`data-${index}`).value;
    const assuntoAdoracao = document.getElementById(`assunto-${index}`).value;

    let dataFormatada = '';

    if (dataAdoracao) {
        const [ano, mes, dia] = dataAdoracao.split('-');
        dataFormatada = `${dia}/${mes}/${ano}`;
    }

    const mensagem =
        "Olá, tudo bem ? Gostaria de convidar você para a *Adoração em Família*. \n\n" +
        "*Data:* " + dataFormatada + "\n" +
        "*Assunto:* " + assuntoAdoracao + "\n\n" +
        "Será um momento muito especial! \n" +
        "Esperamos você! ";

    const url = "https://wa.me/?text=" + encodeURIComponent(mensagem);

    window.open(url, "_blank");
}




function checarAgendamentoAdoracaoFamilia(status, index) {
    let agendamento = agendamentosAdoracaoFamilia[index];
    agendamento.status = status;

    if (status === "agendado") {
        alert(`A Adoração em Família:
        ${agendamento.assunto.toUpperCase()},
        foi alterada para AGENDADA.`);
    } else {
        alert(`A Adoração em Família:
        ${agendamento.assunto.toUpperCase()},
        foi alterada para CONCLUÍDA.`);
    }

    consultaAgendamentodAdoracaoFamilia();
    console.log(agendamentosAdoracaoFamilia)
}  

//EDITA O AGENDAMENTO DE ADORAÇÃO EM FAMÍLIA
function editarAgendamentoAdoracaoFamilia(index){
    let campoData = document.getElementById(`data-${index}`);
    let campoAssunto = document.getElementById(`assunto-${index}`);

    campoData.disabled = false;
    campoAssunto.disabled = false;

    if(campoData.disabled){

        campoData.disabled = false;
        campoAssunto.disabled = false;
        campoStatus.disabled = false;
    }
}

//CONFIRMA A EDIÇÃO DO AGENDAMENTO DE ADORAÇÃO EM FAMÍLIA
function confirmarAgendamentoAdoracaoFamilia(index){

    let campoData = document.getElementById(`data-${index}`);
    let campoAssunto = document.getElementById(`assunto-${index}`);
    let campoDiaSemana = document.getElementById(`diaSemana-${index}`);

    if(!campoData.value || !campoAssunto.value){
        alert("Preencha todos os campos!");
        return;
    }

    let dataObj = new Date(campoData.value + "T00:00:00");
    let novoDiaSemana = diasSemana[dataObj.getDay()];
    campoDiaSemana.value = novoDiaSemana;

    agendamentosAdoracaoFamilia[index] = {
        ...agendamentosAdoracaoFamilia[index],
        data: campoData.value,
        diaSemana: novoDiaSemana,
        assunto: campoAssunto.value,
        status: agendamentosAdoracaoFamilia[index].status
    };

    localStorage.setItem(
        "agendamentosAdoracaoFamilia",
        JSON.stringify(agendamentosAdoracaoFamilia)
    );

    campoData.disabled = true;
    campoAssunto.disabled = true;

    alert("Agendamento atualizado com sucesso!");
    consultaAgendamentodAdoracaoFamilia();
}

function excluirAgendamentoAdoracaoFamilia(index){
    if(confirm("Tem certeza que deseja excluir este agendamento?")){
        agendamentosAdoracaoFamilia.splice(index, 1);
        localStorage.setItem(
            "agendamentosAdoracaoFamilia",
            JSON.stringify(agendamentosAdoracaoFamilia)
        );
        alert("Agendamento excluído com sucesso!");
        consultaAgendamentodAdoracaoFamilia();
    } else {
        alert("Ação cancelada!");
    }
}

