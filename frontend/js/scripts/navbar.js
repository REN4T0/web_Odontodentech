// Código do menu de navegação
const hamburguer = document.querySelector('.hamburguer');

const nav = document.querySelector('.nav');

hamburguer.addEventListener("click", () => {
    nav.classList.toggle('active')
});

// Adicionando a opção de sair caso a pessoa esteja logada
window.addEventListener("load", () => {

    const token = localStorage.getItem("token");

    if (token) {

        const navList = document.querySelector(".nav-list");

        const list = document.createElement("li");

        const link = document.createElement("a");

        link.classList.add("nav-link");
        link.classList.add("link-sair");
        link.textContent = "Sair"

        list.appendChild(link);

        navList.appendChild(list);

        // Desaparecer os botões de login e cadastro
        const botoes = document.querySelector("#nav-button");
        botoes.style.display = "none";

    } else {
        const botoes = document.querySelector("#nav-button");
        botoes.style.display = "flex";
    }

});

document.addEventListener("click", async evento => {

    const elemento = evento.target;

    if (elemento.classList.contains("link-sair")){

        evento.preventDefault();

        const sair = confirm("Deseja realmente sair?");

        if (sair === true) {
            localStorage.clear();

            const botoes = document.querySelector("#nav-button");
            botoes.style.display = "flex";

            location.href = "/index.html";

        }

    }
});