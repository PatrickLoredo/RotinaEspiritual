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
    constructor(id, data, diaSemana, assunto, status){
        this.id = id;
        this.data = data;
        this.diaSemana = diaSemana;
        this.assunto = assunto;
        this.status = status
    }
}

//SALVA O AGENDAMENTO DE ADORAÇÃO EM FAMÍLIA NO LOCALSTORAGE
function salvarAdoracaoEmFamilia() {

    let data = dataCadastroAdoracaoFamilia.value;
    let diaSemana = diaSemanaCadastroAdoracaoFamilia.value;
    let assunto = assuntoCadastroAdoracaoFamilia.value;

    if (!data || !diaSemana || !assunto) {
        alert("Preencha todos os campos!");
        return;
    }

    let dataAgendamento = new Date(data + "T00:00:00");

    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let status = dataAgendamento < hoje
        ? "Atrasado"
        : "Agendado";

    // Cria um ID único
    let id = crypto.randomUUID();

    let novaAdoracao = new adoracaoEmFamilia(
        id,
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

    mostraDataAtual('dataAtualAdoracaoEmFamilia');

    consultaAgendamentodAdoracaoFamilia();
}

// CONSULTA OS AGENDAMENTOS DE ADORAÇÃO EM FAMÍLIA E EXIBE NA TELA
function consultaAgendamentodAdoracaoFamilia() {

    var campoMensagem = document.getElementById(
        'exibicaoAgendamentosAdoracaoEmFamilia'
    );

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

        return;
    }

    campoMensagem.innerHTML = '';

    // Cria uma cópia e ordena pela data
    const agendamentosOrdenados = [...agendamentosAdoracaoFamilia]
        .sort(function (a, b) {
            return a.data.localeCompare(b.data);
        });

    agendamentosOrdenados.forEach(function (item) {

        let corCard = item.status.toLowerCase() === 'concluído'
            ? 'alert-success'
            : 'alert-secondary';

        campoMensagem.innerHTML += `
            <div class="alert ${corCard}"
                id="agendamentoAdoracaoFamilia-${item.id}">

                <div class="row text-center mb-3">

                    <div class="col-5 col-sm-4 col-lg-3 absoluto absoluto-${item.status.toLowerCase()}">
                        ${item.status}
                    </div>

                </div>

                <div class="row text-center">

                    <div class="col-5 col-lg-3">

                        <input type="date"
                            id="data-${item.id}"
                            class="form-control text-center uppercase mb-2"
                            style="font-size:0.8rem;"
                            value="${item.data}"
                            onchange="mostraDiaSemana(this.value, 'diaSemana-${item.id}')"
                            disabled>

                    </div>

                    <div class="col-7 col-lg-3">

                        <input type="text"
                            id="diaSemana-${item.id}"
                            class="form-control text-center uppercase mb-2"
                            style="font-size:0.8rem;"
                            value="${item.diaSemana}"
                            disabled>

                    </div>

                    <div class="col d-none"></div>

                    <div class="col-7 col-lg-4 mt-2 mt-lg-0">

                        <div class="input-group">

                            <input type="text"
                                id="status-${item.id}"
                                class="form-control text-center uppercase mb-2"
                                style="font-size:0.8rem;"
                                value="${item.status}"
                                disabled>

                            <button class="btn btn-sm btn-success mb-2"
                                onclick="checarAgendamentoAdoracaoFamilia('concluído', ${JSON.stringify(item.id)})">

                                <i class="fa fa-circle-check"></i>

                            </button>

                            <button class="btn btn-sm btn-primary mb-2"
                                onclick="checarAgendamentoAdoracaoFamilia('agendado', ${JSON.stringify(item.id)})">

                                <i class="fa fa-calendar"></i>

                            </button>

                        </div>

                    </div>

                    <div class="col mt-2 mt-lg-0 d-flex justify-content-center gap-1">

                        <button class="btn btn-sm btn-primary mb-4"
                            onclick="editarAgendamentoAdoracaoFamilia(${JSON.stringify(item.id)})">

                            <i class="fa fa-pen-to-square"></i>

                        </button>

                        <button class="btn btn-sm btn-success mb-4"
                            onclick="confirmarAgendamentoAdoracaoFamilia(${JSON.stringify(item.id)})">

                            <i class="fa fa-save"></i>

                        </button>

                        <button class="btn btn-sm btn-danger mb-4"
                            onclick="excluirAgendamentoAdoracaoFamilia(${JSON.stringify(item.id)})">

                            <i class="fa fa-trash"></i>

                        </button>

                    </div>

                    <div class="col-12">

                        <input type="text"
                            id="assunto-${item.id}"
                            class="form-control text-center uppercase mb-2"
                            style="font-size:0.8rem;"
                            value="${item.assunto}"
                            disabled>
                    </div>
                </div>
            </div>
        `;
    });
}

