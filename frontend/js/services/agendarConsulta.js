// Imports
import Consultas from "../api/Consultas.js";

// Eventos clicáveis da página
document.addEventListener("click", async evento => {

    const elemento = evento.target;

    if (elemento.classList.contains("pesquisa-data")) {

        const [ano, mes] = document.querySelector(".barra-pesquisa-data").value.split('-');

        const consultas = new Consultas();

        const token = localStorage.getItem("token");

        const resultado = await consultas.buscar(token, null, null, null, null, null);

        console.log(resultado);

    }

});