const form = document.getElementById("loginForm");
const erro = document.getElementById("erro");
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");


togglePassword.addEventListener("click", function () {
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    
    this.textContent = type === "password" ? "👁️" : "🙈";
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://projeto-cliente-production.up.railway.app/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            erro.textContent = data.mensagem;
            return;
        }

        localStorage.setItem("token", data.token);
        window.location.href = "dashboard.html";

    } catch (error) {
        erro.textContent = "Erro ao conectar com o servidor";
    }
});