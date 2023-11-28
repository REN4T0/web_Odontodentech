// caminho para a pasta pages
let pagesFolderRoute = "/frontend/pages/";


function rotas(navegar){
    switch(navegar){
        case "home":
            window.location.href = "/index.html";
            break;
        case "consultas":
            window.location.href = `${pagesFolderRoute}consultas.html`;
            break;
        case "sobre":
            window.location.href = `${pagesFolderRoute}sobre.html`;
            break;
        case "cadastro":
            window.location.href = `${pagesFolderRoute}cadastroCliente.html`;
            break;
        default:
            alert("ERRO - O redirecionamento não encontrou a página que você quer acessar. Desculpe o transtorno.")
    }
}