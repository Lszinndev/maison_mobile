import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.webp';
import { HugeiconsIcon } from "@hugeicons/react";
import { InstagramIcon, Facebook02Icon } from "@hugeicons/core-free-icons";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },

      { threshold: 0.1 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="contato"
      ref={footerRef}
      className="bg-neutral-950 text-white py-16 px-6 md:px-24 font-sans border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Top Row: Logo & Socials */}
        <div className={`flex flex-col md:flex-row justify-between items-center pb-12 border-b border-white/10 gap-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a href="#inicio" className="flex items-center hover:scale-105 transition-transform duration-300">
            <img src={logoImg} alt="Maison Mobile" className="h-10 md:h-14 w-auto object-contain brightness-110" />
          </a>


          {/* Social Icons - Minimalist Ghost Style */}
          <div className="flex gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/maisonmobilemoveisplanejados/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-neutral-950 hover:bg-[#F7D634] hover:border-[#F7D634] hover:scale-105 transition-all duration-300"
            >
              <HugeiconsIcon icon={InstagramIcon} size={20} />
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/maisonmobilemoveisplanejados/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-neutral-950 hover:bg-[#F7D634] hover:border-[#F7D634] hover:scale-105 transition-all duration-300"
            >
              <HugeiconsIcon icon={Facebook02Icon} size={20} />
            </a>
          </div>
        </div>

        {/* Middle Row: Links & Text */}
        <div className={`py-12 flex flex-col md:flex-row justify-between gap-12 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Navigation Links */}
          <div className="flex flex-col gap-3 text-base md:text-lg font-light text-slate-300">
            <a href="#inicio" className="hover:text-[#F7D634] transition-colors">Início</a>
            <a href="#sobre" className="hover:text-[#F7D634] transition-colors">Sobre nós</a>
            <a href="#cases" className="hover:text-[#F7D634] transition-colors">Portfólio</a>
            <a href="#mapa" className="hover:text-[#F7D634] transition-colors">Localidade</a>
          </div>

          {/* Institutional Text */}
          <div className="max-w-xl">
            <h4 className="text-[#F7D634] text-xs font-bold tracking-[0.2em] uppercase mb-4">Maison Mobile Marcenaria</h4>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Materializando projetos de alto padrão com precisão técnica e acabamentos refinados. Sua casa com o design que sempre sonhou.
            </p>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className={`pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-center md:text-left">© 2026 Todos os direitos reservados a Maison Mobile Marcenaria.</span>

          <div className="flex items-center gap-2">
            <span className="text-slate-600">Área Restrita:</span>
            <Link to="/admin" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#F7D634] transition-colors font-medium">
              Acessar Painel
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
