// Falta redirecionar para alguma página que ainda não foi feita
const form = document.querySelector(".login-form");

form.addEventListener('submit', async evento => {

    // Pausando o evento de enviar o formulário
    evento.preventDefault();

    // Dados do formulário
    const dados = {
        email: document.querySelector('.email').value,
        senha: document.querySelector('.senha').value
    };

    const resultado = await login(dados);

    console.log(resultado)

    // Em casos de erro da requisição
    if (resultado === false) alert("Ocorreu um erro inesperado! Tente novamente mais tarde...");

    if (resultado.status === "error") {

        alert(resultado.msg);

    } else if (resultado.status === 'success') {

        alert(resultado.msg);

        localStorage.setItem('nome', resultado.dados.nome);
        localStorage.setItem('sobrenome', resultado.dados.sobrenome);
        localStorage.setItem('email', resultado.dados.email);
        localStorage.setItem('idUsuario', resultado.dados.id);

        // Falta redirecionar para alguma página que ainda não foi feita
    }

});

async function login(obj) {
    try {

        const req = await fetch(`https://dentech-api.vercel.app/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        const res = await req.json();

        return res;
        
    } catch (error) {
        console.error(error)
        return false;
    }
}

// Lógica de mostrar e esconde a senha
const imgSenha = document.querySelector('.img-olho-senha-login-user');

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