// Script para incluir o header e footer padronizados em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    // Função para determinar o caminho relativo para a raiz do site
    function getRootPath() {
        const path = window.location.pathname;
        let rootPath = '';
        
        // Conta quantos níveis de diretório estamos abaixo da raiz
        const pathParts = path.split('/').filter(part => part.length > 0);
        // Ignora o arquivo HTML no final do caminho
        const depth = pathParts.length - (path.endsWith('.html') ? 1 : 0);
        
        for (let i = 0; i < depth; i++) {
            rootPath += '../';
        }
        
        return rootPath || './';
    }
    
    // Substitui o header e footer existentes pelos padronizados
    function loadHeaderFooter() {
        const rootPath = getRootPath();
        
        // Carrega o header padronizado
        fetch(rootPath + 'header.html')
            .then(response => response.text())
            .then(data => {
                // Substitui os caminhos relativos no header
                data = data.replace(/src="img\//g, `src="${rootPath}img/`);
                data = data.replace(/href="index.html"/g, `href="${rootPath}index.html"`);
                data = data.replace(/href="portfolio.html"/g, `href="${rootPath}portfolio.html"`);
                data = data.replace(/href="construtor.html"/g, `href="${rootPath}construtor.html"`);
                
                const headerElement = document.querySelector('header');
                if (headerElement) {
                    headerElement.outerHTML = data;
                    // Ativa o item de menu correspondente à página atual
                    activateCurrentMenuItem();
                    // Adiciona funcionalidade ao botão de menu mobile
                    setupMobileMenu();
                }
            })
            .catch(error => console.error('Erro ao carregar o header:', error));
        
        // Carrega o footer padronizado
        fetch(rootPath + 'footer.html')
            .then(response => response.text())
            .then(data => {
                // Substitui os caminhos relativos no footer
                data = data.replace(/src="img\//g, `src="${rootPath}img/`);
                data = data.replace(/href="index.html"/g, `href="${rootPath}index.html"`);
                data = data.replace(/href="portfolio.html"/g, `href="${rootPath}portfolio.html"`);
                data = data.replace(/href="construtor.html"/g, `href="${rootPath}construtor.html"`);
                data = data.replace(/href="segmentacao.html"/g, `href="${rootPath}segmentacao.html"`);
                
                const footerElement = document.querySelector('footer');
                if (footerElement) {
                    footerElement.outerHTML = data;
                }
            })
            .catch(error => console.error('Erro ao carregar o footer:', error));
    }
    
    // Ativa o item de menu correspondente à página atual
    function activateCurrentMenuItem() {
        const currentPath = window.location.pathname;
        const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        
        const menuItems = document.querySelectorAll('.nav-menu a');
        menuItems.forEach(item => {
            item.classList.remove('active');
            const itemHref = item.getAttribute('href');
            const itemFilename = itemHref.substring(itemHref.lastIndexOf('/') + 1);
            
            if (itemFilename === filename || 
                (filename === '' && itemFilename === 'index.html') ||
                (currentPath.includes('/blog/') && itemFilename === 'blog.html')) {
                item.classList.add('active');
                item.setAttribute('aria-current', 'page');
            }
        });
    }
    
    // Configura o menu mobile
    function setupMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
            });
        }
    }
    
    // Inicia o carregamento do header e footer padronizados
    loadHeaderFooter();
});
