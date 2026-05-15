// Objeto padrão da competição
// Esse objeto será usado caso não exista nada salvo no localStorage
const defaultChallenge = {

  // Nome da competição
  name: "Desafio de Abril",

  // Lista de participantes
  participants: [

    // Participante 1
    {
      // Nome do participante
      name: "Luis",

      // Cor usada no calendário e ranking
      color: "#8b5cf6",

      // Dias em que treinou
      checkins: [2,4,6,8,10,12,14,18,20]
    },

    // Participante 2
    {
      name: "Pedro",
      color: "#22c55e",
      checkins: [1,3,5,8,12,17]
    },

    // Participante 3
    {
      name: "João",
      color: "#facc15",
      checkins: [2,7,9,13,15,20,25]
    }

  ]

};

// Tenta pegar os dados salvos no navegador
// Caso não exista nada salvo, usa o defaultChallenge
let challenge =
JSON.parse(localStorage.getItem("challenge"))
|| defaultChallenge;

/* ELEMENTOS */

// Elemento da lista de ranking
const rankingList =
document.getElementById("rankingList");

// Elemento da legenda dos participantes
const legend =
document.getElementById("legend");

// Cabeçalho do calendário
const calendarHeader =
document.getElementById("calendarHeader");

// Grade do calendário
const calendarGrid =
document.getElementById("calendarGrid");

// Nome da competição
const challengeName =
document.getElementById("challengeName");

// Total de participantes
const totalParticipants =
document.getElementById("totalParticipants");

// Melhor sequência
const bestStreak =
document.getElementById("bestStreak");

// Dias ativos
const activeDays =
document.getElementById("activeDays");

// Nome do líder
const leaderName =
document.getElementById("leaderName");

// Total de treinos
const totalTrainings =
document.getElementById("totalTrainings");

// Média de presença
const averagePresence =
document.getElementById("averagePresence");

// Fundo escuro do modal
const modalOverlay =
document.getElementById("modalOverlay");

// Botão abrir modal
const openModal =
document.getElementById("openModal");

// Botão fechar modal
const closeModal =
document.getElementById("closeModal");

// Botão salvar competição
const saveCompetition =
document.getElementById("saveCompetition");

// Botão abrir menu mobile
const menuBtn =
document.getElementById("menuBtn");

// Sidebar/menu lateral
const sidebar =
document.getElementById("sidebar");

// Fundo escuro da sidebar
const sidebarOverlay =
document.getElementById("sidebarOverlay");

// Botão fechar sidebar
const closeSidebar =
document.getElementById("closeSidebar");

// Dias da semana
const daysOfWeek =
["DOM","SEG","TER","QUA","QUI","SEX","SÁB"];

// Total de dias do calendário
const totalDays = 30;

/* MENU MOBILE */

// Função para abrir sidebar
function abrirSidebar(){

  // Adiciona classe open
  sidebar.classList.add("open");

  // Ativa overlay escuro
  sidebarOverlay.classList.add("active");

}

// Função para fechar sidebar
function fecharSidebar(){

  // Remove open da sidebar
  sidebar.classList.remove("open");

  // Remove overlay
  sidebarOverlay.classList.remove("active");

}

// Evento de clique abrir sidebar
menuBtn.addEventListener("click", abrirSidebar);

// Evento fechar sidebar
closeSidebar.addEventListener("click", fecharSidebar);

// Fecha clicando fora
sidebarOverlay.addEventListener("click", fecharSidebar);

/* MODAL */

// Abre modal ao clicar
openModal.addEventListener("click", () => {

  // Adiciona classe active
  modalOverlay.classList.add("active");

});

// Fecha modal
closeModal.addEventListener("click", fecharModal);

// Fecha clicando fora da caixa
modalOverlay.addEventListener("click", (e) => {

  // Verifica se clicou no fundo escuro
  if(e.target === modalOverlay){
    fecharModal();
  }

});

// Função fechar modal
function fecharModal(){

  // Remove active
  modalOverlay.classList.remove("active");

}

/* RENDER */

// Função principal da tela
function renderChallenge(){

  // Atualiza nome da competição
  challengeName.textContent =
  challenge.name;

  // Atualiza quantidade de participantes
  totalParticipants.textContent =
  challenge.participants.length;

  // Atualiza estatísticas
  renderStats();

  // Atualiza ranking
  renderRanking();

  // Atualiza legenda
  renderLegend();

  // Atualiza cabeçalho calendário
  renderCalendarHeader();

  // Atualiza calendário
  renderCalendar();

  // Salva no navegador
  salvarChallenge();

}

/* STATS */

// Função das estatísticas
function renderStats(){

  // Ordena participantes pelo maior número de checkins
  const leader =
  [...challenge.participants]
  .sort((a,b)=>
    b.checkins.length - a.checkins.length
  )[0];

  // Atualiza líder atual
  leaderName.textContent =
  leader.name;

  // Soma total de checkins
  const total =
  challenge.participants.reduce(
    (acc,p)=> acc + p.checkins.length,
    0
  );

  // Atualiza total de treinos
  totalTrainings.textContent =
  total;

  // Calcula média de presença
  averagePresence.textContent =
  Math.floor(
    total /
    (challenge.participants.length * totalDays)
    * 100
  ) + "%";

  // Mostra maior quantidade de checkins
  bestStreak.textContent =
  Math.max(
    ...challenge.participants.map(
      p => p.checkins.length
    )
  );

  // Atualiza dias ativos
  activeDays.textContent =
  total;

}

