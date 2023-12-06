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

        console.log(resultado);

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

        // Titulo
        const tituloCard = document.createElement("h1");
        tituloCard.classList.add("titulo-card");
        tituloCard.textContent = `${consulta.idServico}`;
        card.appendChild(tituloCard);

        // Data
        const pData = document.createElement("p");
        pData.textContent = consulta.data;
        card.appendChild(pData);

        // Hora
        const pHorario = document.createElement("p");
        pHorario.textContent = consulta.horario;
        card.appendChild(pHorario);

        const divBtn = document.createElement("div");
        divBtn.classList.add("div-card-btn");

        // Botão de agendar
        const btnAgendar = document.createElement("button");
        btnAgendar.classList.add("btn-agendar-consulta");
        btnAgendar.classList.add("button");
        btnAgendar.textContent = "Agendar"
        btnAgendar.value = consulta._id;
        divBtn.appendChild(btnAgendar)

        card.appendChild(divBtn)
        divCards.appendChild(card);

    }

    // Caso encontre as consultas, realiza uma rolagem de tela até a sessão de cards
    divCards.scrollIntoView({ behavior: "smooth" });

}