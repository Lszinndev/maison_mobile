import React, { useState, useEffect } from 'react';
import { 
  ChefHatIcon, 
  BedIcon, 
  Toilet01Icon, 
  RulerIcon, 
  PaintBucketIcon, 
  UserIcon, 
  Mail01Icon,
  Tick01Icon,
  StarIcon,
  HangerIcon,
  RunningShoesIcon,
  DiamondIcon,
  JoggerPantsIcon,
  BulbIcon,
  MirrorIcon,
  TowelsIcon,
  ShoppingBasket01Icon,
  BlushBrush01Icon,
  CubeIcon,
  HairDryerIcon,
  JarIcon,
  SpoonAndForkIcon,
  RainDropIcon,
  MagicWand01Icon
} from 'hugeicons-react';


export default function BudgetModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ambiente: '',
    largura: '',
    altura: '',
    mdf: '',
    puxadores: '',
    corredicas: false,
    amortecedores: false,
    acessorios: [],
    nome: '',
    email: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;


  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleAmbienteSelect = (ambiente) => {
    setFormData({ ...formData, ambiente, acessorios: [] }); // Reseta acessórios ao mudar ambiente
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAcessorioToggle = (acessorio) => {
    const current = formData.acessorios;
    const updated = current.includes(acessorio)
      ? current.filter((item) => item !== acessorio)
      : [...current, acessorio];
    setFormData({ ...formData, acessorios: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui seria enviada a lógica de backend
    alert(`Orçamento solicitado com sucesso para ${formData.nome}!`);
    onClose();
    setStep(1); // Reseta estado
  };

  // Filtro em Cascata de Acessórios
  const renderAcessoriosStep = () => {
    let options = [];
    if (formData.ambiente === 'Cozinha') {
      options = [
        { name: 'Porta-temperos Deslizante', icon: <JarIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Lixeira Embutida', icon: <CubeIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Divisor de Talheres', icon: <SpoonAndForkIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Canto Mágico (Articulado)', icon: <MagicWand01Icon className="w-5 h-5 text-slate-400" /> },
        { name: 'Iluminação LED Sob Armário', icon: <BulbIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Torneira Monocomando', icon: <RainDropIcon className="w-5 h-5 text-slate-400" /> }
      ];
    } else if (formData.ambiente === 'Quarto') {
      options = [
        { name: 'Cabideiro Basculante', icon: <HangerIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Sapateira Deslizante', icon: <RunningShoesIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Porta-Joias Aveludado', icon: <DiamondIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Calceiro Extraível', icon: <JoggerPantsIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'LED Interno com Sensor', icon: <BulbIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Espelho Articulado', icon: <MirrorIcon className="w-5 h-5 text-slate-400" /> }
      ];
    } else {
      options = [
        { name: 'Toalheiro Térmico', icon: <TowelsIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Espelheira com LED', icon: <MirrorIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Gavetão Aramado de Roupa', icon: <ShoppingBasket01Icon className="w-5 h-5 text-slate-400" /> },
        { name: 'Organizador de Maquiagem', icon: <BlushBrush01Icon className="w-5 h-5 text-slate-400" /> },
        { name: 'Nicho Iluminado', icon: <CubeIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Porta Secador/Chapinha', icon: <HairDryerIcon className="w-5 h-5 text-slate-400" /> }
      ];
    }


    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-neutral-600 mb-2">Acessórios para {formData.ambiente}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => (
            <label 
              key={option.name} 
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                formData.acessorios.includes(option.name)
                  ? 'bg-[#F7D634]/20 border-[#F7D634] text-neutral-900 font-medium'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-100/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center text-neutral-500">{option.icon}</span>
                <span className="text-xs font-medium">{option.name}</span>
              </div>
              <input 
                type="checkbox"
                checked={formData.acessorios.includes(option.name)}
                onChange={() => handleAcessorioToggle(option.name)}
                className="accent-[#F7D634] w-4 h-4 rounded border-neutral-300"
              />
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white border border-neutral-200 w-full max-w-lg rounded-3xl p-6 relative animate-fade-up">


        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-950 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-100 h-1.5 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-[#F7D634] transition-all duration-500 ease-out"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Step Indicator */}
        <div className="text-[#F7D634] text-xs font-bold tracking-[0.2em] uppercase mb-2">
          Passo {step} de 5
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="min-h-[250px] flex flex-col justify-between">
          
          {/* Passo 1: Ambiente */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Qual ambiente deseja mobiliar?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Cozinha', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400', icon: <ChefHatIcon className="w-8 h-8 text-[#F7D634]" /> },
                  { name: 'Quarto', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400', icon: <BedIcon className="w-8 h-8 text-[#F7D634]" /> },
                  { name: 'Banheiro', img: 'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?q=80&w=400', icon: <Toilet01Icon className="w-8 h-8 text-[#F7D634]" /> }
                ].map((amb) => (
                  <button
                    type="button"
                    key={amb.name}
                    onClick={() => handleAmbienteSelect(amb.name)}
                    className={`relative h-40 rounded-2xl overflow-hidden border-2 transition-all transform hover:scale-105 ${
                      formData.ambiente === amb.name
                        ? 'border-[#F7D634]'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}

                  >
                    <img src={amb.img} alt={amb.name} className="absolute inset-0 w-full h-full object-cover brightness-[0.4] hover:brightness-[0.6] transition-all" />

                    <div className="absolute inset-0 flex flex-col justify-end items-center pb-4 z-10">
                      <span className="text-3xl mb-2">{amb.icon}</span>
                      <span className="text-sm font-semibold tracking-wider text-white uppercase">{amb.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Passo 2: Medidas e Material */}
          {step === 2 && (

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Medidas & Material</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-1 uppercase flex items-center gap-1">
                    <RulerIcon className="w-4 h-4 text-[#F7D634]" /> Largura (m)
                  </label>
                  <input 
                    type="number" 
                    name="largura"
                    value={formData.largura}
                    onChange={handleInputChange}
                    placeholder="Ex: 2.50"
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 text-sm focus:border-[#F7D634] focus:outline-none transition-all placeholder:text-neutral-400"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-1 uppercase flex items-center gap-1">
                    <RulerIcon className="w-4 h-4 text-[#F7D634] transform rotate-90" /> Altura (m)
                  </label>
                  <input 
                    type="number" 
                    name="altura"
                    value={formData.altura}
                    onChange={handleInputChange}
                    placeholder="Ex: 2.80"
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 text-sm focus:border-[#F7D634] focus:outline-none transition-all placeholder:text-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-3 uppercase flex items-center gap-1">
                  <PaintBucketIcon className="w-4 h-4 text-[#F7D634]" /> Padrão de MDF
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Amadeirado Claro', icon: <PaintBucketIcon className="w-4 h-4 text-white" />, color: 'bg-amber-800' },
                    { name: 'Amadeirado Escuro', icon: <PaintBucketIcon className="w-4 h-4 text-white" />, color: 'bg-amber-950' },
                    { name: 'Laca Branca', icon: <PaintBucketIcon className="w-4 h-4 text-neutral-900" />, color: 'bg-white border border-neutral-200' },
                    { name: 'Grafite Fosco', icon: <PaintBucketIcon className="w-4 h-4 text-white" />, color: 'bg-neutral-700' }
                  ].map((style) => (
                    <button
                      type="button"
                      key={style.name}
                      onClick={() => setFormData({ ...formData, mdf: style.name })}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        formData.mdf === style.name
                          ? 'bg-[#F7D634]/20 border-[#F7D634] text-neutral-900 font-medium'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                      }`}

                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${style.color}`}>
                        {style.icon}
                      </span>
                      <span className="text-xs font-medium">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Passo 3: Ferragens */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Ferragens</h2>
              
              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-3 uppercase flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-[#F7D634]" /> Tipo de Puxadores
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Cava (Usinado)', icon: <StarIcon className="w-4 h-4 text-[#F7D634]" /> },
                    { name: 'Perfil Alumínio', icon: <StarIcon className="w-4 h-4 text-[#F7D634]" /> },
                    { name: 'Alça Externo', icon: <StarIcon className="w-4 h-4 text-[#F7D634]" /> },
                    { name: 'Toque (Push)', icon: <StarIcon className="w-4 h-4 text-[#F7D634]" /> }
                  ].map((puxador) => (
                    <button
                      type="button"
                      key={puxador.name}
                      onClick={() => setFormData({ ...formData, puxadores: puxador.name })}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                        formData.puxadores === puxador.name
                          ? 'bg-[#F7D634]/20 border-[#F7D634] text-neutral-900 font-medium'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      <span className="text-xl bg-neutral-100 w-8 h-8 rounded-lg flex items-center justify-center">
                        {puxador.icon}
                      </span>
                      <span className="text-xs font-medium">{puxador.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-700">
                  <div className="flex items-center gap-3">
                    <StarIcon className="w-5 h-5 text-[#F7D634]" />
                    <span className="text-sm font-medium">Corrediças Ocultas / Telescópicas</span>
                  </div>
                  <input 
                    type="checkbox" 
                    name="corredicas"
                    checked={formData.corredicas}
                    onChange={handleInputChange}
                    className="accent-[#F7D634] w-4 h-4 rounded"
                  />
                </label>
                
                <label className="flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all bg-neutral-50 border-neutral-200 hover:border-neutral-300 text-neutral-700">
                  <div className="flex items-center gap-3">
                    <StarIcon className="w-5 h-5 text-[#F7D634]" />
                    <span className="text-sm font-medium">Dobradiças com Amortecedor</span>
                  </div>
                  <input 
                    type="checkbox" 
                    name="amortecedores"
                    checked={formData.amortecedores}
                    onChange={handleInputChange}
                    className="accent-[#F7D634] w-4 h-4 rounded"
                  />
                </label>
              </div>
            </div>
          )}

          {/* Passo 4: Acessórios */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Upgrades & Acessórios</h2>
              {renderAcessoriosStep()}
            </div>
          )}


          {/* Passo 5: Contato */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Dados de Contato</h2>

              
              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-1 uppercase flex items-center gap-1">
                  <UserIcon className="w-4 h-4 text-[#F7D634]" /> Seu Nome
                </label>
                <input 
                  type="text" 
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome completo"
                  required
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 text-sm focus:border-[#F7D634] focus:outline-none transition-all placeholder:text-neutral-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-1 uppercase flex items-center gap-1">
                  <Mail01Icon className="w-4 h-4 text-[#F7D634]" /> Seu E-mail
                </label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seuemail@exemplo.com"
                  required
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 text-sm focus:border-[#F7D634] focus:outline-none transition-all placeholder:text-neutral-400"
                />
              </div>
            </div>
          )}

          {/* Navigation Footer */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-neutral-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-neutral-400 hover:text-neutral-950 transition-colors"
              >

                Voltar
              </button>
            ) : (
              <div /> // Espaçador
            )}

            {step < 5 ? (
              step !== 1 && ( // No passo 1, selecionar o botão já avança automaticamente
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2.5 bg-[#F7D634] hover:bg-[#e5c323] text-neutral-950 text-xs font-bold tracking-wider uppercase rounded-xl transition-all"
                >
                  Próximo
                </button>
              )
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#F7D634] hover:bg-[#e5c323] text-neutral-950 text-xs font-bold tracking-wider uppercase rounded-xl transition-all"
              >
                Finalizar Orçamento
              </button>
            )}

          </div>
        </form>
      </div>
    </div>
  );
}
