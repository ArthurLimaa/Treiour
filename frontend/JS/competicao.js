const defaultChallenge = {

  name: "Desafio de Abril",

  participants: [

    {
      name: "Luis",
      color: "#8b5cf6",
      checkins: [2,4,6,8,10,12,14,18,20]
    },

    {
      name: "Pedro",
      color: "#22c55e",
      checkins: [1,3,5,8,12,17]
    },

    {
      name: "João",
      color: "#facc15",
      checkins: [2,7,9,13,15,20,25]
    }

  ]

};

let challenge =
JSON.parse(localStorage.getItem("challenge"))
|| defaultChallenge;

/* ELEMENTOS */

const rankingList =
document.getElementById("rankingList");

const legend =
document.getElementById("legend");

const calendarHeader =
document.getElementById("calendarHeader");

const calendarGrid =
document.getElementById("calendarGrid");

const challengeName =
document.getElementById("challengeName");

const totalParticipants =
document.getElementById("totalParticipants");

const bestStreak =
document.getElementById("bestStreak");

const activeDays =
document.getElementById("activeDays");

const leaderName =
document.getElementById("leaderName");

const totalTrainings =
document.getElementById("totalTrainings");

const averagePresence =
document.getElementById("averagePresence");

const modalOverlay =
document.getElementById("modalOverlay");

const openModal =
document.getElementById("openModal");

const closeModal =
document.getElementById("closeModal");

const saveCompetition =
document.getElementById("saveCompetition");

const menuBtn =
document.getElementById("menuBtn");

const sidebar =
document.getElementById("sidebar");

const sidebarOverlay =
document.getElementById("sidebarOverlay");

const closeSidebar =
document.getElementById("closeSidebar");

const daysOfWeek =
["DOM","SEG","TER","QUA","QUI","SEX","SÁB"];

const totalDays = 30;

/* MENU MOBILE */

function abrirSidebar(){

  sidebar.classList.add("open");

  sidebarOverlay.classList.add("active");

}

function fecharSidebar(){

  sidebar.classList.remove("open");

  sidebarOverlay.classList.remove("active");

}

menuBtn.addEventListener("click", abrirSidebar);

closeSidebar.addEventListener("click", fecharSidebar);

sidebarOverlay.addEventListener("click", fecharSidebar);

/* MODAL */

openModal.addEventListener("click", () => {

  modalOverlay.classList.add("active");

});

closeModal.addEventListener("click", fecharModal);

modalOverlay.addEventListener("click", (e) => {

  if(e.target === modalOverlay){
    fecharModal();
  }

});

function fecharModal(){

  modalOverlay.classList.remove("active");

}

/* RENDER */

function renderChallenge(){

  challengeName.textContent =
  challenge.name;

  totalParticipants.textContent =
  challenge.participants.length;

  renderStats();

  renderRanking();

  renderLegend();

  renderCalendarHeader();

  renderCalendar();

  salvarChallenge();

}

/* STATS */

function renderStats(){

  const leader =
  [...challenge.participants]
  .sort((a,b)=>
    b.checkins.length - a.checkins.length
  )[0];

  leaderName.textContent =
  leader.name;

  const total =
  challenge.participants.reduce(
    (acc,p)=> acc + p.checkins.length,
    0
  );

  totalTrainings.textContent =
  total;

  averagePresence.textContent =
  Math.floor(
    total /
    (challenge.participants.length * totalDays)
    * 100
  ) + "%";

  bestStreak.textContent =
  Math.max(
    ...challenge.participants.map(
      p => p.checkins.length
    )
  );

  activeDays.textContent =
  total;

}

/* RANKING */

function renderRanking(){

  rankingList.innerHTML = "";

  const sorted =
  [...challenge.participants]
  .sort((a,b)=>
    b.checkins.length - a.checkins.length
  );

  sorted.forEach((participant,index)=>{

    const item =
    document.createElement("div");

    item.className = "ranking-item";

    item.innerHTML = `

      <div class="ranking-left">

        <div
        class="avatar"
        style="background:${participant.color}">

          ${participant.name.charAt(0)}

        </div>

        <div>

          <div class="user-name">
            ${index + 1}º ${participant.name}
          </div>

          <div class="user-days">
            ${participant.checkins.length}
            dias ativos
          </div>

        </div>

      </div>

      <div class="points">
        ${participant.checkins.length} pts
      </div>

    `;

    rankingList.appendChild(item);

  });

}

/* LEGENDA */

function renderLegend(){

  legend.innerHTML = "";

  challenge.participants.forEach(participant=>{

    const item =
    document.createElement("div");

    item.className = "legend-item";

    item.innerHTML = `

      <div
      class="color-dot"
      style="background:${participant.color}">
      </div>

      <span>${participant.name}</span>

    `;

    legend.appendChild(item);

  });

}

/* CALENDÁRIO */

function renderCalendarHeader(){

  calendarHeader.innerHTML = "";

  daysOfWeek.forEach(day=>{

    const div =
    document.createElement("div");

    div.textContent = day;

    calendarHeader.appendChild(div);

  });

}

function renderCalendar(){

  calendarGrid.innerHTML = "";

  for(let day = 1; day <= totalDays; day++){

    const div =
    document.createElement("div");

    div.className = "day";

    const participants =
    challenge.participants.filter(
      p => p.checkins.includes(day)
    );

    let participantsHTML = "";

    participants.forEach(p=>{

      participantsHTML += `

        <div
        class="mini-check"
        title="${p.name}"
        style="background:${p.color}">
        </div>

      `;

    });

    div.innerHTML = `

      <div class="day-number">
        ${day}
      </div>

      <div class="day-participants">
        ${participantsHTML}
      </div>

    `;

    calendarGrid.appendChild(div);

  }

}

/* CRIAR COMPETIÇÃO */

saveCompetition.addEventListener("click", ()=>{

  const title =
  document.getElementById("competitionTitle")
  .value.trim();

  const participantsInput =
  document.getElementById("participantsInput")
  .value.trim();

  if(!title || !participantsInput){

    alert("Preencha todos os campos.");

    return;

  }

  const names =
  participantsInput
  .split(",")
  .map(name=>name.trim())
  .filter(name=>name !== "");

  const colors = [
    "#8b5cf6",
    "#22c55e",
    "#facc15",
    "#f97316",
    "#06b6d4",
    "#ec4899"
  ];

  challenge = {

    name:title,

    participants:names.map((name,index)=>({

      name,

      color:colors[index % colors.length],

      checkins:generateRandomCheckins()

    }))

  };

  renderChallenge();

  fecharModal();

  document.getElementById("competitionTitle")
  .value = "";

  document.getElementById("participantsInput")
  .value = "";

});

/* RANDOM */

function generateRandomCheckins(){

  const amount =
  Math.floor(Math.random() * 10) + 4;

  const days = [];

  while(days.length < amount){

    const randomDay =
    Math.floor(Math.random() * totalDays) + 1;

    if(!days.includes(randomDay)){

      days.push(randomDay);

    }

  }

  return days.sort((a,b)=>a-b);

}

/* STORAGE */

function salvarChallenge(){

  localStorage.setItem(
    "challenge",
    JSON.stringify(challenge)
  );

}

/* START */

renderChallenge();