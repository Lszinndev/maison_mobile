import React, { useState, useEffect, useRef } from 'react';

export default function Location() {
  const addressText = "Rua João Bettega, 4265 - Portão, CEP 81350-274";
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },

      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="mapa"
      ref={sectionRef}
      className="bg-neutral-900 text-white flex flex-col md:flex-row min-h-[70vh] font-sans overflow-hidden border-t border-white/5"
    >
      {/* Left Column: Info & Button */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-24 py-20 md:py-12 bg-neutral-900 z-10">

        <span className={`text-[#F7D634] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          Onde Estamos
        </span>

        <h2 className={`text-4xl md:text-6xl font-light mb-8 tracking-tight transition-all duration-1000 delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Venha nos <span className="font-semibold">visitar</span>.
        </h2>

        <div className={`space-y-4 text-slate-300 text-base md:text-xl font-light mb-10 max-w-md transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F7D634]"></span>
            <span>Rua João Bettega, 4265</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F7D634]"></span>
            <span>Bairro Portão — Curitiba / PR</span>
          </p>
          <p className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F7D634]"></span>
            <span>CEP: 81350-274</span>
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={handleCopyAddress}
            className={`flex items-center gap-3 px-8 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer
              ${copied
                ? 'bg-green-600 text-white shadow-green-600/20'
                : 'bg-white hover:bg-slate-200 text-neutral-950'
              }`}
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 5" />
                </svg>
                Endereço Copiado!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copiar Endereço
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Column: Interactive Google Map */}
      <div className="flex-1 relative min-h-[400px] md:min-h-full">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.118949826359!2d-49.31750272459461!3d-25.467713277535874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce30fd71e98eb%3A0xc6cb52c416f5c5b9!2sR.%20Jo%C3%A3o%20Bettega%2C%204265%20-%20Port%C3%A3o%2C%20Curitiba%20-%20PR%2C%2081350-274!5e0!3m2!1spt-BR!2sbr!4v1714088921800!5m2!1spt-BR!2sbr"
          className="absolute inset-0 w-full h-full border-0 md:rounded-tl-[40px] transition-all duration-500 hover:brightness-105"

          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
}
