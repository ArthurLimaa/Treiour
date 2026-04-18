const menuHover = document.getElementById("menuHover");
const dropdownMenu = document.getElementById("dropdownMenu");

const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const indicators = document.getElementById("indicators");

// ================================
// DADOS DOS CARDS
// ================================
const cardsData = [
  {
    title: "Seu Treino",
    text: "Monte, acompanhe e evolua seus treinos.",
    image: "https://th.bing.com/th/id/R.c4185b7eeabeac37b063f79e1b9a3276?rik=K7nWHyU3V5E94g&pid=ImgRaw&r=0",
    link: "seutreino.html"
  },
  {
    title: "Análise de Treino",
    text: "Veja desempenho, progresso e estatísticas.",
    image: "https://www.sescpr.com.br/wp-content/uploads/2019/04/iStock-834605130.jpg",
    link: "analise.html"
  },
  {
    title: "Competição",
    text: "Desafie amigos e participe de rankings.",
    image: "https://blog.acqualive.com.br/wp-content/uploads/2018/01/ThinkstockPhotos-861047682-1.jpg",
    link: "competicao.html"
  }
];

// índice do card que fica no centro
let currentCenter = 1;

// ================================
// MENU HOVER
// ================================
menuHover.addEventListener("mouseenter", () => {
  dropdownMenu.classList.add("show");
});

document.querySelector(".menu-wrapper").addEventListener("mouseleave", () => {
  dropdownMenu.classList.remove("show");
});

// ================================
// RENDERIZA O CARROSSEL
// ================================
function renderCarousel() {
  carousel.innerHTML = "";

  const total = cardsData.length;

  const leftIndex = (currentCenter - 1 + total) % total;
  const centerIndex = currentCenter;
  const rightIndex = (currentCenter + 1) % total;

  const visibleCards = [leftIndex, centerIndex, rightIndex];

  visibleCards.forEach((index, position) => {
    const card = cardsData[index];
    const isCenter = position === 1;

    const cardElement = document.createElement("div");
    cardElement.className = `card ${isCenter ? "destaque" : ""}`;

    cardElement.innerHTML = `
      <img src="${card.image}" alt="${card.title}">
      <div class="overlay">
        <h3>${card.title}</h3>
        <p>${card.text}</p>
      </div>
    `;

    // ================================
    // CLIQUE NO CARD
    // ================================
    cardElement.addEventListener("click", () => {
      if (card.link) {
        window.location.href = card.link;
      }
    });

    carousel.appendChild(cardElement);
  });

  updateIndicators();
}

// ================================
// ATUALIZA AS BOLINHAS
// ================================
function updateIndicators() {
  indicators.innerHTML = "";

  cardsData.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `dot ${index === currentCenter ? "active" : ""}`;

    dot.addEventListener("click", () => {
      currentCenter = index;
      renderCarousel();
    });

    indicators.appendChild(dot);
  });
}

// ================================
// BOTÕES DO CARROSSEL
// ================================
nextBtn.addEventListener("click", () => {
  currentCenter = (currentCenter + 1) % cardsData.length;
  renderCarousel();
});

prevBtn.addEventListener("click", () => {
  currentCenter = (currentCenter - 1 + cardsData.length) % cardsData.length;
  renderCarousel();
});

// ================================
// AUTOPLAY (troca automática)
// ================================
let autoPlay = setInterval(() => {
  currentCenter = (currentCenter + 1) % cardsData.length;
  renderCarousel();
}, 5000);

// pausa autoplay quando passa o mouse
carousel.addEventListener("mouseenter", () => {
  clearInterval(autoPlay);
});

// volta autoplay quando tira o mouse
carousel.addEventListener("mouseleave", () => {
  autoPlay = setInterval(() => {
    currentCenter = (currentCenter + 1) % cardsData.length;
    renderCarousel();
  }, 5000);
});

// ================================
// INICIA
// ================================
renderCarousel();