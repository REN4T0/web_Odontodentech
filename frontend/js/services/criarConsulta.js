import Consultas from "../api/Consultas.js";
import Funcionarios from "../api/Funcionarios.js";

// Puxando funcionários
window.addEventListener("load", async () => {
    // Coletando o token de autenticação
    const token = localStorage.getItem("token");

    const funcionario = new Funcionarios();
    const resultado = await funcionario.buscar(token); //Realisando a Requisição para buscar os funcionários

    if(resultado.status == "error") return alert(resultado.msg);

    // Coletando os dados e filtrando pelos dentistas
    const dados = resultado.dados;
    const dentista = dados.filter((indice) => {
        return indice.cargo == "dentista";
    });

    gerarOption(dentista);
});



// Função para inserir os dentistas no input
function gerarOption(dados){
    // Selecionando o select
    const select = document.querySelector("#profissional");
    
    // Looping que vai inserir os options
    for (let dentista of dados){
        let option = document.createElement("option");
        
        // Adicionando as informações do option
        option.textContent = `${dentista.nome}`
        option.setAttribute("value", `${dentista._id}`);
        
        // Inserindo o option
        select.appendChild(option);
    }
}


// Puxando serviços