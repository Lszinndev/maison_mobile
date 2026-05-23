import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.webp';
import heroBg from '../../assets/hero-bg.webp';
import BudgetModal from '../../components/BudgetModal';

export default function Home() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            className={`transition-all duration-300 relative pb-1 ${activeSection === 'inicio'
              ? 'text-white font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#F7D634]'
              : 'hover:text-white'
              }`}
          >
            INÍCIO
          </a>
          <a
            href="#sobre"
            className={`transition-all duration-300 relative pb-1 ${activeSection === 'sobre'
              ? 'text-white font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#F7D634]'
              : 'hover:text-white'
              }`}
          >
            SOBRE
          </a>
          <a
            href="#cases"
            className={`transition-all duration-300 relative pb-1 ${activeSection === 'cases'
              ? 'text-white font-medium after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#F7D634]'
              : 'hover:text-white'
              }`}
          >
            CASES
          </a>
          <a
            href="#mapa"
            className={`transition-all duration-300 relative pb-1 ${activeSection === 'mapa'
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
          className="hidden md:block px-6 py-2 bg-[#F7D634] hover:bg-[#e5c323] text-neutral-950 text-xs font-semibold tracking-[0.15em] uppercase rounded-full transition-all duration-300 shadow-md cursor-pointer"
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
            className="px-10 py-4 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
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
        href="https://wa.me/5541996969634"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 p-4 bg-[#25D366] hover:bg-[#20ba57] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.434 5.639 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Budget Multi-step Modal */}
      <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

