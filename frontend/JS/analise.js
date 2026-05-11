document.addEventListener("DOMContentLoaded", () => {

    const dados = {

        dias: [
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb",
            "Dom"
        ],

        treinos: [4, 3, 2, 1, 5, 2, 0],

        tempo: [80, 60, 46, 57, 73, 60, 0],

        distribuicao: {
            superior: 60,
            inferior: 30,
            cardio: 10
        }
    };

    atualizarResumo(dados);

    criarGrafico(dados);

    atualizarInsights(dados);

    atualizarTempo(dados);

});

/* =========================
   RESUMO
========================= */

function atualizarResumo(dados){

    const totalTreinos =
    dados.treinos.reduce((a,b) => a + b,0);

    const totalTempo =
    dados.tempo.reduce((a,b) => a + b,0);

    const media =
    Math.floor(totalTempo / 7);

    document.getElementById("totalTreinos").innerText =
    totalTreinos;

    document.getElementById("tempoTotal").innerText =
    formatarTempo(totalTempo);

    document.getElementById("mediaTreino").innerText =
    `${media}min`;
}

/* =========================
   GRÁFICO
========================= */

function criarGrafico(dados){

    const ctx =
    document.getElementById("graficoTreinos");

    new Chart(ctx, {

        type: "bar",

        data: {

            labels: dados.dias,

            datasets: [{

                label: "Treinos",

                data: dados.treinos,

                borderRadius: 12,

                backgroundColor: [
                    "#8b5cf6",
                    "#a78bfa",
                    "#3b82f6",
                    "#60a5fa",
                    "#22c55e",
                    "#4ade80",
                    "#64748b"
                ]
            }]
        },

        options: {

            responsive: true,

            plugins: {

                legend: {
                    display: false
                }
            },

            scales: {

                x: {

                    grid: {
                        display: false
                    },

                    ticks: {
                        color: "#b8b8c7"
                    }
                },

                y: {

                    beginAtZero: true,

                    grid: {
                        color: "rgba(255,255,255,0.05)"
                    },

                    ticks: {
                        color: "#b8b8c7"
                    }
                }
            }
        }
    });
}

/* =========================
   INSIGHTS
========================= */

function atualizarInsights(dados){

    const max =
    Math.max(...dados.tempo);

    const min =
    Math.min(...dados.tempo.filter(t => t > 0));

    const diaMax =
    dados.dias[dados.tempo.indexOf(max)];

    const diaMin =
    dados.dias[dados.tempo.indexOf(min)];

    document.getElementById("diaMax").innerText =
    `${diaMax} • ${formatarTempo(max)}`;

    document.getElementById("diaMin").innerText =
    `${diaMin} • ${formatarTempo(min)}`;

    document.getElementById("evolucao").innerText =
    "+20% essa semana";

    document.getElementById("sup").style.width =
    dados.distribuicao.superior + "%";

    document.getElementById("inf").style.width =
    dados.distribuicao.inferior + "%";

    document.getElementById("cardio").style.width =
    dados.distribuicao.cardio + "%";

    document.getElementById("supValor").innerText =
    dados.distribuicao.superior + "%";

    document.getElementById("infValor").innerText =
    dados.distribuicao.inferior + "%";

    document.getElementById("cardioValor").innerText =
    dados.distribuicao.cardio + "%";
}

/* =========================
   TEMPO POR DIA
========================= */

function atualizarTempo(dados){

    const container =
    document.getElementById("tempoContainer");

    container.innerHTML = "";

    const max =
    Math.max(...dados.tempo);

    dados.dias.forEach((dia, i) => {

        const tempo =
        dados.tempo[i];

        const porcentagem =
        (tempo / max) * 100;

        container.innerHTML += `

            <div class="dia">

                <span class="nome-dia">
                    ${dia}
                </span>

                <div class="linha">
                    <div style="width:${porcentagem}%"></div>
                </div>

                <span class="tempo-texto">
                    ${formatarTempo(tempo)}
                </span>

            </div>

        `;
    });
}

/* =========================
   FORMATAR TEMPO
========================= */

function formatarTempo(min){

    const h =
    Math.floor(min / 60);

    const m =
    min % 60;

    if(min === 0){
        return "0min";
    }

    return h > 0
        ? `${h}h ${m}min`
        : `${m}min`;
}

/* =========================
   MENU LATERAL
========================= */

const menu =
document.querySelector(".menu");

const sidebar =
document.getElementById("sidebar");

const overlay =
document.getElementById("overlay");

const closeMenu =
document.getElementById("closeMenu");

function abrirMenu(){

    sidebar.classList.add("active");

    overlay.classList.add("active");
}

function fecharMenu(){

    sidebar.classList.remove("active");

    overlay.classList.remove("active");
}

menu.addEventListener("click", abrirMenu);

closeMenu.addEventListener("click", fecharMenu);

overlay.addEventListener("click", fecharMenu);