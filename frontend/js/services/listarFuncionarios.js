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

// Modal
const modalCadastro = document.querySelector(".modal-cad-func");

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