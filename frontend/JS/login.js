const form = document.querySelector("#loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;

    try {

        const response = await fetch("http://localhost:8080/usuario/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })

        });

        if (!response.ok) {

            throw new Error("Erro na requisição");

        }

        const data = await response.json();

        if (data && data.id) {

            alert("Login realizado com sucesso!");

            window.location.href = "menu2.html";

        } else {

            alert("Email ou senha inválidos");

        }

    } catch (error) {

        console.error(error);

        alert("Erro ao conectar com o servidor");

    }

});