// Botão iniciar/finalizar treino
const btnTreino = document.getElementById("btnTreino");

// Elemento que mostra o timer
const timerElement = document.getElementById("timer");

// Texto de status do treino
const statusTreino =
document.getElementById("statusTreino");

// Botões dos dias da semana
const botoesDias =
document.querySelectorAll(".btn-dia");

// Título do treino atual
const tituloDia =
document.getElementById("tituloDia");

// Lista de exercícios
const listaTreino =
document.getElementById("listaTreino");

/* MODAL */

// Botão editar treino
const btnEditar =
document.getElementById("btnEditar");

// Botão novo exercício
const btnNovoExercicio =
document.getElementById("btnNovoExercicio");

// Fundo escuro do modal
const modalOverlay =
document.getElementById("modalOverlay");

// Botão fechar modal
const fecharModal =
document.getElementById("fecharModal");

// Botão salvar exercício
const salvarExercicio =
document.getElementById("salvarExercicio");

// Select nome exercício
const nomeExercicio =
document.getElementById("nomeExercicio");

// Select grupo muscular
const grupoMuscular =
document.getElementById("grupoMuscular");

// Input séries
const seriesExercicio =
document.getElementById("seriesExercicio");

// Input peso
const pesoExercicio =
document.getElementById("pesoExercicio");

/* MENU */

// Botão menu
const menuBtn =
document.getElementById("menuBtn");

// Dropdown menu
const dropdownMenu =
document.getElementById("dropdownMenu");

// Evento abrir/fechar menu
menuBtn.addEventListener("click", () => {

    // Alterna classe show
    dropdownMenu.classList.toggle("show");

});

// Fecha menu clicando fora
document.addEventListener("click", (e) => {

    // Verifica se clique não foi no botão ou menu
    if(
        !menuBtn.contains(e.target) &&
        !dropdownMenu.contains(e.target)
    ){
        // Remove menu
        dropdownMenu.classList.remove("show");
    }

});

/* EXERCÍCIOS */

// Exercícios separados por grupo muscular
const exerciciosPorGrupo = {

    "Peito": [
        "Supino Reto",
        "Supino Inclinado",
        "Crucifixo",
        "Crossover"
    ],

    "Braço": [
        "Rosca Direta",
        "Rosca Martelo",
        "Tríceps Pulley",
        "Tríceps Francês"
    ],

    "Ombro": [
        "Desenvolvimento",
        "Elevação Lateral",
        "Elevação Frontal",
        "Arnold Press"
    ],

    "Costas": [
        "Puxada Alta",
        "Remada Curvada",
        "Remada Baixa",
        "Pulldown"
    ],

    "Pernas": [
        "Agachamento",
        "Leg Press",
        "Cadeira Extensora",
        "Stiff"
    ],

    "Abdômen": [
        "Abdominal Reto",
        "Prancha",
        "Abdominal Infra",
        "Elevação de Pernas"
    ]

};

/* TREINOS */

// Lista de treinos por dia
const treinos = {

    "Segunda": [
        {
            nome: "Supino Reto",
            detalhes: "Peito",
            series: "4x12",
            peso: "20kg"
        },
        {
            nome: "Crucifixo",
            detalhes: "Peito",
            series: "3x15",
            peso: "12kg"
        }
    ],

    "Terça": [
        {
            nome: "Puxada Alta",
            detalhes: "Costas",
            series: "4x12",
            peso: "35kg"
        }
    ],

    "Quarta": [
        {
            nome: "Agachamento",
            detalhes: "Pernas",
            series: "5x10",
            peso: "60kg"
        }
    ],

    "Quinta": [
        {
            nome: "Desenvolvimento",
            detalhes: "Ombro",
            series: "4x12",
            peso: "18kg"
        }
    ],

    "Sexta": [
        {
            nome: "Rosca Direta",
            detalhes: "Braço",
            series: "4x10",
            peso: "14kg"
        }
    ],

    "Sábado": [
        {
            nome: "Prancha",
            detalhes: "Abdômen",
            series: "3x1min",
            peso: "-"
        }
    ],

    "Domingo": [
        {
            nome: "Descanso",
            detalhes: "Recuperação",
            series: "-",
            peso: "-"
        }
    ]

};

