// Imports
import Consultas from "../api/Consultas.js";

// Eventos clicáveis da página
document.addEventListener("click", async evento => {

    const elemento = evento.target;

    

    // Buscar e exibir as consultas
    if (elemento.classList.contains("filter-button")) await buscarConsultas(elemento.value, elemento.textContent);

    // Agendar a consulta
    if (elemento.classList.contains("btn-agendar-consulta")) await agendarConsulta(elemento.value, elemento.getAttribute('data-idServico'));


});

async function buscarConsultas(servico, nomeServico) {
    
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
        gerarCardsConsultas(resultado.dados, nomeServico);

        

    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro inesperado! Tente novamente mais tarde...");
    }
}

function gerarCardsConsultas(consultas, nomeServico) {

    const divCards = document.querySelector(".div-cards-consultas");

    divCards.innerHTML = "";

    // Ordenando por data
    consultas.sort(function(a, b) {
        // Convertendo as strings de data para objetos Date antes de comparar
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);
        
        return dataA - dataB;
    });

    for (let consulta of consultas) {

        const card = document.createElement("div");
        card.classList.add("cards");

        // Titulo
        const tituloCard = document.createElement("h1");
        tituloCard.classList.add("titulo-card");
        tituloCard.textContent = `${nomeServico}`;
        card.appendChild(tituloCard);

        // Modificando a data
        const [ano, mes, dia] = consulta.data.split('-');

        // Data
        const pData = document.createElement("p");
        pData.textContent = `Data: ${dia}/${mes}/${ano}`;
        card.appendChild(pData);

        // Hora
        const pHorario = document.createElement("p");
        pHorario.textContent = `Horário: ${consulta.horario}`;
        card.appendChild(pHorario);

        const divBtn = document.createElement("div");
        divBtn.classList.add("div-card-btn");

        // Botão de agendar
        const btnAgendar = document.createElement("button");
        btnAgendar.classList.add("btn-agendar-consulta");
        btnAgendar.textContent = "Agendar"
        btnAgendar.value = consulta._id;
        btnAgendar.setAttribute("data-idServico", consulta.idServico);
        divBtn.appendChild(btnAgendar)

        card.appendChild(divBtn)
        divCards.appendChild(card);

    }

    // Caso encontre as consultas, realiza uma rolagem de tela até a sessão de cards
    divCards.scrollIntoView({ behavior: "smooth" });

}

async function agendarConsulta(id, idServico) {

    const token = localStorage.getItem("token");
    const idUsuario = localStorage.getItem("idUsuario");

    const consulta = new Consultas('', '', '', '', idUsuario, idServico);

    try {

        const resultado = await consulta.alterarStatus(token, id, "agendado");

        if (resultado.status === 'success') {

            alert("Agendamento realizado com sucesso.");
            location.reload();

        } else {
            alert(resultado.msg);
        }
        
    } catch (error) {
        console.error(error);
        return alert("Um erro inesperado ocorreu, tente novamente mais tarde...")
    }

}