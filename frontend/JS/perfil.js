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

/* ELEMENTOS */

const nomeInput =
document.getElementById("nomeInput");

const emailInput =
document.getElementById("emailInput");

const idadeInput =
document.getElementById("idadeInput");

const pesoInput =
document.getElementById("pesoInput");

const alturaInput =
document.getElementById("alturaInput");

const objetivoInput =
document.getElementById("objetivoInput");

const salvarPerfil =
document.getElementById("salvarPerfil");

const nomePerfil =
document.getElementById("nomePerfil");

const previewFoto =
document.getElementById("previewFoto");

const inputFoto =
document.getElementById("inputFoto");

/* FOTO */

inputFoto.addEventListener("change", () => {

    const arquivo =
    inputFoto.files[0];

    if(arquivo){

        const leitor =
        new FileReader();

        leitor.onload = function(e){

            previewFoto.src =
            e.target.result;

            localStorage.setItem(
                "fotoPerfil",
                e.target.result
            );

        }

        leitor.readAsDataURL(arquivo);

    }

});

/* SALVAR PERFIL */

salvarPerfil.addEventListener("click", () => {

    const perfil = {

        nome: nomeInput.value,
        email: emailInput.value,
        idade: idadeInput.value,
        peso: pesoInput.value,
        altura: alturaInput.value,
        objetivo: objetivoInput.value

    };

    localStorage.setItem(
        "perfilTreior",
        JSON.stringify(perfil)
    );

    nomePerfil.textContent =
    perfil.nome || "Seu Nome";

    alert("Perfil salvo com sucesso!");

});

/* CARREGAR PERFIL */

function carregarPerfil(){

    const dados =
    localStorage.getItem("perfilTreior");

    if(dados){

        const perfil =
        JSON.parse(dados);

        nomeInput.value =
        perfil.nome || "";

        emailInput.value =
        perfil.email || "";

        idadeInput.value =
        perfil.idade || "";

        pesoInput.value =
        perfil.peso || "";

        alturaInput.value =
        perfil.altura || "";

        objetivoInput.value =
        perfil.objetivo || "";

        nomePerfil.textContent =
        perfil.nome || "Seu Nome";

    }

    const fotoSalva =
    localStorage.getItem("fotoPerfil");

    if(fotoSalva){

        previewFoto.src =
        fotoSalva;

    }

}

/* ESTATÍSTICAS */

function carregarEstatisticas(){

    let totalTreinos = 0;

    let totalSegundos = 0;

    const dias = [
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
        "Domingo"
    ];

    dias.forEach(dia => {

        const tempo =
        localStorage.getItem(`treino-${dia}`);

        if(tempo){

            totalTreinos++;

            totalSegundos +=
            Number(tempo);

        }

    });

    document.getElementById(
        "treinosFeitos"
    ).textContent =
    totalTreinos;

    const horas =
    (totalSegundos / 3600)
    .toFixed(1);

    document.getElementById(
        "tempoTreino"
    ).textContent =
    `${horas}h`;

}

/* INICIAR */

carregarPerfil();

carregarEstatisticas();