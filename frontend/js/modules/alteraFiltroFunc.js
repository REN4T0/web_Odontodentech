// Função para alterar filtros na tela de lista de funcionários

export function alterarFiltro(elemento){
    // Selecionando todos os elemntos e tirando a classe de ativos para evitar erros visuais
    const filtros = document.querySelectorAll(".filtro-func");
        
    // Removendo a classe de filtro ativo para todos
    for(let filtro of filtros) {
        filtro.classList.remove("filtro-ativo")
    }

    // Adicionando a classe de filtro ativo somente para o elemento que eu cliquei
    elemento.classList.add("filtro-ativo")
}