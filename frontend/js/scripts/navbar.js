// Código do menu de navegação
const hamburguer = document.querySelector('.hamburguer');

const nav = document.querySelector('.nav');

hamburguer.addEventListener("click", () => {
    nav.classList.toggle('active')
});

// Adicionando a opção de sair caso a pessoa esteja logada
window.addEventListener("load", () => {

    const token = localStorage.getItem("token");

    // Verifição de login
    if (token !== null && token !== "" && token !== undefined) {

        console.log("Teste")

        // Verificação de cargo para saber qual navbar será exibida
        const cargo = localStorage.getItem("cargo");
        console.log(cargo);

        if (cargo === "adm") {

            const navbars = document.querySelector(".nav-padrao");

            navbars.style.display = "none"

            const navAdm = document.querySelector(".nav-adm");
            navAdm.style.display = "flex";

        } else if (cargo == "dentista" || "assistente") {

            const navbars = document.querySelector(".nav-padrao");

            navbars.style.display = "none"

            const navFunc = document.querySelector(".nav-func");
            navFunc.style.display = "flex";

        } else {

            const navbars = document.querySelector(".nav-padrao");

            navbars.style.display = "none"

            const navCli = document.querySelector(".nav-cliente");
            navCli.style.display = "flex";
            
        }

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

        const navbars = document.querySelectorAll(".nav-list");

        for (let i = 0; i < navbars.length; i++) {
            navbars[i].style.display = "none";
        }

        const navPadrao = document.querySelector(".nav-padrao");
        navPadrao.style.display = "flex";

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