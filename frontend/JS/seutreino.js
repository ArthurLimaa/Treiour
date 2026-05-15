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

<<<<<<< HEAD
const grupoMuscular =
document.getElementById("grupoMuscular");
=======
const detalhesExercicio =
document.getElementById("detalhesExercicio");
>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d

const seriesExercicio =
document.getElementById("seriesExercicio");

<<<<<<< HEAD
const pesoExercicio =
document.getElementById("pesoExercicio");

=======
>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d
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

<<<<<<< HEAD
/* EXERCÍCIOS */

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

=======
>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d
/* TREINOS */

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
<<<<<<< HEAD
            series: "4x12",
            peso: "35kg"
=======
            series: "4x12"
        },
        {
            nome: "Remada Curvada",
            detalhes: "Costas",
            series: "4x10"
>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d
        }
    ],

    "Quarta": [
        {
            nome: "Agachamento",
            detalhes: "Pernas",
<<<<<<< HEAD
            series: "5x10",
            peso: "60kg"
=======
            series: "5x10"
>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d
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

<<<<<<< HEAD
/* SELECT EXERCÍCIOS */

grupoMuscular.addEventListener("change", () => {

    const grupo = grupoMuscular.value;

    nomeExercicio.innerHTML = "";

    if(grupo === ""){

        nomeExercicio.innerHTML =
        `<option value="">
        Selecione um grupo muscular
        </option>`;

        return;

    }

    exerciciosPorGrupo[grupo].forEach(exercicio => {

        nomeExercicio.innerHTML += `
        
            <option value="${exercicio}">
                ${exercicio}
            </option>
        
        `;

    });

});

=======
>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d
/* RENDER TREINO */

function carregarTreino(dia){

    tituloDia.innerHTML =
    `Treino de ${dia}`;

    listaTreino.innerHTML = "";

    const topoAcoes =
    document.createElement("div");

    topoAcoes.className =
    "acoes-exercicio";

    topoAcoes.innerHTML = `

        <button class="btn-excluir-treino"
        onclick="excluirTreino('${dia}')">

            <i class='bx bx-trash'></i>
            Excluir treino

        </button>

    `;

    listaTreino.appendChild(topoAcoes);

    treinos[dia].forEach((exercicio, index) => {

        const div =
        document.createElement("div");

        div.className = "exercicio";

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

        listaTreino.appendChild(div);

    });

}

<<<<<<< HEAD
/* EXCLUIR EXERCÍCIO */

function excluirExercicio(dia, index){

    treinos[dia].splice(index, 1);

    carregarTreino(dia);

}

/* EXCLUIR TREINO */

function excluirTreino(dia){

    treinos[dia] = [];

    carregarTreino(dia);

}

=======
>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d
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
<<<<<<< HEAD
    nomeExercicio.value;

    const grupo =
    grupoMuscular.value;
=======
    nomeExercicio.value.trim();

    const detalhes =
    detalhesExercicio.value.trim();
>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d

    const series =
    seriesExercicio.value.trim();

<<<<<<< HEAD
    const peso =
    pesoExercicio.value.trim();

    if(
        nome === "" ||
        grupo === "" ||
        series === "" ||
        peso === ""
=======
    if(
        nome === "" ||
        detalhes === "" ||
        series === ""
>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d
    ){
        alert("Preencha todos os campos.");
        return;
    }

    const diaAtual =
    document.querySelector(".btn-dia.active")
    .dataset.dia;

    treinos[diaAtual].push({

        nome,
<<<<<<< HEAD
        detalhes: grupo,
        series,
        peso
=======
        detalhes,
        series
>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d

    });

    carregarTreino(diaAtual);

<<<<<<< HEAD
    nomeExercicio.innerHTML =
    `<option value="">
    Selecione um grupo muscular
    </option>`;

    grupoMuscular.value = "";

    seriesExercicio.value = "";

    pesoExercicio.value = "";

=======
    nomeExercicio.value = "";
    detalhesExercicio.value = "";
    seriesExercicio.value = "";

>>>>>>> 9416a3f349ba081aeae998cb2b69f159defd539d
    fecharModalFunc();

});

/* INICIAR */

carregarTreino("Segunda");

carregarTempoSalvo("Segunda");