// ALTERA O STATUS DO AGENDAMENTO DE ADORAÇÃO EM FAMÍLIA
function checarAgendamentoAdoracaoFamilia(status, id) {

    // Procura o agendamento pelo ID
    let agendamento = agendamentosAdoracaoFamilia.find(function (item) {
        return item.id === id;
    });

    if (!agendamento) {
        console.error("Agendamento não encontrado:", id);
        alert("Agendamento não encontrado!");
        return;
    }

    // Altera o status
    agendamento.status = status;

    // Salva a alteração no LocalStorage
    localStorage.setItem(
        "agendamentosAdoracaoFamilia",
        JSON.stringify(agendamentosAdoracaoFamilia)
    );

    if (status.toLowerCase() === "agendado") {

        alert(`
            A Adoração em Família:
            ${agendamento.assunto.toUpperCase()},
            foi alterada para AGENDADA.
        `);

    } else {

        alert(`
            A Adoração em Família:
            ${agendamento.assunto.toUpperCase()},
            foi alterada para CONCLUÍDA.
        `);
    }

    consultaAgendamentodAdoracaoFamilia();
}


// EDITA O AGENDAMENTO DE ADORAÇÃO EM FAMÍLIA
function editarAgendamentoAdoracaoFamilia(id) {

    let campoData = document.getElementById(`data-${id}`);
    let campoAssunto = document.getElementById(`assunto-${id}`);

    if (!campoData || !campoAssunto) {
        console.error("Campos do agendamento não encontrados:", id);
        return;
    }

    campoData.disabled = false;
    campoAssunto.disabled = false;
}


// CONFIRMA A EDIÇÃO DO AGENDAMENTO DE ADORAÇÃO EM FAMÍLIA
function confirmarAgendamentoAdoracaoFamilia(id) {

    let campoData = document.getElementById(`data-${id}`);
    let campoAssunto = document.getElementById(`assunto-${id}`);
    let campoDiaSemana = document.getElementById(`diaSemana-${id}`);

    if (!campoData || !campoAssunto || !campoDiaSemana) {
        console.error("Campos do agendamento não encontrados:", id);
        return;
    }

    if (!campoData.value || !campoAssunto.value) {
        alert("Preencha todos os campos!");
        return;
    }

    // Procura o objeto pelo ID
    let agendamento = agendamentosAdoracaoFamilia.find(function (item) {
        return item.id === id;
    });

    if (!agendamento) {
        console.error("Agendamento não encontrado:", id);
        alert("Agendamento não encontrado!");
        return;
    }

    // Calcula novamente o dia da semana
    let dataObj = new Date(campoData.value + "T00:00:00");

    let novoDiaSemana = diasSemana[dataObj.getDay()];

    campoDiaSemana.value = novoDiaSemana;

    // Atualiza o próprio objeto encontrado
    agendamento.data = campoData.value;
    agendamento.diaSemana = novoDiaSemana;
    agendamento.assunto = campoAssunto.value;

    // Salva no LocalStorage
    localStorage.setItem(
        "agendamentosAdoracaoFamilia",
        JSON.stringify(agendamentosAdoracaoFamilia)
    );

    // Bloqueia novamente os campos
    campoData.disabled = true;
    campoAssunto.disabled = true;

    alert("Agendamento atualizado com sucesso!");

    // Atualiza a tela
    consultaAgendamentodAdoracaoFamilia();
}


// EXCLUI O AGENDAMENTO DE ADORAÇÃO EM FAMÍLIA
function excluirAgendamentoAdoracaoFamilia(id) {

    // Procura o agendamento pelo ID
    let agendamento = agendamentosAdoracaoFamilia.find(function (item) {
        return item.id === id;
    });

    if (!agendamento) {
        console.error("Agendamento não encontrado:", id);
        alert("Agendamento não encontrado!");
        return;
    }

    if (confirm(`
        Tem certeza que deseja excluir o agendamento:

        ${agendamento.assunto}
    `)) {

        // Remove pelo ID, e não pela posição no array
        agendamentosAdoracaoFamilia =
            agendamentosAdoracaoFamilia.filter(function (item) {
                return item.id !== id;
            });

        // Salva no LocalStorage
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

