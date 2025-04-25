'use client';

import { useEffect } from 'react';

/**
 * Hook para corrigir problemas de navegação e links
 * Garante que todos os links internos funcionem corretamente
 */
export function useNavigationFixes() {
  useEffect(() => {
    // Corrige links internos quebrados
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      
      // Verifica se é um link interno
      if (href && href.startsWith('/')) {
        // Lista de páginas válidas
        const validPages = ['/', '/portfolio', '/construtor', '/contato', '/diagnostico'];
        
        // Verifica se o link aponta para uma página válida
        const isValid = validPages.some(page => 
          href === page || href.startsWith(`${page}/`) || href.startsWith(`${page}?`)
        );
        
        // Se não for válido, redireciona para a página inicial ou construtor
        if (!isValid) {
          if (href.includes('servico') || href.includes('blog')) {
            link.setAttribute('href', '/construtor');
          } else {
            link.setAttribute('href', '/');
          }
        }
      }
    });
  }, []);
}

/**
 * Hook para prevenir flickering durante navegação
 * Implementa transições suaves entre páginas
 */
export function useSmoothNavigation() {
  useEffect(() => {
    // Adiciona classe ao body para controlar transições
    document.body.classList.add('navigation-ready');
    
    // Intercepta cliques em links internos
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.getAttribute('href')?.startsWith('/') && !e.ctrlKey && !e.metaKey) {
        // Adiciona classe para iniciar transição de saída
        document.body.classList.add('page-transition-out');
        
        // Pequeno atraso para permitir a animação
        setTimeout(() => {
          document.body.classList.remove('page-transition-out');
        }, 300);
      }
    });
    
    // Adiciona classe para transição de entrada quando a página carrega
    document.body.classList.add('page-transition-in');
    setTimeout(() => {
      document.body.classList.remove('page-transition-in');
    }, 300);
  }, []);
}

/**
 * Hook para corrigir problemas de layout e responsividade
 */
export function useLayoutFixes() {
  useEffect(() => {
    // Corrige problemas de layout em dispositivos móveis
    const fixMobileLayout = () => {
      // Corrige altura da viewport em dispositivos móveis
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      
      // Corrige problemas com teclado virtual em dispositivos móveis
      const inputs = document.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          // Em dispositivos móveis, ajusta o scroll para manter o input visível
          if (window.innerWidth < 768) {
            setTimeout(() => {
              input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }
        });
      });
    };
    
    // Executa imediatamente e em cada resize
    fixMobileLayout();
    window.addEventListener('resize', fixMobileLayout);
    
    return () => {
      window.removeEventListener('resize', fixMobileLayout);
    };
  }, []);
}

/**
 * Hook para corrigir problemas com formulários
 */
export function useFormFixes() {
  useEffect(() => {
    // Corrige problemas com validação de formulários
    document.querySelectorAll('form').forEach(form => {
      // Adiciona validação de email
      const emailInputs = form.querySelectorAll('input[type="email"]');
      emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
          const email = (input as HTMLInputElement).value;
          const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          
          if (email && !isValid) {
            input.classList.add('invalid');
            
            // Adiciona mensagem de erro se não existir
            let errorMsg = input.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
              errorMsg = document.createElement('div');
              errorMsg.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
              errorMsg.textContent = 'Por favor, insira um email válido.';
              input.parentNode?.insertBefore(errorMsg, input.nextSibling);
            }
          } else {
            input.classList.remove('invalid');
            
            // Remove mensagem de erro se existir
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
              errorMsg.remove();
            }
          }
        });
      });
      
      // Previne envio de formulário com campos inválidos
      form.addEventListener('submit', (e) => {
        const invalidInputs = form.querySelectorAll('.invalid');
        if (invalidInputs.length > 0) {
          e.preventDefault();
          invalidInputs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }, []);
}
