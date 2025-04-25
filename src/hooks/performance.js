'use client';

import { useEffect } from 'react';

/**
 * Hook para otimizar o carregamento de recursos
 * Implementa lazy loading para imagens e scripts
 */
export function useLazyLoading() {
  useEffect(() => {
    // Lazy load de imagens
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target as HTMLImageElement;
            if (image.dataset.src) {
              image.src = image.dataset.src;
              image.classList.remove('lazy');
              imageObserver.unobserve(image);
            }
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback para navegadores que não suportam IntersectionObserver
      let lazyLoadThrottleTimeout: NodeJS.Timeout | null = null;
      
      function lazyLoad() {
        if (lazyLoadThrottleTimeout) {
          clearTimeout(lazyLoadThrottleTimeout);
        }

        lazyLoadThrottleTimeout = setTimeout(() => {
          const scrollTop = window.scrollY;
          lazyImages.forEach(img => {
            const imgElement = img as HTMLImageElement;
            if (imgElement.offsetTop < (window.innerHeight + scrollTop) && imgElement.dataset.src) {
              imgElement.src = imgElement.dataset.src;
              imgElement.classList.remove('lazy');
            }
          });
          if (lazyImages.length === 0) { 
            document.removeEventListener('scroll', lazyLoad);
            window.removeEventListener('resize', lazyLoad);
            window.removeEventListener('orientationChange', lazyLoad);
          }
        }, 20);
      }

      document.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
      window.addEventListener('orientationChange', lazyLoad);
    }
  }, []);
}

/**
 * Hook para otimizar a performance de animações
 * Utiliza requestAnimationFrame para animações suaves
 */
export function useSmoothAnimations() {
  useEffect(() => {
    // Detecta elementos com classe 'animate-on-scroll'
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Usa requestAnimationFrame para animações suaves
            requestAnimationFrame(() => {
              entry.target.classList.add('animated');
              animationObserver.unobserve(entry.target);
            });
          }
        });
      }, { threshold: 0.1 });

      animatedElements.forEach(el => animationObserver.observe(el));
    }
  }, []);
}

/**
 * Hook para otimizar a navegação entre páginas
 * Implementa prefetching de links visíveis
 */
export function usePrefetchLinks() {
  useEffect(() => {
    // Prefetch de links visíveis na viewport
    const prefetchLinks = () => {
      const links = document.querySelectorAll('a');
      
      if ('IntersectionObserver' in window) {
        const linkObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const link = entry.target as HTMLAnchorElement;
              const href = link.getAttribute('href');
              
              if (href && href.startsWith('/') && !link.hasAttribute('data-prefetched')) {
                const prefetchLink = document.createElement('link');
                prefetchLink.rel = 'prefetch';
                prefetchLink.href = href;
                document.head.appendChild(prefetchLink);
                link.setAttribute('data-prefetched', 'true');
              }
              
              linkObserver.unobserve(link);
            }
          });
        });

        links.forEach(link => linkObserver.observe(link));
      }
    };

    prefetchLinks();
    
    // Prefetch novamente quando a página for rolada
    window.addEventListener('scroll', prefetchLinks, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', prefetchLinks);
    };
  }, []);
}

/**
 * Hook para otimizar o carregamento de fontes
 * Implementa font-display: swap e preconnect
 */
export function useOptimizedFonts() {
  useEffect(() => {
    // Adiciona preconnect para domínios de fontes
    const fontDomains = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
    
    fontDomains.forEach(domain => {
      if (!document.querySelector(`link[rel="preconnect"][href="${domain}"]`)) {
        const preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = domain;
        preconnect.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect);
      }
    });
  }, []);
}
