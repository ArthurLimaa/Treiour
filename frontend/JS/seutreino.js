const btnTreino = document.getElementById("btnTreino");

const timerElement = document.getElementById("timer");

const statusTreino =
document.getElementById("statusTreino");

const botoesDias =
document.querySelectorAll(".btn-dia");

const tituloDia =
document.getElementById("tituloDia");

const listaTreino =
document.getElementById("listaTreino");

/* MODAL */

const btnEditar =
document.getElementById("btnEditar");

const btnNovoExercicio =
document.getElementById("btnNovoExercicio");

const modalOverlay =
document.getElementById("modalOverlay");

const fecharModal =
document.getElementById("fecharModal");

const salvarExercicio =
document.getElementById("salvarExercicio");

const nomeExercicio =
document.getElementById("nomeExercicio");

const detalhesExercicio =
document.getElementById("detalhesExercicio");

const seriesExercicio =
document.getElementById("seriesExercicio");

/* MENU */

const menuBtn =
document.getElementById("menuBtn");

const dropdownMenu =
document.getElementById("dropdownMenu");

menuBtn.addEventListener("click", () => {

    dropdownMenu.classList.toggle("show");

});

document.addEventListener("click", (e) => {

    if(
        !menuBtn.contains(e.target) &&
        !dropdownMenu.contains(e.target)
    ){
        dropdownMenu.classList.remove("show");
    }

});

/* TREINOS */

const treinos = {

    "Segunda": [
        {
            nome: "Supino Reto",
            detalhes: "Peito",
            series: "4x12"
        },
        {
            nome: "Crucifixo",
            detalhes: "Peito",
            series: "3x15"
        },
        {
            nome: "Tríceps Pulley",
            detalhes: "Tríceps",
            series: "4x10"
        }
    ],

    "Terça": [
        {
            nome: "Puxada Alta",
            detalhes: "Costas",
            series: "4x12"
        },
        {
            nome: "Remada Curvada",
            detalhes: "Costas",
            series: "4x10"
        }
    ],

    "Quarta": [
        {
            nome: "Agachamento",
            detalhes: "Pernas",
            series: "5x10"
        }
    ],

    "Quinta": [
        {
            nome: "Desenvolvimento",
            detalhes: "Ombro",
            series: "4x12"
        }
    ],

    "Sexta": [
        {
            nome: "Treino Funcional",
            detalhes: "Cardio",
            series: "40min"
        }
    ],

    "Sábado": [
        {
            nome: "Corrida",
            detalhes: "Cardio",
            series: "5km"
        }
    ],

    "Domingo": [
        {
            nome: "Descanso",
            detalhes: "Recuperação",
            series: "-"
        }
    ]

};

/* RENDER TREINO */

function carregarTreino(dia){

    tituloDia.innerHTML =
    `Treino de ${dia}`;

    listaTreino.innerHTML = "";

    treinos[dia].forEach(exercicio => {

        const div =
        document.createElement("div");

        div.className = "exercicio";

        div.innerHTML = `

            <div>

                <h3>${exercicio.nome}</h3>

                <p>${exercicio.detalhes}</p>

            </div>

            <span class="series">
                ${exercicio.series}
            </span>

        `;

        listaTreino.appendChild(div);

    });

}

/* TROCAR DIA */

botoesDias.forEach(botao => {

    botao.addEventListener("click", () => {

        botoesDias.forEach(btn => {

            btn.classList.remove("active");

        });

        botao.classList.add("active");

        const dia =
        botao.dataset.dia;

        carregarTreino(dia);

        carregarTempoSalvo(dia);

    });

});

/* TIMER */

let treinoAtivo = false;

let segundos = 0;

let intervalo;

function atualizarTimer(){

    segundos++;

    atualizarDisplay();

}

function atualizarDisplay(){

    const hrs =
    String(Math.floor(segundos / 3600))
    .padStart(2, "0");

    const mins =
    String(Math.floor((segundos % 3600) / 60))
    .padStart(2, "0");

    const secs =
    String(segundos % 60)
    .padStart(2, "0");

    timerElement.textContent =
    `${hrs}:${mins}:${secs}`;

}

/* BOTÃO TREINO */

btnTreino.addEventListener("click", () => {

    const diaAtual =
    document.querySelector(".btn-dia.active")
    .dataset.dia;

    if(!treinoAtivo){

        treinoAtivo = true;

        intervalo =
        setInterval(atualizarTimer, 1000);

        btnTreino.innerHTML =
        `<i class='bx bx-stop'></i>
        FINALIZAR TREINO`;

        btnTreino.classList.add("finalizar");

        statusTreino.textContent =
        `Treino em andamento • ${diaAtual}`;

    } else {

        treinoAtivo = false;

        clearInterval(intervalo);

        localStorage.setItem(
            `treino-${diaAtual}`,
            segundos
        );

        btnTreino.innerHTML =
        `<i class='bx bx-play'></i>
        INICIAR TREINO`;

        btnTreino.classList.remove("finalizar");

        statusTreino.textContent =
        `Treino finalizado • ${diaAtual}`;

    }

});

/* TEMPO SALVO */

function carregarTempoSalvo(dia){

    const tempoSalvo =
    localStorage.getItem(`treino-${dia}`);

    if(tempoSalvo){

        segundos = Number(tempoSalvo);

        atualizarDisplay();

        statusTreino.textContent =
        `Último treino salvo • ${dia}`;

    } else {

        segundos = 0;

        atualizarDisplay();

        statusTreino.textContent =
        "Nenhum treino salvo";

    }

}

/* MODAL */

function abrirModal(){

    modalOverlay.classList.add("show");

}

function fecharModalFunc(){

    modalOverlay.classList.remove("show");

}

btnEditar.addEventListener("click", abrirModal);

btnNovoExercicio.addEventListener("click", abrirModal);

fecharModal.addEventListener("click", fecharModalFunc);

modalOverlay.addEventListener("click", (e) => {

    if(e.target === modalOverlay){

        fecharModalFunc();

    }

});

/* SALVAR EXERCÍCIO */

salvarExercicio.addEventListener("click", () => {

    const nome =
    nomeExercicio.value.trim();

    const detalhes =
    detalhesExercicio.value.trim();

    const series =
    seriesExercicio.value.trim();

    if(
        nome === "" ||
        detalhes === "" ||
        series === ""
    ){
        alert("Preencha todos os campos.");
        return;
    }

    const diaAtual =
    document.querySelector(".btn-dia.active")
    .dataset.dia;

    treinos[diaAtual].push({

        nome,
        detalhes,
        series

    });

    carregarTreino(diaAtual);

    nomeExercicio.value = "";
    detalhesExercicio.value = "";
    seriesExercicio.value = "";

    fecharModalFunc();

});

/* INICIAR */

carregarTreino("Segunda");

carregarTempoSalvo("Segunda");