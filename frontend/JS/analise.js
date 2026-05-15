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

// Função responsável por criar o gráfico
function criarGrafico(dados){

    // Pega o elemento canvas do HTML onde o gráfico será desenhado
    const ctx =
    document.getElementById("graficoTreinos");

    // Cria um novo gráfico usando a biblioteca Chart.js
    new Chart(ctx, {

        // Define o tipo do gráfico
        // "bar" = gráfico de barras
        type: "bar",

        // Área onde ficam os dados do gráfico
        data: {

            // Labels do eixo X
            // Cada item representa um dia da semana
            labels: dados.dias,

            // Conjunto de dados do gráfico
            datasets: [{

                // Nome do conjunto de dados
                // Normalmente aparece na legenda
                label: "Treinos",

                // Valores das barras
                // Cada número representa a altura da barra
                data: dados.treinos,

                // Deixa as bordas das barras arredondadas
                borderRadius: 12,

                // Define uma cor para cada barra
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

        // Configurações visuais e comportamentos do gráfico
        options: {

            // Faz o gráfico se adaptar automaticamente à tela
            responsive: true,

            // Configurações extras do gráfico
            plugins: {

                // Configuração da legenda
                legend: {

                    // false = esconde a legenda
                    display: false
                }
            },

            // Configuração dos eixos
            scales: {

                // Configuração do eixo X (horizontal)
                x: {

                    // Configuração das linhas do fundo
                    grid: {

                        // Remove as linhas verticais
                        display: false
                    },

                    // Configuração dos textos do eixo X
                    ticks: {

                        // Cor dos nomes dos dias
                        color: "#b8b8c7"
                    }
                },

                // Configuração do eixo Y (vertical)
                y: {

                    // Faz o gráfico começar do zero
                    beginAtZero: true,

                    // Configuração das linhas horizontais
                    grid: {

                        // Cor das linhas do fundo
                        color: "rgba(255,255,255,0.05)"
                    },

                    // Configuração dos números laterais
                    ticks: {

                        // Cor dos números do eixo Y
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

// Função responsável por atualizar os insights da tela
function atualizarInsights(dados){

    // Pega o maior valor dentro do array de tempo
    // Exemplo: [80, 60, 46] → retorna 80
    const max =
    Math.max(...dados.tempo);

    // Filtra os valores maiores que 0
    // Depois pega o menor valor encontrado
    // Isso evita considerar dias sem treino
    const min =
    Math.min(...dados.tempo.filter(t => t > 0));

    // Descobre em qual posição está o maior valor
    // Depois usa essa posição para encontrar o dia correspondente
    const diaMax =
    dados.dias[dados.tempo.indexOf(max)];

    // Descobre o dia referente ao menor treino
    const diaMin =
    dados.dias[dados.tempo.indexOf(min)];

    // Atualiza no HTML o melhor dia da semana
    // Exemplo: "Seg • 1h 20min"
    document.getElementById("diaMax").innerText =
    `${diaMax} • ${formatarTempo(max)}`;

    // Atualiza no HTML o menor dia da semana
    document.getElementById("diaMin").innerText =
    `${diaMin} • ${formatarTempo(min)}`;

    // Define manualmente o texto de evolução
    document.getElementById("evolucao").innerText =
    "+20% essa semana";

    // Ajusta a largura da barra de treino superior
    // Exemplo: width = "60%"
    document.getElementById("sup").style.width =
    dados.distribuicao.superior + "%";

    // Ajusta a largura da barra de treino inferior
    document.getElementById("inf").style.width =
    dados.distribuicao.inferior + "%";

    // Ajusta a largura da barra de cardio
    document.getElementById("cardio").style.width =
    dados.distribuicao.cardio + "%";

    // Mostra o valor percentual do treino superior
    document.getElementById("supValor").innerText =
    dados.distribuicao.superior + "%";

    // Mostra o valor percentual do treino inferior
    document.getElementById("infValor").innerText =
    dados.distribuicao.inferior + "%";

    // Mostra o valor percentual do cardio
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