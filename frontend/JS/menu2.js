// Elemento que ativa o menu ao passar o mouse
const menuHover = document.getElementById("menuHover");

// Menu dropdown que será exibido
const dropdownMenu = document.getElementById("dropdownMenu");

// Container principal do carrossel
const carousel = document.getElementById("carousel");

// Botão anterior
const prevBtn = document.getElementById("prevBtn");

// Botão próximo
const nextBtn = document.getElementById("nextBtn");

// Área dos indicadores (bolinhas)
const indicators = document.getElementById("indicators");

/* =========================
   DADOS DOS CARDS
========================= */

// Array contendo todos os cards do carrossel
const cardsData = [

    // Primeiro card
    {
        // Título do card
        title: "Seu Treino",

        // Texto descritivo
        text: "Monte treinos personalizados e acompanhe sua evolução.",

        // Imagem do card
        image: "https://th.bing.com/th/id/R.c4185b7eeabeac37b063f79e1b9a3276?rik=K7nWHyU3V5E94g&pid=ImgRaw&r=0",

        // Página para onde o usuário será levado
        link: "seutreino.html"
    },

    // Segundo card
    {
        title: "Análise de Treino",

        text: "Veja gráficos, desempenho e estatísticas dos seus resultados.",

        image: "https://www.sescpr.com.br/wp-content/uploads/2019/04/iStock-834605130.jpg",

        link: "analise.html"
    },

    // Terceiro card
    {
        title: "Competição",

        text: "Desafie atletas, suba no ranking e evolua constantemente.",

        image: "https://blog.acqualive.com.br/wp-content/uploads/2018/01/ThinkstockPhotos-861047682-1.jpg",

        link: "competicao.html"
    }

];

// Índice do card central/destaque
let currentCenter = 1;

/* =========================
   MENU
========================= */

// Evento quando o mouse entra no menu
menuHover.addEventListener("mouseenter", () => {

    // Mostra dropdown adicionando classe show
    dropdownMenu.classList.add("show");

});

// Evento quando o mouse sai da área do menu
document.querySelector(".menu-wrapper")
.addEventListener("mouseleave", () => {

    // Remove classe show escondendo o menu
    dropdownMenu.classList.remove("show");

});

/* =========================
   RENDER
========================= */

// Função principal que desenha o carrossel
function renderCarousel(){

    // Limpa os cards antigos
    carousel.innerHTML = "";

    // Quantidade total de cards
    const total = cardsData.length;

    // Calcula o card da esquerda
    // Usa módulo (%) para fazer loop infinito
    const leftIndex =
    (currentCenter - 1 + total) % total;

    // Card central
    const centerIndex = currentCenter;

    // Calcula card da direita
    const rightIndex =
    (currentCenter + 1) % total;

    // Array contendo apenas os 3 cards visíveis
    const visibleCards = [
        leftIndex,
        centerIndex,
        rightIndex
    ];

    // Percorre os cards visíveis
    visibleCards.forEach((index, position) => {

        // Dados do card atual
        const card = cardsData[index];

        // Verifica se é o card central
        const isCenter = position === 1;

        // Cria elemento HTML do card
        const cardElement =
        document.createElement("div");

        // Adiciona classe destaque no card central
        cardElement.className =
        `card ${isCenter ? "destaque" : ""}`;

        // Estrutura HTML do card
        cardElement.innerHTML = `

            <img src="${card.image}" alt="${card.title}">

            <div class="overlay">

                <h3>${card.title}</h3>

                <p>${card.text}</p>

            </div>

        `;

        /* CLIQUE */

        // Evento de clique no card
        cardElement.addEventListener("click", () => {

            // Redireciona para a página do card
            window.location.href = card.link;

        });

        // Adiciona card no carrossel
        carousel.appendChild(cardElement);

    });

    // Atualiza bolinhas indicadoras
    updateIndicators();

}

/* =========================
   INDICADORES
========================= */

// Função que cria as bolinhas inferiores
function updateIndicators(){

    // Limpa indicadores antigos
    indicators.innerHTML = "";

    // Percorre todos os cards
    cardsData.forEach((_, index) => {

        // Cria bolinha
        const dot = document.createElement("div");

        // Define classe ativa para o card atual
        dot.className =
        `dot ${index === currentCenter ? "active" : ""}`;

        // Evento ao clicar na bolinha
        dot.addEventListener("click", () => {

            // Define novo card central
            currentCenter = index;

            // Atualiza carrossel
            renderCarousel();

        });

        // Adiciona bolinha na tela
        indicators.appendChild(dot);

    });

}

/* =========================
   BOTÕES
========================= */

// Evento botão próximo
nextBtn.addEventListener("click", () => {

    // Avança um card
    currentCenter =
    (currentCenter + 1) % cardsData.length;

    // Atualiza carrossel
    renderCarousel();

});

// Evento botão anterior
prevBtn.addEventListener("click", () => {

    // Volta um card
    currentCenter =
    (currentCenter - 1 + cardsData.length)
    % cardsData.length;

    // Atualiza carrossel
    renderCarousel();

});

/* =========================
   AUTOPLAY
========================= */

// Inicia autoplay automático
let autoPlay = setInterval(() => {

    // Vai para próximo card automaticamente
    currentCenter =
    (currentCenter + 1) % cardsData.length;

    // Atualiza carrossel
    renderCarousel();

}, 5000);

// Quando mouse entra no carrossel
carousel.addEventListener("mouseenter", () => {

    // Para autoplay
    clearInterval(autoPlay);

});

// Quando mouse sai do carrossel
carousel.addEventListener("mouseleave", () => {

    // Reinicia autoplay
    autoPlay = setInterval(() => {

        // Avança automaticamente
        currentCenter =
        (currentCenter + 1)
        % cardsData.length;

        // Atualiza carrossel
        renderCarousel();

    }, 5000);

});

/* =========================
   INICIAR
========================= */

// Inicializa carrossel ao abrir página
renderCarousel();