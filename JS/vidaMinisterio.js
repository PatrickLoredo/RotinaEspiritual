window.onload = function () {
    document.getElementById('btnVidaCrista').click();
    populaLivrosBiblicos();
}

//ALTERNA O ICONE DE CHEVRON QUANDO CLICADO EM COLLAPSE [OK]
function mudaChevron(idChevron) {
    const chevron = document.getElementById(idChevron);

    if (chevron.classList.contains('fa-chevron-down')) {
        chevron.classList.remove('fa-chevron-down');
        chevron.classList.add('fa-chevron-up');
    } else {
        chevron.classList.remove('fa-chevron-up');
        chevron.classList.add('fa-chevron-down');
    }
}

//CRIA TEXT AREA PARA CADASTRAR ASSUNTOS NO DISCURSO INICIAL - JOIAS ESPIRITUAIS [OK]
function exibeQtdTextArea(qtd, localExibe) {
    const localExibicao = document.getElementById(localExibe);

    // Limpa os textareas existentes
    localExibicao.innerHTML = "";

    // Se selecionou "-", não cria nada
    if (qtd === "-") {
        return;
    }

    qtd = parseInt(qtd);

    for (let i = 0; i < qtd; i++) {

        // ===== COLUNA 1 - Matéria do Discurso Inicial =====
        const colMateriaDiscursoInicial = document.createElement("div");
        colMateriaDiscursoInicial.classList.add("col-12", 'mt-3', "mb-2");

        const grupoMateriaDiscursoInicial = document.createElement("div");
        grupoMateriaDiscursoInicial.classList.add("input-group");

        const spanMateriaDiscursoInicial = document.createElement("span");
        spanMateriaDiscursoInicial.classList.add("input-group-text", "bg-danger", "text-white");

        const iconMateriaDiscursoInicial = document.createElement("i");
        iconMateriaDiscursoInicial.classList.add("fa-solid", "fa-newspaper");

        spanMateriaDiscursoInicial.appendChild(iconMateriaDiscursoInicial);

        const textareaMateriaDiscursoInicial = document.createElement("textarea");
        textareaMateriaDiscursoInicial.classList.add("form-control", "uppercase");
        textareaMateriaDiscursoInicial.rows = 3;
        textareaMateriaDiscursoInicial.style.fontSize = '0.8rem'
        textareaMateriaDiscursoInicial.placeholder = `Matéria do discurso inicial ${i + 1}`;
        textareaMateriaDiscursoInicial.id = `MateriaDiscursoInicial_${i}`;

        grupoMateriaDiscursoInicial.append(
            spanMateriaDiscursoInicial,
            textareaMateriaDiscursoInicial
        );

        colMateriaDiscursoInicial.appendChild(grupoMateriaDiscursoInicial);

        // ===== COLUNA 2 - Anotações do Discurso Inicial =====
        const colAnotacoesDiscursoInicial = document.createElement("div");
        colAnotacoesDiscursoInicial.classList.add("col-12", "mb-3");

        const grupoAnotacoesDiscursoInicial = document.createElement("div");
        grupoAnotacoesDiscursoInicial.classList.add("input-group");

        const spanAnotacoesDiscursoInicial = document.createElement("span");
        spanAnotacoesDiscursoInicial.classList.add("input-group-text", "bg-primary", "text-white");

        const iconAnotacoesDiscursoInicial = document.createElement("i");
        iconAnotacoesDiscursoInicial.classList.add("fa-solid", "fa-message");

        spanAnotacoesDiscursoInicial.appendChild(iconAnotacoesDiscursoInicial);

        const textareaAnotacoesDiscursoInicial = document.createElement("textarea");
        textareaAnotacoesDiscursoInicial.classList.add("form-control", "uppercase");
        textareaAnotacoesDiscursoInicial.rows = 3;
        textareaAnotacoesDiscursoInicial.style.fontSize = '0.8rem'
        textareaAnotacoesDiscursoInicial.placeholder = `Anotações do discurso inicial ${i + 1}`;
        textareaAnotacoesDiscursoInicial.id = `AnotacoesDiscursoInicial_${i}`;

        grupoAnotacoesDiscursoInicial.append(
            spanAnotacoesDiscursoInicial,
            textareaAnotacoesDiscursoInicial
        );

        colAnotacoesDiscursoInicial.appendChild(grupoAnotacoesDiscursoInicial);

        // Adiciona as duas colunas
        localExibicao.append(
            colMateriaDiscursoInicial,
            colAnotacoesDiscursoInicial
        );
    }
}

