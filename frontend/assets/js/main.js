// Configuração inicial da aplicação
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

// Função de inicialização
function initializeApp() {
    // Inicializa o menu
    initMenu();
    
    // Carrega a página inicial (dashboard)
    loadPage('dashboard');
    
    // Configura o roteamento
    setupRouting();
}

// Configuração do roteamento
function setupRouting() {
    window.addEventListener('hashchange', () => {
        const page = window.location.hash.slice(1) || 'dashboard';
        loadPage(page);
    });
}

// Carrega uma página
function loadPage(pageName) {
    const mainContent = document.getElementById('conteudo-principal');
    
    // Limpa o conteúdo atual
    mainContent.innerHTML = `<h2>Carregando ${pageName}...</h2>`;
    
    // Tenta carregar a página solicitada
    try {
        if (typeof window[`load${capitalize(pageName)}Page`] === 'function') {
            window[`load${capitalize(pageName)}Page`]();
        } else {
            mainContent.innerHTML = '<h2>Página não encontrada</h2>';
        }
    } catch (error) {
        console.error(`Erro ao carregar a página ${pageName}:`, error);
        mainContent.innerHTML = '<h2>Erro ao carregar a página</h2>';
    }
}

// Utilitário para capitalizar primeira letra
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}