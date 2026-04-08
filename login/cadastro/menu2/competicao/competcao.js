const challenge = {
  name: "Desafio de Abril",
  participants: [
    {
      name: "Pedro",
      color: "#facc15",
      checkins: [2, 4, 6, 10, 11, 12, 13, 16, 18, 20]
    },
    {
      name: "Você",
      color: "#8b5cf6",
      checkins: [3, 5, 8, 11, 13, 17, 19, 23]
    },
    {
      name: "João",
      color: "#22c55e",
      checkins: [9, 12, 18]
    }
  ]
};

const rankingList = document.getElementById("rankingList");
const legend = document.getElementById("legend");
const calendarHeader = document.getElementById("calendarHeader");
const calendarGrid = document.getElementById("calendarGrid");
const challengeName = document.getElementById("challengeName");
const totalParticipants = document.getElementById("totalParticipants");

const daysOfWeek = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];
const totalDays = 30;

// MODAL
const modalOverlay = document.getElementById("modalOverlay");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const saveCompetition = document.getElementById("saveCompetition");

// MENU
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

openModal.addEventListener("click", () => {
  modalOverlay.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
  }
});

// RENDERIZAÇÃO
function renderChallenge() {
  challengeName.textContent = challenge.name;
  totalParticipants.textContent = challenge.participants.length;

  renderRanking();
  renderLegend();
  renderCalendarHeader();
  renderCalendar();
}

function renderRanking() {
  rankingList.innerHTML = "";

  const sorted = [...challenge.participants].sort(
    (a, b) => b.checkins.length - a.checkins.length
  );

  sorted.forEach((participant, index) => {
    const position = index + 1;

    let positionClass = "other";
    let medal = "🔥";

    if (position === 1) {
      positionClass = "first";
      medal = "🥇";
    } else if (position === 2) {
      positionClass = "second";
      medal = "🥈";
    } else if (position === 3) {
      positionClass = "third";
      medal = "🥉";
    }

    rankingList.innerHTML += `
      <div class="ranking-item">
        <div class="ranking-left">
          <div class="position-badge ${positionClass}">
            ${position}º
          </div>
          <div>
            <div class="user-name">${participant.name} ${medal}</div>
            <div class="user-days">${participant.checkins.length} dias ativos</div>
          </div>
        </div>
        <div class="points">${participant.checkins.length} pts</div>
      </div>
    `;
  });
}

function renderLegend() {
  legend.innerHTML = "";

  challenge.participants.forEach((participant) => {
    legend.innerHTML += `
      <div class="legend-item">
        <div class="color-dot" style="background:${participant.color}"></div>
        <span>${participant.name}</span>
      </div>
    `;
  });
}

function renderCalendarHeader() {
  calendarHeader.innerHTML = "";
  daysOfWeek.forEach(day => {
    calendarHeader.innerHTML += `<div>${day}</div>`;
  });
}

function renderCalendar() {
  calendarGrid.innerHTML = "";

  for (let day = 1; day <= totalDays; day++) {
    const participantsInDay = challenge.participants.filter(p =>
      p.checkins.includes(day)
    );

    let participantsHTML = "";

    participantsInDay.forEach(p => {
      participantsHTML += `
        <div class="mini-check" 
             title="${p.name}" 
             style="background:${p.color}">
        </div>
      `;
    });

    calendarGrid.innerHTML += `
      <div class="day">
        <div class="day-number">${day}</div>
        <div class="day-participants">
          ${participantsHTML}
        </div>
      </div>
    `;
  }
}

// CRIAR NOVA COMPETIÇÃO
saveCompetition.addEventListener("click", () => {
  const title = document.getElementById("competitionTitle").value.trim();
  const participantsInput = document.getElementById("participantsInput").value.trim();

  if (!title || !participantsInput) {
    alert("Preencha o nome da competição e os participantes.");
    return;
  }

  const names = participantsInput
    .split(",")
    .map(name => name.trim())
    .filter(name => name !== "");

  if (names.length === 0) {
    alert("Adicione pelo menos 1 participante.");
    return;
  }

  const colors = ["#8b5cf6", "#22c55e", "#facc15", "#f97316", "#06b6d4", "#ec4899"];

  challenge.name = title;
  challenge.participants = names.map((name, index) => ({
    name,
    color: colors[index % colors.length],
    checkins: generateRandomCheckins()
  }));

  renderChallenge();
  modalOverlay.classList.remove("active");

  document.getElementById("competitionTitle").value = "";
  document.getElementById("participantsInput").value = "";
});

// GERA CHECKINS FAKE (para demonstração)
function generateRandomCheckins() {
  const amount = Math.floor(Math.random() * 12) + 3;
  const days = [];

  while (days.length < amount) {
    const randomDay = Math.floor(Math.random() * totalDays) + 1;
    if (!days.includes(randomDay)) {
      days.push(randomDay);
    }
  }

  return days.sort((a, b) => a - b);
}

renderChallenge();