/* SELECT EXERCÍCIOS */

// Evento ao trocar grupo muscular
grupoMuscular.addEventListener("change", () => {

    // Grupo selecionado
    const grupo = grupoMuscular.value;

    // Limpa select exercícios
    nomeExercicio.innerHTML = "";

    // Caso nenhum grupo seja selecionado
    if(grupo === ""){

        nomeExercicio.innerHTML =
        `<option value="">
        Selecione um grupo muscular
        </option>`;

        return;

    }

    // Percorre exercícios do grupo
    exerciciosPorGrupo[grupo].forEach(exercicio => {

        // Adiciona exercício no select
        nomeExercicio.innerHTML += `
        
            <option value="${exercicio}">
                ${exercicio}
            </option>
        
        `;

    });

});

/* RENDER TREINO */

// Função carregar treino do dia
function carregarTreino(dia){

    // Atualiza título
    tituloDia.innerHTML =
    `Treino de ${dia}`;

    // Limpa lista
    listaTreino.innerHTML = "";

    // Cria topo ações
    const topoAcoes =
    document.createElement("div");

    topoAcoes.className =
    "acoes-exercicio";

    // Botão excluir treino inteiro
    topoAcoes.innerHTML = `

        <button class="btn-excluir-treino"
        onclick="excluirTreino('${dia}')">

            <i class='bx bx-trash'></i>
            Excluir treino

        </button>

    `;

    // Adiciona topo
    listaTreino.appendChild(topoAcoes);

    // Percorre exercícios do dia
    treinos[dia].forEach((exercicio, index) => {

        // Cria div exercício
        const div =
        document.createElement("div");

        div.className = "exercicio";

        // Estrutura HTML exercício
        div.innerHTML = `

            <div>

                <h3>${exercicio.nome}</h3>

                <p>${exercicio.detalhes}</p>

                <p>Séries: ${exercicio.series}</p>

                <p>Peso: ${exercicio.peso}</p>

            </div>

            <div class="acoes-exercicio">

                <button class="btn-excluir"
                onclick="excluirExercicio('${dia}', ${index})">

                    <i class='bx bx-trash'></i>

                </button>

            </div>

        `;

        // Adiciona exercício
        listaTreino.appendChild(div);

    });

}

/* EXCLUIR EXERCÍCIO */

// Remove exercício específico
function excluirExercicio(dia, index){

    // Remove exercício do array
    treinos[dia].splice(index, 1);

    // Atualiza tela
    carregarTreino(dia);

}

/* EXCLUIR TREINO */

// Remove treino inteiro
function excluirTreino(dia){

    // Define array vazio
    treinos[dia] = [];

    // Atualiza tela
    carregarTreino(dia);

}

/* TROCAR DIA */

// Percorre botões dos dias
botoesDias.forEach(botao => {

    // Evento clique
    botao.addEventListener("click", () => {

        // Remove active de todos
        botoesDias.forEach(btn => {

            btn.classList.remove("active");

        });

        // Ativa botão atual
        botao.classList.add("active");

        // Pega dia clicado
        const dia =
        botao.dataset.dia;

        // Carrega treino
        carregarTreino(dia);

        // Carrega tempo salvo
        carregarTempoSalvo(dia);

    });

});

/* TIMER */

// Controle treino ativo
let treinoAtivo = false;

// Total segundos
let segundos = 0;

// Variável intervalo
let intervalo;

// Atualiza timer
function atualizarTimer(){

    // Soma 1 segundo
    segundos++;

    // Atualiza tela
    atualizarDisplay();

}

// Atualiza display timer
function atualizarDisplay(){

    // Calcula horas
    const hrs =
    String(Math.floor(segundos / 3600))
    .padStart(2, "0");

    // Calcula minutos
    const mins =
    String(Math.floor((segundos % 3600) / 60))
    .padStart(2, "0");

    // Calcula segundos
    const secs =
    String(segundos % 60)
    .padStart(2, "0");

    // Atualiza texto timer
    timerElement.textContent =
    `${hrs}:${mins}:${secs}`;

}

