// Script para padronizar o header e footer em todas as páginas
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona a classe active ao item de menu correspondente à página atual
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
    
    // Adiciona funcionalidade ao botão de menu mobile
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
});
