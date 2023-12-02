import { alterarFiltro } from "../modules/alteraFiltroFunc.js";
import gerarCardsFunc from "../modules/gerarCardsFunc.js";
import Funcionarios from "../api/Funcionarios.js";
/*
    -----------------------------------------------------------------------------------------------------
                                            CARREGAR FUNCIONÁRIOS
    -----------------------------------------------------------------------------------------------------
*/
window.addEventListener("load", async () => {

    // Token para permissão de requisição
    const token = localStorage.getItem("token");

    const funcionario = new Funcionarios();

    // Requisição para buscar os dados dos funcionários
    const resultado = await funcionario.buscar(token);

    if (resultado.status === 'error') return alert(resultado.msg);

    // dados retornados
    const dados = resultado.dados;

    // Gerando os cards do funcionário.
    gerarCardsFunc(dados);

});

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

// // Botão para abrir modal
// const botaoAbrirModalEditar = document.querySelector(".btn-modal-editar-func");

// Botão para cancelar modal
const btnFecharModalEditar = document.querySelector(".btn-cancelar-editar-func");

// // Exibindo modal de editar funcionário
// botaoAbrirModalEditar.addEventListener('click', () => {
//     // Desabilitar o scroll da página
//     modalEditar.style.display = "flex";
//     document.body.style.overflow = 'hidden';

// })

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

    // Token para permissão de requisição
    const token = localStorage.getItem("token");

    const funcionario = new Funcionarios();

    // Requisição para buscar os dados dos funcionários
    const resultado = await funcionario.buscar(token);

    if (resultado.status === 'error') return alert(resultado.msg);


    // dados retornados
    const dados = resultado.dados;

    if (elemento.classList.contains("filtro-func")) {

        // Alterando filtro
        alterarFiltro(elemento);

        // Puxando os dados de acordo com o filtro
        if (elemento.textContent == "Todos") {

            // Gerando os cards do funcionário.
            gerarCardsFunc(dados);

        }

        if (elemento.textContent == "Ativos") {

            // Filtrando para ativos
            const ativos = dados.filter(dado => dado.status === 'ativo');

            // Gerando os cards do funcionário.
            gerarCardsFunc(ativos);
        }

        if (elemento.textContent == "Demitidos") {

            // Filtrando para ativos
            const inativos = dados.filter(dado => dado.status === 'inativo');

            // Gerando os cards do funcionário.
            gerarCardsFunc(inativos);
        }

    }

    if (elemento.classList.contains("btn-modal-editar-func")) {

        // Desabilitar o scroll da página
        modalEditar.style.display = "flex";
        document.body.style.overflow = 'hidden';

        document.querySelector(".modal-editar-func").addEventListener('submit', async evento => {
            
            evento.preventDefault();

            const cargo = document.querySelector("#cargo-func-edit").value;

            const edicao = await funcionario.editar(token, elemento.value, cargo);

            alert(edicao.msg);

            location.reload();

        });

    }

    if (elemento.classList.contains("btn-demitir-func")) {

        const verificacao = confirm("Tem certeza que deseja fazer isso?");

        if (verificacao) {
            const demitir = await funcionario.inativar(elemento.value, token);

            alert(demitir.msg);

            location.reload();
        }

    }

    if(elemento.classList.contains("btn-pesquisar-func")) {

        const nome = document.querySelector(".barra-pesquisa-func").value;

        const funcionario = new Funcionarios();

        const pesquisa = await funcionario.buscarNome(token, nome);

        console.log(pesquisa);

        gerarCardsFunc(pesquisa.dados);

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

    if (cadastro.status === 'success') window.location.reload();

});

/*
    -----------------------------------------------------------------------------------------------------
                                            FORMULÁRIO DE EDIÇÃO
    -----------------------------------------------------------------------------------------------------
*/