import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';


// Importando novas imagens enviadas pelo usuário
import img1 from '../../assets/img 1.webp';
import img2 from '../../assets/img 2.webp';
import img3 from '../../assets/img 3.webp';
import img5 from '../../assets/img 5.webp';
import img6 from '../../assets/img 6.webp';

const aboutImages = [img1, img2, img3, img5, img6];

const pillars = [
  {
    title: 'Design Autoral',
    desc: 'Projetos desenhados do zero para refletir a personalidade única de cada cliente.',

    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: 'Alta Marcenaria',
    desc: 'Técnicas artesanais combinadas com tecnologia de ponta para acabamentos impecáveis.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243 4.243 3 3 0 014.243-4.243zm0-5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
      </svg>
    )
  },
  {
    title: 'Sustentabilidade',
    desc: 'Uso consciente de matérias-primas nobres com certificação de origem.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  }
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    // Intervalo para alternar as imagens do Sobre Nós
    const imageInterval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % aboutImages.length);
    }, 4000);

    return () => {
      observer.disconnect();
      clearInterval(imageInterval);
    };
  }, []);


  return (
    <div 
      id="sobre" 
      ref={sectionRef}
      className="bg-neutral-900 text-white flex flex-col md:flex-row min-h-screen font-sans overflow-hidden relative"
    >
      {/* Left Column: Text & Content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-24 py-20 md:py-12 bg-neutral-900 z-10">
        <span className={`text-[#F7D634] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          Nossa Essência
        </span>
        
        <h2 className={`text-4xl md:text-6xl font-light mb-8 tracking-tight transition-all duration-1000 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          A união entre <span className="font-semibold">arte</span> e <span className="font-semibold">precisão</span>.
        </h2>
        
        <p className={`text-slate-300 text-base md:text-lg leading-relaxed font-light mb-12 max-w-xl transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Na Maison Mobile, cada projeto é tratado como uma obra única. Não produzimos apenas móveis; materializamos ambientes que contam histórias e acolhem momentos.
        </p>

        {/* Interactive Pillars */}
        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              onMouseEnter={() => setHoveredPillar(idx)}
              onMouseLeave={() => setHoveredPillar(null)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                hoveredPillar === idx 
                  ? 'bg-[#F7D634] border-[#F7D634] text-neutral-950 scale-105 shadow-xl shadow-[#F7D634]/10' 
                  : 'bg-neutral-800/50 border-neutral-700/50 text-white hover:border-neutral-600'
              }`}
            >
              <div className={`mb-4 transition-colors duration-300 ${hoveredPillar === idx ? 'text-neutral-950' : 'text-[#F7D634]'}`}>
                {pillar.icon}
              </div>
              <h3 className="text-sm font-semibold tracking-wider uppercase mb-2">{pillar.title}</h3>
              <p className={`text-xs font-light leading-relaxed ${hoveredPillar === idx ? 'text-neutral-800' : 'text-slate-400'}`}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        <div className={`transition-all duration-1000 delay-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="px-8 py-3.5 bg-white hover:bg-slate-100 text-neutral-950 text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
            Trabalhe Conosco
          </button>
        </div>
      </div>

      {/* Right Column: Netflix-style Diagonal Photo Marquee */}
      <div className="flex-1 relative min-h-[500px] md:min-h-screen overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-transparent to-neutral-950/80 z-10 pointer-events-none" />
        
        {/* Tilted Container wrapper */}
        <div 
          className="absolute -inset-x-20 -inset-y-40 transform -rotate-12 flex justify-center gap-6"
        >
          {/* Coluna 1: Sobe */}
          <div className="overflow-hidden h-full flex flex-col justify-center">
            <motion.div 
              animate={{ y: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
              className="flex flex-col gap-6"
            >
              {[...aboutImages, ...aboutImages].map((img, idx) => (
                <img 
                  key={`c1-${idx}`} 
                  src={img} 
                  alt="Ambiente Maison" 
                  className="w-40 md:w-56 h-56 md:h-72 object-cover rounded-3xl shadow-2xl border border-white/5 opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300 pointer-events-auto cursor-pointer" 
                />
              ))}
            </motion.div>
          </div>

          {/* Coluna 2: Desce */}
          <div className="overflow-hidden h-full flex flex-col justify-center">
            <motion.div 
              animate={{ y: ["-50%", "0%"] }}
              transition={{ ease: "linear", duration: 35, repeat: Infinity }}
              className="flex flex-col gap-6"
            >
              {[...aboutImages, ...aboutImages].map((img, idx) => (
                <img 
                  key={`c2-${idx}`} 
                  src={img} 
                  alt="Ambiente Maison" 
                  className="w-40 md:w-56 h-56 md:h-72 object-cover rounded-3xl shadow-2xl border border-white/5 opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300 pointer-events-auto cursor-pointer" 
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>


    </div>
  );
}
