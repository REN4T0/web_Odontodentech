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
botaoAbrirModalCadastro.addEventListener('click', () => divModalcadastro.style.display = "flex");

// Fechando modal
btnFecharModalCadastro.addEventListener("click", () => divModalcadastro.style.display = "none");

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
botaoAbrirModalEditar.addEventListener('click', () => modalEditar.style.display = "flex");

// Fechando modal
btnFecharModalEditar.addEventListener("click", () => modalEditar.style.display = "none");