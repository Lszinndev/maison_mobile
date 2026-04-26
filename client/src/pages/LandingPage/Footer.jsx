import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.webp';

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
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-neutral-950 hover:bg-[#F7D634] hover:border-[#F7D634] hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.136.053 1.99.232 2.402.641.41.408.589 1.264.643 2.404.056 1.272.068 1.651.068 4.852s-.012 3.58-.07 4.85c-.053 1.136-.232 1.99-.641 2.401-.408.412-1.264.59-2.404.645-1.272.056-1.651.068-4.852.068s-3.579-.012-4.85-.07c-1.136-.053-1.99-.232-2.401-.641-.412-.408-.59-1.264-.645-2.404-.056-1.272-.068-1.651-.068-4.852s.012-3.58.07-4.85c.053-1.136.232-1.99.641-2.401.408-.411 1.264-.589 2.404-.644 1.272-.056 1.651-.068 4.852-.068zm0-2.163c-3.259 0-3.667.014-4.947.072-1.28.058-2.152.26-2.917.557a5.922 5.922 0 00-2.133 1.387 5.922 5.922 0 00-1.387 2.133c-.297.765-.499 1.637-.557 2.917-.058 1.28-.072 1.688-.072 4.947s.014 3.668.072 4.948c.058 1.28.26 2.152.557 2.917a5.922 5.922 0 001.387 2.133 5.922 5.922 0 002.133 1.387c.765.297 1.637.499 2.917.557 1.28.058 1.688.072 4.947.072s3.668-.014 4.948-.072c1.28-.058 2.152-.26 2.917-.557a5.922 5.922 0 002.133-1.387 5.922 5.922 0 001.387-2.133c.297-.765.499-1.637.557-2.917.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.058-1.28-.26-2.152-.557-2.917a5.922 5.922 0 00-1.387-2.133 5.922 5.922 0 00-2.133-1.387c-.765-.297-1.637-.499-2.917-.557-1.28-.058-1.689-.072-4.948-.072z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-neutral-950 hover:bg-[#F7D634] hover:border-[#F7D634] hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
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
          <span>© 2026 Todos os direitos reservados a Maison Mobile Marcenaria.</span>
          
          <div className="flex items-center gap-2">
            <span className="text-slate-600">Área Restrita:</span>
            <Link to="/admin" className="text-slate-400 hover:text-[#F7D634] transition-colors font-medium">
              Acessar Painel
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
