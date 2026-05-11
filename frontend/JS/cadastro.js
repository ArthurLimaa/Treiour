const form = document.querySelector("#cadastroForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nome = document.querySelector("#nome").value;
    const sobrenome = document.querySelector("#sobrenome").value;
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const confirmarSenha = document.querySelector("#confirmarSenha").value;

    // VALIDAR SENHAS
    if (senha !== confirmarSenha) {

        alert("As senhas não coincidem!");
        return;

    }

    try {

        const response = await fetch("http://localhost:8080/usuario/cadastro", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome,
                sobrenome,
                email,
                senha
            })

        });

        const data = await response.json();

        if (response.ok && data.id) {

            alert("Cadastro realizado com sucesso!");

            window.location.href = "login.html";

        } else {

            alert("Erro ao cadastrar");

        }

    } catch (error) {

        console.error(error);

        alert("Erro ao conectar com o servidor");

    }

});