function exibeTextAreaJoiaEspiritual(id) {

}

// MOSTRA O TEXTAREA DE ACORDO COM TIPO DE CHECKBOX QUE FOI SELECIONADO - FAÇA SEU MELHOR NO MINISTERIO [OK]
function mostraTextAreaFacaMelhorMinisterio(checkbox, id) {
    const area = document.getElementById(id);
    if (checkbox.checked) {
        area.classList.remove("d-none");
        area.classList.add("d-block");
    } else {
        area.classList.remove("d-block");
        area.classList.add("d-none");
    }
}

function adicionarParteVidaCrista() {

}

function populaLivrosBiblicos() {
    const campoLivroInicial = document.getElementById("livroInicialVidaMinisterio");
    const campoLivroFinal = document.getElementById("livroFinalVidaMinisterio");
    const campoCapituloLivroInicial = document.getElementById("CapitulolivroInicialVidaMinisterio");
    const campoCapituloLivroFinal = document.getElementById("livroFinalVidaMinisterio");

    console.log('teste')
    escriturasHebraicas.forEach(livro => {

        let optionInicial = document.createElement("option");
        optionInicial.classList.add('uppercase','text-center')
        optionInicial.value = livro.nome;
        optionInicial.textContent = livro.nome;
        campoLivroInicial.appendChild(optionInicial);

        let optionFinal = document.createElement("option");
        optionFinal.classList.add('uppercase','text-center')
        optionFinal.value = livro.nome;
        optionFinal.textContent = livro.nome;
        campoLivroFinal.appendChild(optionFinal);

    });
    escriturasGregas.forEach(livro => {
        let optionInicial = document.createElement("option");
        optionInicial.value = livro.nome;
        optionInicial.textContent = livro.nome;
        campoLivroInicial.appendChild(optionInicial);

        let optionFinal = document.createElement("option");
        optionFinal.value = livro.nome;
        optionFinal.textContent = livro.nome;
        campoLivroFinal.appendChild(optionFinal);
    });
}

function defineLivroBiblicoCapitulo() {
    const campoLivroInicial = document.getElementById("livroInicialVidaMinisterio");
    const campoLivroFinal = document.getElementById("livroFinalVidaMinisterio");

    const campoCapituloLivroInicial = document.getElementById("capituloInicialVidaMinisterio");
    const campoCapituloLivroFinal = document.getElementById("capituloFinalVidaMinisterio");

    campoCapituloLivroInicial.innerHTML = "";

    let escriturasGregasIndice = escriturasGregas.findIndex(livro => livro.nome === campoLivroInicial.value);
    let escriturasHebraicasIndice = escriturasHebraicas.findIndex(livro => livro.nome === campoLivroInicial.value);

    if (escriturasHebraicasIndice >= 0) {
        const qtdCapitulos = escriturasHebraicas[escriturasHebraicasIndice].capitulos;

        for (let i = 1; i <= qtdCapitulos; i++) {
            let optionInicial = document.createElement("option");
            optionInicial.classList.add('uppercase','text-center')
            optionInicial.value = i;
            optionInicial.textContent = i;

            let optionFinal = document.createElement("option");
            optionFinal.classList.add('uppercase','text-center')
            optionFinal.value = i;
            optionFinal.textContent = i;

            campoCapituloLivroInicial.appendChild(optionInicial);
            campoCapituloLivroFinal.appendChild(optionFinal);
            campoLivroFinal.value = campoLivroInicial.value;
        }
            
    } else if (escriturasGregasIndice >= 0) {
        const qtdCapitulos = escriturasGregas[escriturasGregasIndice].capitulos;

        for (let i = 1; i <= qtdCapitulos; i++) {
            let optionInicial = document.createElement("option");
            optionInicial.value = i;
            optionInicial.textContent = i;

            let optionFinal = document.createElement("option");
            optionFinal.value = i;
            optionFinal.textContent = i;

            campoCapituloLivroInicial.appendChild(optionInicial);
            campoCapituloLivroFinal.appendChild(optionFinal);
        }
    }

    incrementaCapitulo('capituloInicialVidaMinisterio', 'capituloFinalVidaMinisterio');
}
function incrementaCapitulo(idInicial, idFinal) {
    const campoCapituloLivroInicial = document.getElementById(idInicial);
    const campoCapituloLivroFinal = document.getElementById(idFinal);

    campoCapituloLivroFinal.value = Number(campoCapituloLivroInicial.value) + 2;

    console.log(campoCapituloLivroFinal.value);
}