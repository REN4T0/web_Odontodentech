// Imports
import Consultas from "../api/Consultas.js";

// Eventos clicáveis da página
document.addEventListener("click", async evento => {

    const elemento = evento.target;

    if (elemento.classList.contains("filter-button")) await buscarConsultas(elemento.value);


});

async function buscarConsultas(servico) {
    
    try {

        // Seleciona a data para filtrar a pesquisa
        const data = document.querySelector(".barra-pesquisa-data").value;

        // Verificação da data
        if (!data) return alert("Selecione a data e o serviço para buscar horários disponíveis de consulta.");

        const consultas = new Consultas();

        // Token para autenticação
        const token = localStorage.getItem("token");

        // Buscar consultas...
        const resultado = await consultas.buscar(token, '', '', '', data, 'disponivel', servico);

        if (resultado.status === 'error') return alert(resultado.msg);

        // Gerando os cards
        gerarCardsConsultas(resultado.dados);

        

    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro inesperado! Tente novamente mais tarde...");
    }
}

function gerarCardsConsultas(consultas) {

    const divCards = document.querySelector(".div-cards-consultas");

    for (let consulta of consultas) {

        const card = document.createElement("div");
        card.classList.add("cards");

        divCards.appendChild(card);

    }

    // Caso encontre as consultas, realiza uma rolagem de tela até a sessão de cards
    divCards.scrollIntoView({ behavior: "smooth" });

}