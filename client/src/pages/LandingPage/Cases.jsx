import React, { useState, useEffect, useRef } from 'react';

// Importando imagens reais enviadas pelo usuário
import case1 from '../../assets/467670809_18249282280278373_4023181893267405786_n.webp';
import case2 from '../../assets/467689236_18249278812278373_7647212320046117727_n.webp';
import case3 from '../../assets/467725659_18249414688278373_1527287407004460594_n.webp';
import case4 from '../../assets/467841028_18249415105278373_4763349829176822746_n.webp';
import case5 from '../../assets/467864355_18249414826278373_5527320839520781744_n.webp';
import case6 from '../../assets/468038973_18249415072278373_6804399670591516843_n.webp';
import case7 from '../../assets/471202049_18252952471278373_1634508468807559955_n.webp';
import case8 from '../../assets/480536699_18259901926278373_5745179231296716394_n.webp';
import case9 from '../../assets/642651086_18003317867854648_7403028152810960060_n.webp';
import case10 from '../../assets/651502043_18090858284273515_2829924963930866601_n.webp';

const casesData = [
  {
    id: 1,
    image: case1,
    title: 'Cozinha Planejada',
    category: 'Mobiliário Integrado'
  },
  {
    id: 2,
    image: case2,
    title: 'Painel Home Theater',
    category: 'Living'
  },
  {
    id: 3,
    image: case3,
    title: 'Dormitório Master',
    category: 'Suítes'
  },
  {
    id: 4,
    image: case4,
    title: 'Home Office Premium',
    category: 'Corporativo'
  },
  {
    id: 5,
    image: case5,
    title: 'Área Gourmet Externa',
    category: 'Lazer'
  },
  {
    id: 6,
    image: case6,
    title: 'Banheiro Contemporâneo',
    category: 'Mobiliário Fino'
  },
  {
    id: 7,
    image: case7,
    title: 'Closet Sob Medida',
    category: 'Dormitórios'
  },
  {
    id: 8,
    image: case8,
    title: 'Cozinha Provençal',
    category: 'Clássico'
  },
  {
    id: 9,
    image: case9,
    title: 'Adega Climatizada',
    category: 'Adega'
  },
  {
    id: 10,
    image: case10,
    title: 'Espaço Gourmet Ilha',
    category: 'Mobiliário Integrado'
  }
];


export default function Cases() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef(null);
  const [slideOffset, setSlideOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      const cardWidth = window.innerWidth >= 640 ? 450 : 280;
      const gap = 32; // gap-8
      setSlideOffset(currentIndex * (cardWidth + gap));
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [currentIndex]);

  const nextSlide = () => {

    setCurrentIndex((prev) => (prev + 1) % casesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + casesData.length) % casesData.length);
  };

  // Autoplay Effect
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2000); // Avança a cada 5 segundos
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Drag and Swipe Handlers
  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    const diffX = e.clientX - startX;
    if (diffX > 50) prevSlide();
    if (diffX < -50) nextSlide();
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    const diffX = e.changedTouches[0].clientX - startX;
    if (diffX > 50) prevSlide();
    if (diffX < -50) nextSlide();
    setIsDragging(false);
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
      id="cases"
      ref={sectionRef}
      className="bg-neutral-950 text-white py-24 px-6 md:px-16 font-sans relative overflow-hidden border-t border-white/5"
    >

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="text-[#F7D634] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            Portfólio
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight">
            Projetos em <span className="font-semibold">Destaque</span>.
          </h2>
        </div>
        <p className={`text-slate-400 text-base md:text-lg max-w-md font-light leading-relaxed transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Uma curadoria de ambientes sob medida desenvolvidos com excelência técnica e sensibilidade estética.
        </p>
      </div>

      {/* Carousel Container */}
      <div
        className="relative max-w-7xl mx-auto overflow-hidden py-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => setIsDragging(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        <div
          className="flex transition-transform duration-700 ease-out gap-8"
          style={{ transform: `translateX(-${slideOffset}px)` }}

        >
          {casesData.map((item, idx) => (
            <div
              key={item.id}
              className={`w-[280px] sm:w-[450px] flex-shrink-0 rounded-[40px] overflow-hidden relative group shadow-2xl cursor-pointer transition-all duration-1000 transform ${isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-16 scale-95'
                }`}
              style={{ transitionDelay: `${idx * 200}ms` }}
              onClick={() => setSelectedImage(item.image)}
            >

              {/* Image with zoom effect on hover */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
              </div>

              {/* Minimalist Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300"></div>

              {/* Card Content */}
              <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between">
                <div>
                  <span className="text-[#F7D634] text-xs font-bold tracking-widest uppercase block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-medium text-white">{item.title}</h3>
                </div>

                {/* View Icon Button */}
                <span className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 group-hover:bg-[#F7D634] group-hover:border-[#F7D634] group-hover:text-neutral-950 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Controls */}
      <div className="flex justify-center mt-12 gap-6">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-white/10 hover:border-white/30 bg-neutral-900 text-white hover:text-[#F7D634] flex items-center justify-center transition-all duration-300 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="flex items-center gap-3 bg-neutral-900 border border-white/5 px-6 py-3 rounded-full">
          {casesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-[#F7D634] w-8' : 'bg-white/20 w-2 hover:bg-white/40'
                }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-white/10 hover:border-white/30 bg-neutral-900 text-white hover:text-[#F7D634] flex items-center justify-center transition-all duration-300 shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Lightbox Modal (Fullscreen Image Viewer) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Projeto ampliado"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl animate-fade-in"
          />
        </div>
      )}
    </div>
  );
}
