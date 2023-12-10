import Funcionarios from "../api/Funcionarios.js";
import Servicos from "../api/Servicos.js";

// Buncando o nome do serviço
async function buscarNomeServico(token, id){
    const servico = new Servicos();
    const resultado = await servico.buscar(id, token);

    if(resultado.status == "error") return alert(resultado.msg);
    
    return resultado.dados.nomeServico;
}



// Criando os elementos
export async function gerarCardCons(token, dados, elemento){
    elemento.innerText = ""; // Os elementos filhos deste elemento pai serão eliminados

    // Criando o loader depois de todos os elementos filhos desaparecerem - Essa explicação de
    const loader = document.createElement("div");
    loader.setAttribute("class", "loader");
    loader.style.display = "block";
    elemento.appendChild(loader)

    for(let dadosConsulta of dados){
        let nomeServico = await buscarNomeServico(token, dadosConsulta.idServico);

        let card = document.createElement("div");
        card.setAttribute("class", "cards")
        elemento.appendChild(card);

        if(dadosConsulta.status == "disponivel"){
            card.style.borderTopColor = "grey";
        }
        else if(dadosConsulta.status == "finalizado"){
            card.style.borderTopColor = "var(--verde)";
        }
        else if(dadosConsulta.status == "agendado"){
            card.style.borderTopColor = "var(--ciano)";
        }
        else{
            card.style.borderTopColor = "var(--vermelho)";
        }

        loader.style.display = "none"; // Retirando o loader após o card ser gerado

        let titulo = document.createElement("h3");
        titulo.setAttribute("class", "titulo-card");
        titulo.textContent = `${nomeServico}`;
        card.appendChild(titulo);

        let textoData = document.createElement("p");
        textoData.textContent = `${dadosConsulta.data}`;
        card.appendChild(textoData);
        
        let textoHora = document.createElement("p");
        textoHora.textContent = `${dadosConsulta.horario}`;
        card.appendChild(textoHora);

        let divBtn = document.createElement("div");
        divBtn.setAttribute("class", "div-card-btn");
        card.appendChild(divBtn);

        let botao = document.createElement("button");
        botao.textContent = "Visualizar";
        botao.setAttribute("class", "btn-modal-editar-func button");
        divBtn.appendChild(botao);

    }

}