import Consultas from "../api/Consultas.js"
import Funcionarios from "../api/Funcionarios.js"
import Servicos from "../api/Servicos.js"

// Botão para gerar o relatório
const btnGerarRelatorio = document.querySelector(".btn-buscar-relatorio");
btnGerarRelatorio.addEventListener('click', async () => {

    const data = document.querySelector(".barra-pesquisa-data").value;

    if (!data) return alert("Selecione a data para gerar o relatório...");

    const token = localStorage.getItem("token");

    // Buscando os dados para exibir no relatório
    const dados = await relatorio(token, data);





});

async function relatorio(token, periodo) {

    const consultas = new Consultas();

    try {

        // Buscando as consultas e os dados atrelados a eles
        const requestConsulta = await consultas.buscar(token, '', '', '', periodo);

        if (requestConsulta.status === 'error') alert("Nenhum registro encontrado.");

        console.log(requestConsulta);

        await gerarTabela(requestConsulta.dados);


    } catch (error) {
        console.error(error);
        return alert("Um erro inesperado ocorreu. Por favor, Tente novamente mais tarde...");
    }

}

async function gerarTabela(dadosConsulta) {

    const funcionarios = new Funcionarios();
    const servicos = new Servicos();

    const tabela = document.querySelector(".corpo-tabela");
    tabela.innerHTML = "";

    for (let consulta of dadosConsulta){

        

        const linha = document.createElement("tr");
        const colunaAgendamento = document.createElement("td");
        const colunaDentista = document.createElement("td");
        const colunaServico = document.createElement("td");
        const colunaPreco = document.createElement("td");
        const colunaStatus = document.createElement("td");


        linha.appendChild(colunaAgendamento);
        linha.appendChild(colunaDentista);
        linha.appendChild(colunaServico);
        linha.appendChild(colunaPreco);
        linha.appendChild(colunaStatus);

        tabela.appendChild(linha);

    }


}