// Classe de clientes para administrar os dados e requisiçãoes do cliente
import Clientes from '../api/Clientes.js'

const form = document.querySelector(".cad-form");

// Parando o evento do formulário para pegar os dados de cadastro
form.addEventListener('submit', async (evento) => {

    evento.preventDefault();

    try {

        // Dados do formulário
        const nome = document.querySelector(".nome").value.trim();
        const sobrenome = document.querySelector(".sobrenome").value.trim();
        const email = document.querySelector(".email").value.trim();
        const senha = document.querySelector(".senha").value.trim();
        const repetirSenha = document.querySelector(".repetir-senha").value.trim();

        // Verifcando a senhas.
        if (senha !== repetirSenha) throw new Error("As senhas não conferem!");
        
        // Instaciando um objeto com os dados e os métodos do cliente.
        const cliente = new Clientes(nome, sobrenome, email, senha);

        // Verificando o resultado do cadastro.
        const resultado = await cliente.cadastrar();

        // Caso de erro no cadastro.
        if (resultado.status === 'error') throw new Error(resultado.msg);

        alert(resultado.msg);

        window.location.href = '../../pages/login.html';

    } catch (error) {
        console.error(error);
        alert(error);
    }

});

// Parando o evento de colar na parte de repetir senha
const repetirSenha = document.querySelector(".repetir-senha");
repetirSenha.addEventListener('paste', (evento) => evento.preventDefault());

// Lógica de mostrar e esconde a senha
const imgSenha = document.querySelector('.img-olho-senha-cad-user');
const imgRepetirSenha = document.querySelector('.img-olho-repetir-senha-cad-user')

imgSenha.addEventListener('click', () => {

    const valor = imgSenha.dataset.valor;
    

    if (valor === "mostrar") {

        imgSenha.dataset.valor = "esconder"

        // Caminho relativo
        const caminhoRelativo = "frontend/images/icons/eye-slash-fill.svg";

        // Convertendo para caminho absoluto
        const caminhoAbsoluto = new URL(caminhoRelativo, window.location.origin).href;

        imgSenha.src = caminhoAbsoluto

        const inputSenha = document.querySelector('.senha');

        inputSenha.type = 'text'


    } else {

        imgSenha.dataset.valor = "mostrar"

        // Caminho relativo
        const caminhoRelativo = "frontend/images/icons/eye-fill.svg";

        // Convertendo para caminho absoluto
        const caminhoAbsoluto = new URL(caminhoRelativo, window.location.origin).href;

        imgSenha.src = caminhoAbsoluto

        const inputSenha = document.querySelector('.senha');

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

        const inputSenha = document.querySelector('.repetir-senha');

        inputSenha.type = 'text'


    } else {

        imgRepetirSenha.dataset.valor = "mostrar"

        // Caminho relativo
        const caminhoRelativo = "frontend/images/icons/eye-fill.svg";

        // Convertendo para caminho absoluto
        const caminhoAbsoluto = new URL(caminhoRelativo, window.location.origin).href;

        imgRepetirSenha.src = caminhoAbsoluto

        const inputSenha = document.querySelector('.repetir-senha');

        inputSenha.type = 'password'

    }

    

});