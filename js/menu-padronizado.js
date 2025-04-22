// Script para padronizar o header e footer em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    // Carrega o header padronizado
    const headerContainer = document.querySelector('header');
    if (headerContainer) {
        fetch('/header.html')
            .then(response => response.text())
            .then(data => {
                headerContainer.innerHTML = data;
                // Ativa o item de menu correspondente à página atual
                activateCurrentMenuItem();
            })
            .catch(error => console.error('Erro ao carregar o header:', error));
    }
    
    // Carrega o footer padronizado
    const footerContainer = document.querySelector('footer');
    if (footerContainer) {
        fetch('/footer.html')
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => console.error('Erro ao carregar o footer:', error));
    }
    
    // Função para ativar o item de menu correspondente à página atual
    function activateCurrentMenuItem() {
        const currentPath = window.location.pathname;
        const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
        
        const menuItems = document.querySelectorAll('.nav-menu a');
        menuItems.forEach(item => {
            item.classList.remove('active');
            const itemHref = item.getAttribute('href');
            if (itemHref === filename || (filename === '' && itemHref === 'index.html')) {
                item.classList.add('active');
                item.setAttribute('aria-current', 'page');
            }
        });
    }
});
