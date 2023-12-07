import login from '../modules/login.js';
import Funcionarios from '../api/Funcionarios.js'


/*
    ------------------------------------------------------------------------------------------------
                                        EVENTOS 
    ------------------------------------------------------------------------------------------------
*/

const form = document.querySelector(".login-form");
const formSenha = document.querySelector('.form-redefinir-senha');
const titulo = document.querySelector('.login-titulo');
const btnVoltar = document.querySelector('.btn-voltar-form-login');

// Pegando o input de e-mail para verificar se é o primeiro acesso do funcionário
const inputEmail = document.querySelector('.email');
inputEmail.addEventListener('blur', async () => {

    const dados = {
        email: inputEmail.value,
        senha: '123'
    };

    const resultado = await login(dados);

    // Caso seja o primeiro acesso de um funcionário
    
    if(resultado.msg === "Altere sua senha") {
        alert(resultado.msg);

        // Sumindo com o formulário principal e colocando o formulário de cadastro de nova senha
        form.style.display = "none";
        formSenha.style.display = "flex";
        titulo.textContent = 'Altere sua senha'

        // Guardando o token e id no armazenamento local pois somente ele pode fazer com que a senha seja alterada.
        localStorage.setItem('token', resultado.token);        
        localStorage.setItem('id', resultado.dados.id);        
    } 

});

// Botão de voltar para fechar o formulário de senha
btnVoltar.addEventListener('click', () => {
    // Trocando a visibilidade dos formulários
    form.style.display = "flex";
    formSenha.style.display = "none";
    titulo.textContent = 'Login'
});


/*
    ------------------------------------------------------------------------------------------------
                                        EFETUAR LOGIN 
    ------------------------------------------------------------------------------------------------
*/
form.addEventListener('submit', async evento => {

    console.log('teste');

    // Pausando o evento de enviar o formulário
    evento.preventDefault();

    // Dados do formulário
    const dados = {
        email: document.querySelector('.email').value,
        senha: document.querySelector('.senha').value
    };

    const resultado = await login(dados);

    // Em casos de erro da requisição
    if (resultado === false) alert("Ocorreu um erro inesperado! Tente novamente mais tarde...");

    if (resultado.status === 'success') {

        alert(resultado.msg);

        localStorage.clear();

        localStorage.setItem('nome', resultado.dados.nome);
        localStorage.setItem('sobrenome', resultado.dados.sobrenome);
        localStorage.setItem('email', resultado.dados.email);
        localStorage.setItem('cargo', resultado.dados.cargo);
        localStorage.setItem('idUsuario', resultado.dados.id);
        localStorage.setItem('token', resultado.token);
        
        // Falta redirecionar para alguma página que ainda não foi feita
    }

});

/*
    ------------------------------------------------------------------------------------------------
                                    CADASTRAR NOVA SENHA
    ------------------------------------------------------------------------------------------------
*/
formSenha.addEventListener('submit', async evento => {

    evento.preventDefault();

    const senha = document.querySelector('.nova-senha').value;
    const repetirSenha = document.querySelector('.repetir-nova-senha').value;

    if (senha !== repetirSenha) return alert("As senhas não conferem.");

    // Valores do localstorage para usar como parâmetro da alteração de senha
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');

    // Método para alterar a senha
    const funcionario = new Funcionarios();

    const resultado = await funcionario.alterarSenha(id, token, senha);

    // Tratando possíveis erros
    if (resultado === false) return alert("Ocorreu algum erro inesperado! Tente novamente mais tarde...");

    alert(resultado.msg);

    if(resultado.status === 'success') {

        // Limpando o localStorage
        localStorage.clear();

        // Trocando a visibilidade dos formulários
        form.style.display = "flex";
        formSenha.style.display = "none";
        titulo.textContent = 'Login'

    }

});

/*
    ------------------------------------------------------------------------------------------------
                                    VISUALIZAÇÃO DE SENHAS
    ------------------------------------------------------------------------------------------------
*/

// Parando o evento de colar na parte de repetir senha
const repetirSenha = document.querySelector(".repetir-nova-senha");
repetirSenha.addEventListener('paste', (evento) => evento.preventDefault());

// Lógica de mostrar e esconde a senha
const imgSenha = document.querySelector('.img-olho-senha-login-user');
const imgNovaSenha = document.querySelector('.img-olho-nova-senha-login-user');
const imgRepetirSenha = document.querySelector('.img-olho-repetir-senha-login-user')

imgSenha.addEventListener('click', () => {

    const valor = imgSenha.dataset.valor;

    
    if (valor === "mostrar") {

        imgSenha.dataset.valor = "esconder";

        // Convertendo para caminho absoluto
        const caminhoAbsoluto = new URL("frontend/images/icons/eye-slash-fill.svg", window.location.origin).href;

        imgSenha.src = caminhoAbsoluto;

        const inputSenha = document.querySelector('.senha');

        inputSenha.type = 'text'

    } else {

        imgSenha.dataset.valor = "mostrar";

        // Convertendo para caminho absoluto
        const caminhoAbsoluto = new URL("frontend/images/icons/eye-fill.svg", window.location.origin).href;

        imgSenha.src = caminhoAbsoluto

        const inputSenha = document.querySelector('.senha');

        inputSenha.type = 'password'

    }

    

});

imgNovaSenha.addEventListener('click', () => {

    const valor = imgNovaSenha.dataset.valor;

    
    if (valor === "mostrar") {

        imgNovaSenha.dataset.valor = "esconder";

        // Convertendo para caminho absoluto
        const caminhoAbsoluto = new URL("frontend/images/icons/eye-slash-fill.svg", window.location.origin).href;

        imgNovaSenha.src = caminhoAbsoluto;

        const inputSenha = document.querySelector('.nova-senha');

        inputSenha.type = 'text'

    } else {

        imgNovaSenha.dataset.valor = "mostrar";

        // Convertendo para caminho absoluto
        const caminhoAbsoluto = new URL("frontend/images/icons/eye-fill.svg", window.location.origin).href;

        imgNovaSenha.src = caminhoAbsoluto

        const inputSenha = document.querySelector('.nova-senha');

        inputSenha.type = 'password'

    }

    

});

imgRepetirSenha.addEventListener('click', () => {

    const valor = imgRepetirSenha.dataset.valor;
    

    if (valor === "mostrar") {

        imgRepetirSenha.dataset.valor = "esconder"

        // Caminho relativo
        const caminhoRelativo = "frontend/images/icons/eye-slash-fill.svg";

        // Convertendo para caminho absoluto
        const caminhoAbsoluto = new URL(caminhoRelativo, window.location.origin).href;

        imgRepetirSenha.src = caminhoAbsoluto

        const inputSenha = document.querySelector('.repetir-nova-senha');

        inputSenha.type = 'text'


    } else {

        imgRepetirSenha.dataset.valor = "mostrar"

        // Caminho relativo
        const caminhoRelativo = "frontend/images/icons/eye-fill.svg";

        // Convertendo para caminho absoluto
        const caminhoAbsoluto = new URL(caminhoRelativo, window.location.origin).href;

        imgRepetirSenha.src = caminhoAbsoluto

        const inputSenha = document.querySelector('.repetir-nova-senha');

        inputSenha.type = 'password'

    }

    

});