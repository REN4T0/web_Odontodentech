// Função para pegar o array de funcionários e gerar um card com elas
export default function (funcionarios) {

    // Limpando a área de exibição
    const divExibir = document.querySelector(".div-exibir-func");
    divExibir.innerHTML = "";

    if (funcionarios.length === 0) divExibir.innerHTML = `<h1 style="margin: 100px; color: red; font-size: 38px;" >Nenhum registro de funcionário encontrado.</h1>`

    // Gerando os cards

    for (let funcionario of funcionarios) {

        // Criando os elementos de exibição e adicionando as classes
        const divCardFunc = document.createElement('div');
        divCardFunc.classList.add("card-func");

        if (funcionario.status === "inativo") {
            divCardFunc.classList.remove("card-func");
            divCardFunc.classList.add("card-func-inativo");
        }


        const tituloCard = document.createElement('h1');
        tituloCard.classList.add("titulo-card-nome-func");
        tituloCard.textContent = `${funcionario.nome} ${funcionario.sobrenome}`;

        const pEmail = document.createElement('p');
        pEmail.classList.add("p-email-func");
        pEmail.textContent = `E-mail: ${funcionario.email}`;

        const pCargo = document.createElement('p');
        pCargo.classList.add("p-cargo-func");
        pCargo.textContent = `Cargo: ${funcionario.cargo}`;

        const pStatus = document.createElement('p');
        pStatus.classList.add("p-cargo-func");
        pStatus.textContent = `Status: ${funcionario.status}`;

        const divCardBotao = document.createElement('div');
        divCardBotao.classList.add("div-card-func-btn");

        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add("btn-modal-editar-func");
        botaoEditar.textContent = "Editar";
        botaoEditar.value = funcionario._id;

        const botaoDemitir = document.createElement('button');
        botaoDemitir.classList.add("btn-demitir-func");
        botaoDemitir.textContent = "Demitir";
        botaoDemitir.value = funcionario._id;

        // Montando a estrutura do card
        divCardBotao.appendChild(botaoEditar);
        divCardBotao.appendChild(botaoDemitir);

        divCardFunc.appendChild(tituloCard);
        divCardFunc.appendChild(pEmail);
        divCardFunc.appendChild(pCargo);
        divCardFunc.appendChild(pStatus);

        // Verificação do usuário onde ele não pode se editar ou demitir
        if (funcionario.status === "ativo" && funcionario._id !== localStorage.getItem("idUsuario")) divCardFunc.appendChild(divCardBotao);
        
        // Exibindo
        divExibir.appendChild(divCardFunc);

    };

};