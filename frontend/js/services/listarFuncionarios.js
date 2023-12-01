import { alterarFiltro } from "../modules/alteraFiltroFunc.js";
import Funcionarios from "../api/Funcionarios.js";
/*
    -----------------------------------------------------------------------------------------------------
                                            CARREGAR FUNCIONÁRIOS
    -----------------------------------------------------------------------------------------------------
*/
window.addEventListener("load", async () => {});

/*
    -----------------------------------------------------------------------------------------------------
                                            ANIMAÇÃO MODAL CADASTRO
    -----------------------------------------------------------------------------------------------------
*/

// Div modal
const divModalcadastro = document.querySelector(".div-modal-cad-func");

// Botão para abrir modal
const botaoAbrirModalCadastro = document.querySelector(".div-btn-cad-func");

// Botão para cancelar modal
const btnFecharModalCadastro = document.querySelector(".btn-cancelar-cadastro-func");

// Exibindo modal de cadastro
botaoAbrirModalCadastro.addEventListener('click', () => {
    // Desabilitar o scroll da página
    divModalcadastro.style.display = "flex";
    document.body.style.overflow = 'hidden';
});

// Fechando modal
btnFecharModalCadastro.addEventListener("click", () => {
    // Desabilitar o scroll da página
    divModalcadastro.style.display = "none";
    document.body.style.overflow = 'auto';
});

/*
    -----------------------------------------------------------------------------------------------------
                                            ANIMAÇÃO MODAL EDITAR
    -----------------------------------------------------------------------------------------------------
*/


// Modal
const modalEditar = document.querySelector(".div-modal-editar-func");

// Botão para abrir modal
const botaoAbrirModalEditar = document.querySelector(".btn-modal-editar-func");

// Botão para cancelar modal
const btnFecharModalEditar = document.querySelector(".btn-cancelar-editar-func");

// Exibindo modal de editar funcionário
botaoAbrirModalEditar.addEventListener('click', () => {
    // Desabilitar o scroll da página
    modalEditar.style.display = "flex";
    document.body.style.overflow = 'hidden';

})

// Fechando modal
btnFecharModalEditar.addEventListener("click", () => {

    modalEditar.style.display = "none"
    document.body.style.overflow = 'auto';

});

/*
    -----------------------------------------------------------------------------------------------------
                                            ANIMAÇÃO E FILTROS
    -----------------------------------------------------------------------------------------------------
*/
document.addEventListener('click', async evento => {

    // Selecionando um elemento HTML
    const elemento = evento.target;

    if (elemento.classList.contains("filtro-func")) {

        // Alterando filtro
        alterarFiltro(elemento);

        // Puxando os dados de acordo com o filtro
        if(elemento.textContent == "Todos") {
            console.log('TODOS')
        }

        if(elemento.textContent == "Ativos") {
            console.log('ATIVOS')
        }

        if(elemento.textContent == "Demitidos") {
            console.log('DEMITIDOS')
        }

    }

});

/*
    -----------------------------------------------------------------------------------------------------
                                            FORMULÁRIO DE CADASTRO
    -----------------------------------------------------------------------------------------------------
*/
const formCadastro = document.querySelector(".modal-cad-func");

// Pegando os ddados do formulário de cadastro
formCadastro.addEventListener("submit", async evento => {

    evento.preventDefault();

    
    const nome = formCadastro.querySelector("#nome-func").value;
    const sobrenome = formCadastro.querySelector("#sobrenome-func").value;
    const email = formCadastro.querySelector("#email-func").value;
    const cargo = formCadastro.querySelector("#cargo-func-cad").value;
    const status = "ativo"

    // Instânciando um novo funcionário para cadastrá-lo
    const funcionario = new Funcionarios(nome, sobrenome, cargo, status, email);

    // Token de autenticação necessário para cadastrar um novo funcionário.
    const token = localStorage.getItem("token");
    
    const cadastro = await funcionario.cadastrar(token);

    alert(cadastro.msg);

});


/*
    -----------------------------------------------------------------------------------------------------
                                            FORMULÁRIO DE EDIÇÃO
    -----------------------------------------------------------------------------------------------------
*/