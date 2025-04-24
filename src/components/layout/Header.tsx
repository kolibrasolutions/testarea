'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detecta o scroll para mudar o estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-primary shadow-md py-2' : 'bg-primary py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="block">
            <Image 
              src="/images/logo-new.png" 
              alt="KOLIBRA SOLUTIONS" 
              width={150} 
              height={50} 
              className="h-[50px] w-auto"
              priority
            />
          </Link>
          
          {/* Menu para desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white font-medium hover:text-secondary transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/portfolio" 
              className="text-white font-medium hover:text-secondary transition-colors"
            >
              Portfólio
            </Link>
            <Link 
              href="/blog" 
              className="text-white font-medium hover:text-secondary transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/construtor" 
              className="bg-secondary text-white px-5 py-2 rounded-md hover:bg-secondary-dark transition-colors"
            >
              Construir Pacote
            </Link>
          </nav>
          
          {/* Botão do menu mobile */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-10 h-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></span>
            <span className={`block w-6 h-0.5 bg-white my-1.5 transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></span>
          </button>
        </div>
        
        {/* Menu mobile */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <nav className="flex flex-col space-y-4 py-4">
            <Link 
              href="/" 
              className="text-white font-medium hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/portfolio" 
              className="text-white font-medium hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Portfólio
            </Link>
            <Link 
              href="/blog" 
              className="text-white font-medium hover:text-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/construtor" 
              className="bg-secondary text-white px-5 py-2 rounded-md hover:bg-secondary-dark transition-colors inline-block"
              onClick={() => setIsMenuOpen(false)}
            >
              Construir Pacote
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
