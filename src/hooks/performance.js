import { useEffect, useState, useRef } from 'react';

// Hook para detectar quando o componente está visível na tela
export function useIntersectionObserver(
  elementRef,
  callback,
  options = { threshold: 0.1, rootMargin: '0px' }
) {
  useEffect(() => {
    if (!elementRef.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    }, options);
    
    observer.observe(elementRef.current);
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, callback, options]);
}

// Hook para lazy loading de componentes
export function useLazyLoad(elementRef, callback, options = { threshold: 0.1 }) {
  useEffect(() => {
    if (!elementRef.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(elementRef.current);
      }
    }, options);
    
    observer.observe(elementRef.current);
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, callback, options]);
}

// Hook para debounce de eventos (útil para otimizar eventos de scroll, resize, etc)
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Hook para detectar o tamanho da tela e aplicar breakpoints responsivos
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('');
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        setBreakpoint('sm');
      } else if (width >= 640 && width < 768) {
        setBreakpoint('md');
      } else if (width >= 768 && width < 1024) {
        setBreakpoint('lg');
      } else if (width >= 1024 && width < 1280) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };
    
    // Inicializar
    handleResize();
    
    // Adicionar listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return breakpoint;
}

// Hook para animações de entrada
export function useAnimateOnScroll(elementRef, animationClass = 'animate-fadeIn', threshold = 0.1) {
  useEffect(() => {
    if (!elementRef.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
        observer.unobserve(entry.target);
      }
    }, { threshold });
    
    observer.observe(elementRef.current);
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [elementRef, animationClass, threshold]);
}

// Hook para otimizar a performance de formulários
export function useFormOptimization(formRef) {
  useEffect(() => {
    if (!formRef.current) return;
    
    const form = formRef.current;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Prevenir múltiplos submits
    let isSubmitting = false;
    
    const handleSubmit = (e) => {
      if (isSubmitting) {
        e.preventDefault();
        return;
      }
      
      isSubmitting = true;
      
      // Resetar o estado após 2 segundos
      setTimeout(() => {
        isSubmitting = false;
      }, 2000);
    };
    
    form.addEventListener('submit', handleSubmit);
    
    // Otimizar inputs para evitar re-renders desnecessários
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        input.dataset.touched = 'true';
      });
    });
    
    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, [formRef]);
}

// Hook para carregar scripts externos de forma otimizada
export function useExternalScript(url, async = true, defer = true) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.async = async;
    script.defer = defer;
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, [url, async, defer]);
}

// Hook para otimizar o carregamento de imagens
export function useOptimizedImage(src, options = { quality: 80, sizes: '100vw' }) {
  const [optimizedSrc, setOptimizedSrc] = useState('');
  
  useEffect(() => {
    if (!src) return;
    
    // Criar URL otimizada
    const imgUrl = new URL(src, window.location.origin);
    imgUrl.searchParams.append('q', options.quality.toString());
    
    setOptimizedSrc(imgUrl.toString());
  }, [src, options.quality]);
  
  return {
    src: optimizedSrc || src,
    sizes: options.sizes,
    loading: 'lazy',
  };
}
