// caminho para a pasta pages
let pagesFolderRoute = "/frontend/pages/";


function rotas(navegar){
    switch(navegar){
        case "home":
            window.location.href = "/index.html";
            break;
        case "consultas":
            window.location.href = `${pagesFolderRoute}consulta.html`;
            break;
        case "sobre":
            window.location.href = `${pagesFolderRoute}sobre.html`;
            break;
        case "cadastro":
            window.location.href = `${pagesFolderRoute}cadastroCliente.html`;
            break;
        case "login":
            window.location.href = `${pagesFolderRoute}login.html`;
            break;
        case "minhas consultas":
            window.location.href = `${pagesFolderRoute}minhasConsultas.html`;
            break;
        case "agendar consultas":
            window.location.href = `${pagesFolderRoute}agendarConsulta.html`;
            break;
        case "criar consulta":
            window.location.href = `${pagesFolderRoute}criarConsulta.html`;
            break;
        case "erro":
            window.location.href = `${pagesFolderRoute}erro.html`;
            break;
        case "listar funcionarios":
            window.location.href = `${pagesFolderRoute}listarFuncionarios.html`;
            break;
        case "relatorio":
            window.location.href = `${pagesFolderRoute}relatorio.html`;
            break;
        default:
            window.location.href = `${pagesFolderRoute}erro.html`;
    }
}