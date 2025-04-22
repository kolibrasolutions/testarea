// Script para incluir o header e footer padronizados em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    // Função para adicionar o script de padronização a todas as páginas
    function addPadronizationScript() {
        const script = document.createElement('script');
        
        // Determinar o caminho relativo para a raiz do site
        const path = window.location.pathname;
        let rootPath = '';
        
        // Conta quantos níveis de diretório estamos abaixo da raiz
        const pathParts = path.split('/').filter(part => part.length > 0);
        // Ignora o arquivo HTML no final do caminho
        const depth = pathParts.length - (path.endsWith('.html') ? 1 : 0);
        
        for (let i = 0; i < depth; i++) {
            rootPath += '../';
        }
        
        script.src = rootPath + 'js/padronizar-header-footer.js';
        document.body.appendChild(script);
    }
    
    // Adiciona o script de padronização
    addPadronizationScript();
});
