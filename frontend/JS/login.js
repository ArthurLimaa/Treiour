const form = document.getElementById("loginForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.querySelector("input[type='email']").value;
    const senha = document.querySelector("input[type='password']").value;

    try {
        const response = await fetch("http://localhost:8080/usuario/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            throw new Error("Erro na requisição");
        }

        const data = await response.json();

        if (data && data.id) {
            window.location.href = "menu2.html";
        } else {
            alert("Email ou senha inválidos");
        }

    } catch (error) {
        alert("Erro ao conectar com o servidor");
        console.error(error);
    }
});