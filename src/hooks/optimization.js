'use client';

import { useEffect } from 'react';

/**
 * Hook para implementar cache de recursos e melhorar a performance
 */
export function useResourceCaching() {
  useEffect(() => {
    // Implementa cache para recursos estáticos
    if ('caches' in window) {
      // Nome do cache
      const CACHE_NAME = 'kolibra-static-v1';
      
      // Recursos para cache
      const urlsToCache = [
        '/globe.svg',
        '/file.svg',
        '/window.svg'
      ];
      
      // Registra o service worker se disponível
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          caches.open(CACHE_NAME)
            .then(cache => {
              return cache.addAll(urlsToCache);
            })
            .catch(error => {
              console.error('Falha ao criar cache:', error);
            });
        });
      }
    }
  }, []);
}

/**
 * Hook para otimizar a renderização de componentes
 */
export function useOptimizedRendering() {
  useEffect(() => {
    // Implementa debounce para eventos de scroll e resize
    let scrollTimeout;
    let resizeTimeout;
    
    const handleScroll = () => {
      // Cancela o timeout anterior
      clearTimeout(scrollTimeout);
      
      // Define um novo timeout
      scrollTimeout = setTimeout(() => {
        // Executa operações pesadas após o scroll parar
        const scrollElements = document.querySelectorAll('[data-scroll-optimize]');
        scrollElements.forEach(el => {
          if (isElementInViewport(el)) {
            el.classList.add('visible');
          }
        });
      }, 100);
    };
    
    const handleResize = () => {
      // Cancela o timeout anterior
      clearTimeout(resizeTimeout);
      
      // Define um novo timeout
      resizeTimeout = setTimeout(() => {
        // Executa operações pesadas após o resize parar
        const resizeElements = document.querySelectorAll('[data-resize-optimize]');
        resizeElements.forEach(el => {
          el.classList.add('resized');
        });
      }, 100);
    };
    
    // Função auxiliar para verificar se elemento está na viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    
    // Adiciona event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Executa verificação inicial
    handleScroll();
    handleResize();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearTimeout(scrollTimeout);
      clearTimeout(resizeTimeout);
    };
  }, []);
}

/**
 * Hook para otimizar formulários e prevenir múltiplos envios
 */
export function useFormOptimization() {
  useEffect(() => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        // Verifica se o formulário já está sendo enviado
        if (form.dataset.submitting === 'true') {
          e.preventDefault();
          return;
        }
        
        // Marca o formulário como sendo enviado
        form.dataset.submitting = 'true';
        
        // Desabilita o botão de envio
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
          
          // Armazena o texto original
          const originalText = submitButton.textContent;
          submitButton.textContent = 'Enviando...';
          
          // Restaura o estado após 5 segundos (caso algo dê errado)
          setTimeout(() => {
            form.dataset.submitting = 'false';
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }, 5000);
        }
      });
    });
  }, []);
}

/**
 * Hook para melhorar a acessibilidade do site
 */
export function useAccessibilityEnhancements() {
  useEffect(() => {
    // Adiciona atributos ARIA faltantes
    document.querySelectorAll('button:not([aria-label])').forEach(button => {
      if (!button.textContent) {
        button.setAttribute('aria-label', 'Botão');
      }
    });
    
    // Melhora o contraste para elementos com baixo contraste
    document.querySelectorAll('.text-gray-400, .text-gray-500').forEach(el => {
      el.classList.add('high-contrast');
    });
    
    // Adiciona suporte a navegação por teclado
    document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').forEach(el => {
      el.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (el as HTMLElement).click();
        }
      });
    });
  }, []);
}
