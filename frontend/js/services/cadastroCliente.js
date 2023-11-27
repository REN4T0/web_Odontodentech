// Classe de clientes para administrar os dados e requisiçãoes do cliente
import Clientes from '../api/Clientes.js'

const form = document.querySelector(".cad-form");

// Parando o evento do formulário para pegar os dados de cadastro
form.addEventListener('submit', async (evento) => {

    evento.preventDefault();

    try {

        const nome = document.querySelector(".nome").value;
        const sobrenome = document.querySelector(".sobrenome").value;
        const email = document.querySelector(".email").value;
        const senha = document.querySelector(".senha").value;
        const repetirSenha = document.querySelector(".repetir-senha").value;

        if (senha !== repetirSenha) throw new Error("As senhas não conferem!");

        console.log("RENATO")
        
        const cliente = new Clientes(nome, sobrenome, email, senha);

        const resultado = await cliente.cadastrar();


        alert(resultado.msg);

    } catch (error) {
        console.error(error);
    }

});