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

    console.log(campoDataTextoDiario.value);
    
    for(let i=0;i<arrayCadastrosTextoDiario.length;i++){
        if(campoDataTextoDiario.value === arrayCadastrosTextoDiario[i].data){
            campoMensagemAlertTextoDiario.innerHTML = '';
            campoMensagemAlertTextoDiario.innerHTML = `
                <div class="row">
                    <div class="col">
                        <div type="button" class="alert alert-success uppercase tamanho07 text-center"
                            data-bs-toggle="collapse" data-bs-target="#detalhesTextoDiario">
                            <i class="fa fa-check"></i>
                            <i class="fa fa-eye"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class=""> texto diário considerado para essa data</span>
                        </div>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col">
                        <button class="btn btn-sm btn-primary w-100" data-bs-toggle="modal"
                            data-bs-target="#ModalCadastroTextoDiario">
                            <i class="fa fa-circle-plus"></i>
                        </button>
                    </div>
                </div>
            `

            document.getElementById('detalhesTextoDiario').innerHTML = '';
            document.getElementById('detalhesTextoDiario').innerHTML = `
                <div class="card-header">
                    <div class="row">
                        <div class="col text-center">
                            <label for="" class="label-format fw-bold">texto Diário&nbsp; - &nbsp;${arrayCadastrosTextoDiario[i].data}</label>
                            <cite class="uppercase tamanho07">
                                ${arrayCadastrosTextoDiario[i].textoBiblico}
                            </cite>
                            <span>-</span>
                            <cite class="uppercase tamanho07 text-danger fw-bold">
                                ${arrayCadastrosTextoDiario[i].livroBiblico} ${arrayCadastrosTextoDiario[i].Capitulo}:${arrayCadastrosTextoDiario[i].Versiculo}
                            </cite>
                        </div>
                    </div>
                </div>
                <div class="card-body" id="campoComentarios">
                
                </div>
            `;
            for(let j=0;j<arrayCadastrosTextoDiario[i].comentarios.length;j++){
                document.getElementById('campoComentarios').innerHTML = '';
                document.getElementById('campoComentarios').innerHTML += `
                    <div class="row">
                        <div class="col">
                            <textarea class="form-control uppercase" style="font-size: 0.7rem;" rows="5">
                                ${arrayCadastrosTextoDiario[i].comentarios[j]}
                            </textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col"></div>
                        <div class="col-auto">
                            <button class="btn btn-sm btn-primary mt-3">
                                <i class="fa fa-edit"></i>&nbsp;&nbsp;
                                <span class="uppercase tamanho07">editar</span>
                            </button>

                            <button class="btn btn-sm btn-success mt-3">
                                <i class="fa fa-save"></i>&nbsp;&nbsp;
                                <span class="uppercase tamanho07">editar</span>
                            </button>
                        </div>
                    </div>
                `;
            }
        }
        else{
            campoMensagemAlertTextoDiario.innerHTML = '';
            campoMensagemAlertTextoDiario.innerHTML = `
            <div class="row">
                    <div class="col">
                        <div class="alert alert-danger uppercase tamanho07 text-center">
                            <i class="fa fa-x"></i>
                            <i class="fa fa-eye"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class=""> Nenhum texto diário considerado para esta data</span>
                        </div>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col">
                        <button class="btn btn-sm btn-primary w-100" data-bs-toggle="modal"
                            data-bs-target="#ModalCadastroTextoDiario">
                            <i class="fa fa-circle-plus"></i>
                        </button>
                    </div>
                </div>
            `
        }
    }
}

window.onload = function () {
    alteraData('inputDateTextoDiario','0');
    popularLivrosBiblicos('selectLivroBiblicoTextoDiario');
    recuperarTextoDiario();
    veririficaDataTextoDiario();
};