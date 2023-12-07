import Consultas from '../api/Consultas.js';
import Servicos from '../api/Servicos.js';

document.addEventListener("click", async evento => {

    const elemento = evento.target;

    if (elemento.classList.contains("filter-button")) {

        let status;

        // Verificando o status de pesquisa
        if (elemento.textContent.trim() === 'Agendados') {
            status = 'agendado';
        } else if (elemento.textContent.trim() === 'Realizados') {
            status = 'finalizado'
        } else if (elemento.textContent.trim() === 'Cancelados'){
            status = 'cancelado'
        }

        const idUsuario = localStorage.getItem("idUsuario");
        const token = localStorage.getItem("token");
   
        // Buscando as consultas
        await buscarConsultas(idUsuario, token, status)

    }

    if (elemento.classList.contains("btn-ver-consulta")) {

        await exibirConsultaEspecifica(elemento.value);

    }

    if (elemento.classList.contains("btn-cancelar-consulta")){

        const confirma = confirm("Tem certeza de que deseja cancelar o agendamento?");

        const idServico = elemento.getAttribute("data-idServico");

        if (confirma === true) await cancelarConsulta(elemento.value, idServico);

    }

    if (elemento.classList.contains("btn-voltar")) {

        const modalConsulta = document.querySelector(".fundo-modal");
        modalConsulta.style.display = 'none'
        document.body.style.overflow = 'auto';

    }

});

async function buscarConsultas(idUsuario, token, status) {

    try {

        const consultas = new Consultas();

        const resultado = await consultas.buscar(token, '', idUsuario, '', '', status, '');

        if (resultado.status === 'error') return alert(resultado.msg);

        console.log(resultado)

        await gerarCardsConsultas(resultado.dados, token);
        
    } catch (error) {
        console.error(error);
        alert("Um erro inesperado aconteceu. Tente novamente mais tarde...");
    }

}

async function gerarCardsConsultas(consultas, token) {

    const divCards = document.querySelector(".div-exibir-minhas-consultas");

    divCards.innerHTML = "";

    // Ordenando por data
    consultas.sort(function(a, b) {
        // Convertendo as strings de data para objetos Date antes de comparar
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);
        
        return dataA - dataB;
    });
    
    // Objeto serviços para buscar os serviços associados
    const servicos = new Servicos();

    for (let consulta of consultas) {

        const servicoConsulta = await servicos.buscar(consulta.idServico, token);

        console.log(servicoConsulta);

        const card = document.createElement("div");
        card.classList.add("cards");

        if (consulta.status === 'cancelado') {
            card.classList.remove("cards");
            card.classList.add("cards-inativo");
        }

        // Titulo
        const tituloCard = document.createElement("h1");
        tituloCard.classList.add("titulo-card");
        tituloCard.textContent = `${servicoConsulta.dados.nomeServico}`;
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

        // Botão de visualizar
        const btnVisualizar = document.createElement("button");
        btnVisualizar.classList.add("btn-ver-consulta");
        btnVisualizar.textContent = "Visualizar"
        btnVisualizar.value = consulta._id;
        btnVisualizar.setAttribute("data-idServico", consulta.idServico);
        divBtn.appendChild(btnVisualizar);

        if (consulta.status === 'agendado'){

            // Botão de Cancelar
            const btnCancelar = document.createElement("button");
            btnCancelar.classList.add("btn-cancelar-consulta");
            btnCancelar.textContent = "Cancelar"
            btnCancelar.value = consulta._id;
            btnCancelar.setAttribute("data-idServico", consulta.idServico);
            divBtn.appendChild(btnCancelar);

        }

        card.appendChild(divBtn)
        divCards.appendChild(card);

    }

    // Caso encontre as consultas, realiza uma rolagem de tela até a sessão de cards
    divCards.scrollIntoView({ behavior: "smooth" });

}

async function exibirConsultaEspecifica(idConsulta) {

    try {

        const consultas = new Consultas();
        const servicos = new Servicos();

        const token = localStorage.getItem("token");

        // Buscando a consulta
        const resultado = await consultas.buscar(token, idConsulta, '', '', '', '', '');

        if(resultado.status === 'error') return alert(resultado.msg);

        // Buscando o serviço
        const reqServico = await servicos.buscar(resultado.dados[0].idServico, token);

        if(reqServico.status === 'error') return alert(resultado.msg);

        // Alterando a exibição do modal
        const modalConsulta = document.querySelector(".fundo-modal");
        modalConsulta.style.display = 'flex';
        document.body.style.overflow = 'hidden';

    
        const [ano, mes, dia] = resultado.dados[0].data.split('-');
        const horario = resultado.dados[0].horario;

        document.querySelector(".titulo-modal-consulta").textContent = `${reqServico.dados.nomeServico}`;
        document.querySelector(".data-modal-consulta").textContent = `${dia}/${mes}/${ano}   ${horario}`;
        document.querySelector(".preco-modal-consulta").textContent = `R$:${reqServico.dados.preco.toFixed(2)}`;
        document.querySelector(".descricao-modal-consulta").textContent = `${reqServico.dados.descricao}`;


        
    } catch (error) {
        console.error(error);
        return alert("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde...");
    }

}

async function cancelarConsulta(idConsulta, idServico) {

    try {

        const idUsuario = localStorage.getItem("idUsuario");

        const consultas = new Consultas('', '', '', '', idUsuario, idServico);

        const token = localStorage.getItem("token");

        const cancelamento = await consultas.alterarStatus(token, idConsulta, "cancelado");

        alert(cancelamento.msg);

        location.reload();

    } catch (error) {
        console.error(error);
        return alert("Algum erro inesperado ocorreu. Tente novamente mais tarde...");
    }

}