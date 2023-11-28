
function rotas(navegar){
    switch(navegar){
        case "home":
            window.location.href = "/index.html";
            break;
        case "consultas":
            window.location.href = "/frontend/pages/consultas.html";
            break;
        case "sobre":
            window.location.href = "/frontend/pages/sobre.html";
            break;
        default:
            alert("ERRO - O redirecionamento não encontrou a página que você quer acessar. Desculpe o transtorno.")
    }
}