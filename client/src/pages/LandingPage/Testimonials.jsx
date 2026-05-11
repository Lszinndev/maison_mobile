'use client';

import * as React from 'react';
import {
  LayoutGroup,
  motion,
  useAnimate,
  delay,
  AnimatePresence,
} from 'motion/react';



const ITEMS = [
  {
    id: 1,
    name: 'Mariana Silva',
    role: 'Empresária',
    quote: 'A Maison Mobile transformou completamente minha cozinha. O acabamento em laca branca ficou impecável!',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
  },
  {
    id: 2,
    name: 'Ricardo Fontes',
    role: 'Arquiteto',
    quote: 'Trabalhar em parceria com a Maison é garantia de que os projetos dos meus clientes serão executados com perfeição.',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
  },
  {
    id: 3,
    name: 'Clara Mendes',
    role: 'Designer de Interiores',
    quote: 'O cuidado com os detalhes, como as dobradiças com amortecimento, faz toda a diferença no dia a dia.',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150',
  },
  {
    id: 4,
    name: 'Bruno Castro',
    role: 'Engenheiro Civil',
    quote: 'A pontualidade na entrega e a precisão das medidas nos painéis de MDF me impressionaram muito.',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
  },
  {
    id: 5,
    name: 'Heloísa Ramos',
    role: 'Médica',
    quote: 'Fizemos os closets e o resultado foi além do esperado. Organização aliada à pura sofisticação.',
    src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150',
  },
  {
    id: 6,
    name: 'Felipe Neves',
    role: 'Chef de Cozinha',
    quote: 'Minha cozinha gourmet exige alta durabilidade. Os materiais da Maison Mobile aguentam a rotina com beleza.',
    src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150',
  },
  {
    id: 7,
    name: 'Juliana Torres',
    role: 'Advogada',
    quote: 'O home office integrado ficou perfeito. Consigo trabalhar em um ambiente confortável e lindo.',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150',
  },
  {
    id: 8,
    name: 'David Haz',
    role: 'Desenvolvedor',
    quote: 'O suporte técnico no pós-venda é exemplar. Com certeza farei meus próximos cômodos com eles.',
    src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150',
  },
];



const transition = {
  delay: 0,
  stiffness: 300,
  damping: 35,
  type: 'spring',
  restSpeed: 0.01,
  restDelta: 0.01,
};

const spinConfig = {
  duration: 30,
  ease: 'linear',
  repeat: Infinity,
};

const qsa = (root, sel) =>
  Array.from(root.querySelectorAll(sel));

const angleOf = (el) => Number(el.dataset.angle || 0);

const armOfImg = (img) =>
  img.closest('[data-arm]');


function RadialIntro({
  orbitItems,
  stageSize = 320,
  imageSize = 56,
  onHoverItem,
}) {
  return (
    <div 
      className="relative flex items-center justify-center" 
      style={{ width: stageSize, height: stageSize }}
    >
      {/* Círculo central invisível ou decorativo */}
      <div className="absolute w-[240px] h-[240px] border border-white/5 rounded-full pointer-events-none" />

      {orbitItems.map((item, index) => {
        const initialAngle = index * (360 / orbitItems.length);
        
        return (
          <div
            key={item.id}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* O braço orbita 360 graus infinitamente */}
            <motion.div
              animate={{ rotate: [initialAngle, initialAngle + 360] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-full h-full flex items-center justify-center pointer-events-none"
            >
              {/* O item é empurrado para fora do centro pelo raio da órbita */}
              <div 
                style={{ transform: `translateY(-120px)` }}
                className="pointer-events-auto"
              >
                {/* A foto faz o contra-giro (-360) para se manter sempre em pé */}
                <motion.img
                  animate={{ rotate: [-initialAngle, -initialAngle - 360] }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  src={item.src}
                  alt={item.name}
                  onMouseEnter={() => onHoverItem(item)}
                  className="rounded-full object-cover aspect-square border-2 border-[#F7D634]/50 cursor-pointer hover:border-[#F7D634] hover:scale-110 transition-all duration-300"
                  style={{
                    width: imageSize,
                    height: imageSize,
                  }}
                  draggable={false}
                />
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}


export default function Testimonials() {
  const [activeItem, setActiveItem] = React.useState(ITEMS[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => {
        const currentIndex = ITEMS.findIndex((item) => item.id === prev.id);
        const nextIndex = (currentIndex + 1) % ITEMS.length;
        return ITEMS[nextIndex];
      });
    }, 4000); // Altera o depoimento a cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="depoimentos" className="bg-neutral-950 text-white py-24 px-6 relative overflow-hidden flex flex-col items-center">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#F7D634]/15 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Side: Statement Display */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col justify-center text-center md:text-left order-2 md:order-1"
        >
          <span className="text-[#F7D634] text-xs font-bold tracking-[0.3em] uppercase mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8">
            A satisfação de viver o <span className="font-semibold text-white">alto padrão</span>.
          </h2>

          
          <div className="bg-neutral-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-md min-h-[220px] flex flex-col justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col justify-between h-full"
              >
                <p className="text-neutral-300 text-lg font-light italic leading-relaxed mb-6">
                  "{activeItem.quote}"
                </p>
                <div>
                  <h4 className="text-white font-semibold text-base">{activeItem.name}</h4>
                  <p className="text-neutral-500 text-xs tracking-wider uppercase mt-0.5">{activeItem.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side: Orbital Ring */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="flex justify-center items-center order-1 md:order-2 h-[400px]"
        >
          <RadialIntro orbitItems={ITEMS} onHoverItem={setActiveItem} stageSize={320} imageSize={56} />
        </motion.div>


      </div>
    </section>
  );
}