/* RANKING */

// Função do ranking
function renderRanking(){

  // Limpa ranking anterior
  rankingList.innerHTML = "";

  // Ordena participantes
  const sorted =
  [...challenge.participants]
  .sort((a,b)=>
    b.checkins.length - a.checkins.length
  );

  // Percorre participantes
  sorted.forEach((participant,index)=>{

    // Cria div do ranking
    const item =
    document.createElement("div");

    // Classe CSS
    item.className = "ranking-item";

    // HTML interno
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

    // Adiciona no HTML
    rankingList.appendChild(item);

  });

}

/* LEGENDA */

// Função da legenda
function renderLegend(){

  // Limpa legenda
  legend.innerHTML = "";

  // Percorre participantes
  challenge.participants.forEach(participant=>{

    // Cria item
    const item =
    document.createElement("div");

    // Classe CSS
    item.className = "legend-item";

    // HTML interno
    item.innerHTML = `

      <div
      class="color-dot"
      style="background:${participant.color}">
      </div>

      <span>${participant.name}</span>

    `;

    // Adiciona na legenda
    legend.appendChild(item);

  });

}

/* CALENDÁRIO */

// Cabeçalho do calendário
function renderCalendarHeader(){

  // Limpa cabeçalho
  calendarHeader.innerHTML = "";

  // Percorre dias da semana
  daysOfWeek.forEach(day=>{

    // Cria div
    const div =
    document.createElement("div");

    // Adiciona texto
    div.textContent = day;

    // Adiciona no HTML
    calendarHeader.appendChild(div);

  });

}

// Função principal calendário
function renderCalendar(){

  // Limpa calendário
  calendarGrid.innerHTML = "";

  // Loop de dias
  for(let day = 1; day <= totalDays; day++){

    // Cria dia
    const div =
    document.createElement("div");

    // Classe CSS
    div.className = "day";

    // Filtra participantes que treinaram
    const participants =
    challenge.participants.filter(
      p => p.checkins.includes(day)
    );

    // HTML inicial vazio
    let participantsHTML = "";

    // Percorre participantes
    participants.forEach(p=>{

      // Cria bolinhas coloridas
      participantsHTML += `

        <div
        class="mini-check"
        title="${p.name}"
        style="background:${p.color}">
        </div>

      `;

    });

    // Estrutura do dia
    div.innerHTML = `

      <div class="day-number">
        ${day}
      </div>

      <div class="day-participants">
        ${participantsHTML}
      </div>

    `;

    // Adiciona no calendário
    calendarGrid.appendChild(div);

  }

}

/* CRIAR COMPETIÇÃO */

// Evento botão criar
saveCompetition.addEventListener("click", ()=>{

  // Pega nome competição
  const title =
  document.getElementById("competitionTitle")
  .value.trim();

  // Pega participantes
  const participantsInput =
  document.getElementById("participantsInput")
  .value.trim();

  // Verifica campos vazios
  if(!title || !participantsInput){

    alert("Preencha todos os campos.");

    return;

  }

  // Transforma texto em array
  const names =
  participantsInput
  .split(",")
  .map(name=>name.trim())
  .filter(name=>name !== "");

  // Lista de cores
  const colors = [
    "#8b5cf6",
    "#22c55e",
    "#facc15",
    "#f97316",
    "#06b6d4",
    "#ec4899"
  ];

  // Cria nova competição
  challenge = {

    // Nome competição
    name:title,

    // Participantes
    participants:names.map((name,index)=>({

      name,

      // Define cor automaticamente
      color:colors[index % colors.length],

      // Gera checkins aleatórios
      checkins:generateRandomCheckins()

    }))

  };

  // Atualiza tela
  renderChallenge();

  // Fecha modal
  fecharModal();

  // Limpa input título
  document.getElementById("competitionTitle")
  .value = "";

  // Limpa input participantes
  document.getElementById("participantsInput")
  .value = "";

});

/* RANDOM */

// Função que gera dias aleatórios
function generateRandomCheckins(){

  // Quantidade aleatória de treinos
  const amount =
  Math.floor(Math.random() * 10) + 4;

  // Array vazio
  const days = [];

  // Enquanto não atingir quantidade
  while(days.length < amount){

    // Dia aleatório
    const randomDay =
    Math.floor(Math.random() * totalDays) + 1;

    // Evita repetir dia
    if(!days.includes(randomDay)){

      days.push(randomDay);

    }

  }

  // Ordena números
  return days.sort((a,b)=>a-b);

}

/* STORAGE */

// Salva no navegador
function salvarChallenge(){

  localStorage.setItem(
    "challenge",
    JSON.stringify(challenge)
  );

}

/* START */

// Inicializa sistema
renderChallenge();