/* BOTÃO TREINO */

// Evento iniciar/finalizar treino
btnTreino.addEventListener("click", () => {

    // Dia atual ativo
    const diaAtual =
    document.querySelector(".btn-dia.active")
    .dataset.dia;

    // Caso treino não esteja ativo
    if(!treinoAtivo){

        treinoAtivo = true;

        // Inicia contador
        intervalo =
        setInterval(atualizarTimer, 1000);

        // Atualiza botão
        btnTreino.innerHTML =
        `<i class='bx bx-stop'></i>
        FINALIZAR TREINO`;

        // Adiciona classe CSS
        btnTreino.classList.add("finalizar");

        // Atualiza status
        statusTreino.textContent =
        `Treino em andamento • ${diaAtual}`;

    } else {

        treinoAtivo = false;

        // Para contador
        clearInterval(intervalo);

        // Salva tempo no navegador
        localStorage.setItem(
            `treino-${diaAtual}`,
            segundos
        );

        // Atualiza botão
        btnTreino.innerHTML =
        `<i class='bx bx-play'></i>
        INICIAR TREINO`;

        // Remove classe CSS
        btnTreino.classList.remove("finalizar");

        // Atualiza status
        statusTreino.textContent =
        `Treino finalizado • ${diaAtual}`;

    }

});

/* TEMPO SALVO */

// Carrega treino salvo
function carregarTempoSalvo(dia){

    // Busca tempo no localStorage
    const tempoSalvo =
    localStorage.getItem(`treino-${dia}`);

    // Caso exista
    if(tempoSalvo){

        // Atualiza segundos
        segundos = Number(tempoSalvo);

        // Atualiza display
        atualizarDisplay();

        // Atualiza status
        statusTreino.textContent =
        `Último treino salvo • ${dia}`;

    } else {

        // Zera contador
        segundos = 0;

        // Atualiza display
        atualizarDisplay();

        // Atualiza status
        statusTreino.textContent =
        "Nenhum treino salvo";

    }

}

/* MODAL */

// Abre modal
function abrirModal(){

    modalOverlay.classList.add("show");

}

// Fecha modal
function fecharModalFunc(){

    modalOverlay.classList.remove("show");

}

// Evento abrir modal
btnEditar.addEventListener("click", abrirModal);

btnNovoExercicio.addEventListener("click", abrirModal);

// Evento fechar modal
fecharModal.addEventListener("click", fecharModalFunc);

// Fecha clicando fora
modalOverlay.addEventListener("click", (e) => {

    if(e.target === modalOverlay){

        fecharModalFunc();

    }

});

/* SALVAR EXERCÍCIO */

// Evento salvar exercício
salvarExercicio.addEventListener("click", () => {

    // Nome exercício
    const nome =
    nomeExercicio.value;

    // Grupo muscular
    const grupo =
    grupoMuscular.value;

    // Séries
    const series =
    seriesExercicio.value.trim();

    // Peso
    const peso =
    pesoExercicio.value.trim();

    // Validação campos
    if(
        nome === "" ||
        grupo === "" ||
        series === "" ||
        peso === ""
    ){
        alert("Preencha todos os campos.");
        return;
    }

    // Dia atual
    const diaAtual =
    document.querySelector(".btn-dia.active")
    .dataset.dia;

    // Adiciona exercício
    treinos[diaAtual].push({

        nome,
        detalhes: grupo,
        series,
        peso

    });

    // Atualiza treino
    carregarTreino(diaAtual);

    // Reseta select exercício
    nomeExercicio.innerHTML =
    `<option value="">
    Selecione um grupo muscular
    </option>`;

    // Limpa campos
    grupoMuscular.value = "";
    seriesExercicio.value = "";
    pesoExercicio.value = "";

    // Fecha modal
    fecharModalFunc();

});

/* INICIAR */

// Carrega treino inicial
carregarTreino("Segunda");

// Carrega tempo salvo inicial
carregarTempoSalvo("Segunda");