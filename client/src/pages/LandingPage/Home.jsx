import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.webp';
import heroBg from '../../assets/hero-bg.webp';
import BudgetModal from '../../components/BudgetModal';

export default function Home() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const sections = ['inicio', 'sobre', 'cases', 'mapa'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '-20% 0px -30% 0px' 
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="inicio" className="relative min-h-screen font-sans overflow-hidden bg-neutral-950">
      
      {/* Background Image with Ken Burns (subtle zoom) effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-subtle-zoom" 
        style={{ 
          backgroundImage: `url(${heroBg})` 
        }}
      >

        {/* Deep gradient overlay for better contrast and premium feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/60 to-transparent"></div>
        {/* Top gradient for navbar readability */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neutral-950/80 to-transparent"></div>
      </div>

      {/* Header / Navbar - Floating Glassmorphism */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl bg-neutral-950/60 backdrop-blur-md border border-white/10 px-6 md:px-10 py-4 rounded-full flex justify-between items-center shadow-2xl">
        {/* Logo */}
        <div className="flex items-center">

          <a href="#inicio" className="flex items-center hover:scale-105 transition-transform duration-300">
            <img src={logoImg} alt="Maison Mobile" className="h-10 md:h-14 w-auto object-contain brightness-110" />
          </a>

        </div>

        {/* Menu with Scroll Spy */}
        <nav className="hidden md:flex items-center gap-10 text-xs font-light tracking-[0.2em] text-white/70">
          <a 
            href="#inicio" 
            className={`transition-all duration-300 relative pb-1 ${
              activeSection === 'inicio' 
                ? 'text-white font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#F7D634]' 
                : 'hover:text-white'
            }`}
          >
            INÍCIO
          </a>
          <a 
            href="#sobre" 
            className={`transition-all duration-300 relative pb-1 ${
              activeSection === 'sobre' 
                ? 'text-white font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#F7D634]' 
                : 'hover:text-white'
            }`}
          >
            SOBRE
          </a>
          <a 
            href="#cases" 
            className={`transition-all duration-300 relative pb-1 ${
              activeSection === 'cases' 
                ? 'text-white font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#F7D634]' 
                : 'hover:text-white'
            }`}
          >
            CASES
          </a>
          <a 
            href="#mapa" 
            className={`transition-all duration-300 relative pb-1 ${
              activeSection === 'mapa' 
                ? 'text-white font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#F7D634]' 
                : 'hover:text-white'
            }`}
          >
            MAPA
          </a>
        </nav>

        {/* CTA Top Right */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="hidden md:block px-6 py-2 bg-[#F7D634] hover:bg-[#e5c323] text-neutral-950 text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-md"
        >
          Orçamento
        </button>
      </header>



      {/* Hero Content */}
      <main className="relative z-10 flex flex-col justify-center items-start px-6 md:px-24 pt-24 h-[calc(100vh-104px)] max-w-7xl mx-auto">

        <span className="text-[#F7D634] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4 opacity-0 animate-fade-up">

          Marcenaria de Alto Padrão
        </span>
        
        <h1 className="text-4xl md:text-7xl font-extralight text-white tracking-wide leading-[1.15] mb-6 max-w-4xl opacity-0 animate-fade-up delay-200">
          Design que <br />
          <span className="font-semibold text-white">transforma</span> espaços.
        </h1>

        <p className="text-base md:text-lg text-neutral-300 font-light tracking-wide leading-relaxed max-w-xl mb-10 opacity-0 animate-fade-up delay-500">
          Projetos exclusivos desenvolvidos para quem valoriza a sofisticação, a funcionalidade e a nobreza do mobiliário sob medida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up delay-700">

          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-4 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Solicitar Orçamento
          </button>
          <a href="#cases" className="px-10 py-4 bg-white/5 hover:bg-white/15 text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-full border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 inline-flex items-center justify-center">
            Explorar Projetos
          </a>
        </div>

      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/5521999999999" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 p-4 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6c-3.313 0-6 2.691-6 6.005 0 1.332.434 2.562 1.171 3.565l-.771 2.825 2.894-.759c.961.59 2.091.941 3.3.941 3.313 0 6-2.691 6-6.005 0-3.313-2.687-6.005-6-6.005zm0 1.5c2.481 0 4.5 2.015 4.5 4.505 0 2.489-2.019 4.505-4.5 4.505-.989 0-1.905-.319-2.656-.865l-.174-.128-1.595.418.424-1.556-.142-.206a4.469 4.469 0 01-.857-2.668c0-2.49 2.019-4.505 4.5-4.505z"/>
        </svg>
      </a>
      {/* Budget Multi-step Modal */}
      <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

