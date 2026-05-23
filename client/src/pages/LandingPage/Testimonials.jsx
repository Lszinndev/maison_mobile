'use client';
import * as React from 'react';
import {
  LayoutGroup,
  motion,
  useAnimate,
  delay,
  AnimatePresence,
} from 'motion/react';
import imgAllan from '../../assets/allan-amaral.webp';
import imgDelei from '../../assets/delei-neo.webp';
import imgEdson from '../../assets/edson-soare.webp';
import imgIeny from '../../assets/ieny-mattos.webp';
import imgJane from '../../assets/jane-ramos.webp';
import imgJulliano from '../../assets/julliano-santos.webp';
import imgMarcos from '../../assets/marcos-lima.webp';
import imgRodrigo from '../../assets/rodrigo-ribas.webp';
const ITEMS = [
  {
    id: 1,
    name: 'Jane Ramos',
    link: 'https://share.google/6yiFXYTNU2TOjVaKv',
    quote: 'Super indico a Maison Mobile, trabalho com dedicação, eficiência e pontualidade na entrega.',
    src: imgJane,
  },
  {
    id: 2,
    name: 'Allan Amaral',
    link: 'https://share.google/qsFRDZc20BRUdPvYX',
    quote: 'Móveis de qualidade excelente trabalho👏🏽👏🏽',
    src: imgAllan,
  },
  {
    id: 3,
    name: 'Ieny Mattos',
    link: 'https://share.google/SHyO6Xofmi1rSWdld',
    quote: 'Trabalho perfeito, capricho pontualidade. Um 10.',
    src: imgIeny,
  },
  {
    id: 4,
    name: 'Delei Neo Beer',
    link: 'https://share.google/uXpGCRI5WkGj9fFye',
    quote: 'A Maison realiza sonhos por que meu quarto e minha cozinha ficou um espetáculo eu imaginei e eles idealizaram. E quando é bom eu indico então fica aqui minha Indicacao.',
    src: imgDelei,
  },
  {
    id: 5,
    name: 'Edson Soare',
    link: 'https://share.google/quqTCJVdhOvacRsrQ',
    quote: 'Serviços espetacular excelente Acabamento e uma pessoal prestativo educados e gentis recomendo',
    src: imgEdson,
  },
  {
    id: 6,
    name: 'Marcos Lima',
    link: 'https://share.google/zjLmj5XpJHwKyg7jU',
    quote: 'Gostei muito do trabalho ,entrega no prazo!',
    src: imgMarcos,
  },
  {
    id: 7,
    name: 'Rodrigo Ribas',
    link: 'https://share.google/E6ICNrBHph1uLOJve',
    quote: 'Pessoal Transformaram Minha Casa e No prazo o que mais me alegrou.. Recomendo tranquilamente.',
    src: imgRodrigo,
  },
  {
    id: 8,
    name: 'Julliano Santos',
    link: 'https://share.google/vWbk0MbL0CzwXGf4O',
    quote: 'Empresa com material de primeira qualidade, entrega dentro do prazo programado e toda assistência quando solicitado! Empresa nota 1000 recomendo.',
    src: imgJulliano,
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
                  className="rounded-full object-cover aspect-square border-2 border-[#F7D634]/50 hover:border-[#F7D634] hover:scale-110 transition-all duration-300"
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
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveItem((prev) => {
        const currentIndex = ITEMS.findIndex((item) => item.id === prev.id);
        const nextIndex = (currentIndex + 1) % ITEMS.length;
        return ITEMS[nextIndex];
      });
    }, 4000); // Altera o depoimento a cada 4 segundos

    return () => clearInterval(interval);
  }, [isPaused]);

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


          <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="bg-neutral-900/40 border border-white/5 p-8 rounded-3xl backdrop-blur-md min-h-[250px] flex flex-col justify-center relative overflow-hidden pointer-events-auto"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-[#F7D634] fill-[#F7D634]"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-neutral-300 text-lg font-light italic leading-relaxed mb-6">
                    "{activeItem.quote}"
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">{activeItem.name}</h4>
                  <a
                    href={activeItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="relative z-20 cursor-pointer pointer-events-auto text-[#F7D634] hover:text-[#f3cd10] text-xs font-semibold tracking-wide transition-colors duration-200 inline-flex items-center gap-1.5 hover:underline"
                  >
                    Acessar avaliação no google
                    <svg
                      className="w-3.5 h-3.5 animate-pulse"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>
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
