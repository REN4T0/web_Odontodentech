import Consultas from "../api/Consultas.js"
import Funcionarios from "../api/Funcionarios.js"
import Servicos from "../api/Servicos.js"

// Botão para gerar o relatório
const btnGerarRelatorio = document.querySelector(".btn-buscar-relatorio");
btnGerarRelatorio.addEventListener('click', async () => {

    const tabelaRelatorio = document.querySelector(".tabela-relatorio");
    tabelaRelatorio.style.display = "none";

    const data = document.querySelector(".barra-pesquisa-data").value;

    if (!data) return alert("Selecione a data para gerar o relatório...");

    const loader = document.querySelector(".loader");
    loader.style.display = 'block'


    const token = localStorage.getItem("token");

    // Buscando os dados para exibir no relatório
    await relatorio(token, data);


});

async function relatorio(token, periodo) {

    const consultas = new Consultas();

    try {

        // Buscando as consultas e os dados atrelados a eles
        const requestConsulta = await consultas.buscar(token, '', '', '', periodo);

        if (requestConsulta.status === 'error') {
            const loader = document.querySelector(".loader");
            loader.style.display = 'none'
            return alert("Nenhum registro encontrado.");
        };

        await gerarTabela(requestConsulta.dados, token);


    } catch (error) {
        console.error(error);
        return alert("Um erro inesperado ocorreu. Por favor, Tente novamente mais tarde...");
    }

}

async function gerarTabela(dadosConsulta, token) {

    // dados de relatório
    let consultasAgendadas = 0;
    let consultasFinalizadas = 0;
    let consultasCanceladas = 0;
    let receita = 0

    const funcionarios = new Funcionarios();
    const servicos = new Servicos();

    const tabela = document.querySelector(".corpo-tabela");
    tabela.innerHTML = "";

    for (let consulta of dadosConsulta){

        const service = await servicos.buscar(consulta.idServico, token);
        const func = await funcionarios.buscarEspecifico(token, consulta.idDentista);

        if (consulta.status === 'agendado') consultasAgendadas++;
        if (consulta.status === 'cancelado') consultasCanceladas++;
        if (consulta.status === 'finalizado'){
            consultasFinalizadas++;
            receita += Number(service.dados.preco);
        } 

        console.log(service);
        console.log(func);

        // Pegando a data formatada
        const [ano, mes, dia] = consulta.data.split("-");

        

        const linha = document.createElement("tr");

        const colunaAgendamento = document.createElement("td");
        colunaAgendamento.textContent = `${dia}/${mes}/${ano} ${consulta.horario}`;

        const colunaDentista = document.createElement("td");
        colunaDentista.textContent = `${func.dados.nome}`;

        const colunaServico = document.createElement("td");
        colunaServico.textContent = `${service.dados.nomeServico}`;

        const colunaPreco = document.createElement("td");
        colunaPreco.textContent = `${service.dados.preco.toFixed(2)}`;

        const colunaStatus = document.createElement("td");
        colunaStatus.textContent = `${consulta.status}`;


        linha.appendChild(colunaAgendamento);
        linha.appendChild(colunaDentista);
        linha.appendChild(colunaServico);
        linha.appendChild(colunaPreco);
        linha.appendChild(colunaStatus);

        tabela.appendChild(linha);

    }

    const rodape = document.querySelector(".rodape-tabela");

    rodape.innerHTML = "";

    const pAgendado = document.createElement("p");
    pAgendado.classList.add(".p-relatorio");

    const pFinalizado = document.createElement("p");
    pFinalizado.classList.add(".p-relatorio");

    const pCancelado = document.createElement("p");
    pCancelado.classList.add(".p-relatorio");
    
    const pReceita = document.createElement("p");
    pReceita.classList.add(".p-relatorio");

    pAgendado.textContent = `Consultas agendadas: ${consultasAgendadas}`;
    pFinalizado.textContent = `Consultas finalizadas: ${consultasFinalizadas}`;
    pCancelado.textContent = `Consultas canceladas: ${consultasCanceladas}`;
    pReceita.textContent = `Receita: ${receita.toFixed(2)}`;

    rodape.appendChild(pAgendado);
    rodape.appendChild(pFinalizado);
    rodape.appendChild(pCancelado);
    rodape.appendChild(pReceita);

    const loader = document.querySelector(".loader");
    loader.style.display = 'none'

    const tabelaRelatorio = document.querySelector(".tabela-relatorio");
    tabelaRelatorio.style.display = "table";

}