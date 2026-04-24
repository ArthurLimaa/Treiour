const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.querySelector("input[type='email']").value;
    const senha = document.querySelector("input[type='password']").value;

    const response = await fetch("http://localhost:8080/usuario/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (data && data.id) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    } else {
        alert("Erro ao cadastrar");
    }
});