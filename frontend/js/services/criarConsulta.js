import Consultas from "../api/Consultas.js";
import { gerarCardCons } from "../modules/gerarCardCons.js";
import Funcionarios from "../api/Funcionarios.js";
import Servicos from "../api/Servicos.js";

/*
    -----------------------------------------------------------------------------------------------------
                                PUXANDO SERVIÇOS, DENTISTAS E CONSULTAS
    -----------------------------------------------------------------------------------------------------
*/

// Puxando consultas
async function puxarCons(token, status){
    const consulta = new Consultas("", "", "", "", "", "");
    const resultado = await consulta.buscar(token, "", "", "", "", status, "");

    if(resultado.status == "error") return alert(resultado.msg);
    
    const dados = resultado.dados;
    return dados;
}



// Puxando funcionários
async function puxarFunc(token){
    const funcionario = new Funcionarios();
    const resultado = await funcionario.buscar(token); //Realizando a Requisição para buscar os funcionários
    
    if(resultado.status == "error") return alert(resultado.msg);
    
    // Coletando os dados e filtrando pelos dentistas
    const dados = resultado.dados;
    const filtro = dados.filter((indice) => {
        return indice.cargo == "dentista";
    });
    
    return filtro;
}



// Puxando serviços
async function puxarServ(token){
    const servicos = new Servicos();
    const resultado = await servicos.buscar("", token);
    
    if(resultado.status == "error") return alert(resultado.msg);
    
    const dados = resultado.dados;
    return dados;
}



// Função para inserir os options nos select
function gerarOption(dentistArray, servicosArray){
    // Selecionando os selects
    const selectDentista = document.querySelector("#profissional");
    const selectServico = document.querySelector("#servico");
    
    // Looping que vai inserir os options do dentista
    for(let dentista of dentistArray){
        let option = document.createElement("option");
        
        // Adicionando as informações do option
        option.textContent = `${dentista.nome}`
        option.setAttribute("value", `${dentista._id}`);
        
        // Inserindo o option
        selectDentista.appendChild(option);
    }

    // Looping que vai inserir os options do serviço
    for(let servicos of servicosArray){
        let option = document.createElement("option");

        option.textContent = `${servicos.nomeServico}`;
        option.setAttribute("value", `${servicos._id}`)

        selectServico.appendChild(option);
    }
}



// Chamando as funções acima quando a tela carregar
window.addEventListener("load", async () => {
    // Coletando o token de autenticação
    const autorizacao = localStorage.getItem("token");
    const sectionCard = document.querySelector(".criaConsulta-container")

    const consulta = await puxarCons(autorizacao, "disponivel");
    const dentista = await puxarFunc(autorizacao);
    const servicos = await puxarServ(autorizacao);

    gerarCardCons(autorizacao, consulta, sectionCard);
    gerarOption(dentista, servicos);
});

/*
    -----------------------------------------------------------------------------------------------------
                                            CRIAÇÃO DE CONSULTAS
    -----------------------------------------------------------------------------------------------------
*/

const modal = document.querySelector(".modal") // Selecionando o Modal

async function criarConsulta(token){
    const dentista = modal.querySelector("#profissional").value;
    const servico = modal.querySelector("#servico").value;
    const datahora = modal.querySelector("#datetime").value;
    
    const data = datahora.substr(0,10);
    const hora = datahora.substr(11)
    
    console.log(dentista, servico, data, hora);
    
    console.log
    
    const consulta = new Consultas(data, hora, dentista, "", "", servico)
    const novaConsulta = await consulta.criar(token);
    
    return novaConsulta;
}

/*
    -----------------------------------------------------------------------------------------------------
                                    ORGANIZADOR DOS EVENTOS DE CLIQUE
    -----------------------------------------------------------------------------------------------------
*/

document.addEventListener("click", async evento => {
    const token = localStorage.getItem("token"); // Coletando o token
    const elemento = evento.target; // Elemento clicado é selecionado
    const sectionCard = document.querySelector(".criaConsulta-container"); // Selecionando o elemento onde irão aparecer os cards
    
    // Condição para verificar a classe do elemento clicado
    if(elemento.classList.contains("criar-consulta")){
        const resultado = await criarConsulta(token); // Função caso a classe seja a especificada acima ;)
        
        alert(resultado.msg);
        if(resultado.status === "success") window.location.reload();
    }

    else if(elemento.classList.contains("finalizado")){
        const consulta = await puxarCons(token, "finalizado"); // Vai puxar apenas as consultas finalizadas
        gerarCardCons(token, consulta, sectionCard); // Vai chamar a função que vai gerar os cards
    }

    else if(elemento.classList.contains("agendado")){
        const consulta = await puxarCons(token, "agendado"); // Vai puxar apenas as consultas agendadas
        gerarCardCons(token, consulta, sectionCard);
    }

    else if(elemento.classList.contains("cancelado")){
        const consulta = await puxarCons(token, "cancelado"); // Vai puxar apenas as consultas agendadas
        gerarCardCons(token, consulta, sectionCard);
    }
    
    else if(elemento.classList.contains("disponivel")){
        const consulta = await puxarCons(token, "disponivel"); // Vai puxar apenas as consultas agendadas
        gerarCardCons(token, consulta, sectionCard);
    }

    // Estou escutando "Surrender" dos Cheap Trick agora, ás 23:49 de uma terça-feira
});