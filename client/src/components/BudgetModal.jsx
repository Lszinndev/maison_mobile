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
  MagicWand01Icon,
  SquareIcon,
  GridIcon,
  Settings01Icon
} from 'hugeicons-react';

import cozinhaImg from '../assets/467670809_18249282280278373_4023181893267405786_n.webp';
import quartoImg from '../assets/quarto.webp';
import banheiroImg from '../assets/banheiro.webp';


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
    marcaFerragem: '',
    estilo: '',
    acessorios: [],
    descricao: '',
    nome: '',
    email: '',
    telefone: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Resetar para o Passo 1 e limpar o formulário ao fechar o modal
      setStep(1);
      setFormData({
        ambiente: '',
        largura: '',
        altura: '',
        mdf: '',
        puxadores: '',
        corredicas: false,
        amortecedores: false,
        marcaFerragem: '',
        estilo: '',
        acessorios: [],
        descricao: '',
        nome: '',
        email: '',
        telefone: ''
      });
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);


  if (!isOpen) return null;


  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
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

    // Definir pares de exclusão mútua (Cozinha, Quarto e Banheiro)
    const mutualExclusions = [
      ['Lixeira Zen', 'Lixeira Hettich'],
      ['Porta-talheres PVC', 'Porta-talheres Personalizada'],
      ['Porta-temperos MDF', 'Porta-temperos Aramado'],
      ['Cabideiro Vesto', 'Cabideiro Oval'],
      ['Tulha Aramado', 'Tulha MDF']
    ];

    let updated = [...current];

    if (current.includes(acessorio)) {
      // Se já está selecionado, removemos
      updated = updated.filter((item) => item !== acessorio);
    } else {
      // Se não está selecionado, verificamos se faz parte de um par exclusivo
      const pair = mutualExclusions.find(p => p.includes(acessorio));
      if (pair) {
        const other = pair.find(item => item !== acessorio);
        updated = updated.filter(item => item !== other);
      }
      updated.push(acessorio);
    }

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
        { name: 'Lixeira Zen', icon: <CubeIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Lixeira Hettich', icon: <CubeIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Porta-talheres PVC', icon: <SpoonAndForkIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Porta-talheres Personalizada', icon: <SpoonAndForkIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Porta-temperos MDF', icon: <JarIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Porta-temperos Aramado', icon: <JarIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'LED/Spot', icon: <BulbIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Tomadas', icon: <Settings01Icon className="w-5 h-5 text-slate-400" /> }
      ];
    } else if (formData.ambiente === 'Quarto') {
      options = [
        { name: 'Cabideiro Vesto', icon: <HangerIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Cabideiro Oval', icon: <HangerIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Calceiro', icon: <JoggerPantsIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Gaveta Porta-joia', icon: <DiamondIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Tomadas', icon: <Settings01Icon className="w-5 h-5 text-slate-400" /> },
        { name: 'LED/Spot', icon: <BulbIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Sistema de Portas de Correr', icon: <SquareIcon className="w-5 h-5 text-slate-400" /> }
      ];
    } else {
      options = [
        { name: 'Espelhos', icon: <MirrorIcon className="w-5 h-5 text-slate-400" /> },
        { name: 'Tulha Aramado', icon: <ShoppingBasket01Icon className="w-5 h-5 text-slate-400" /> },
        { name: 'Tulha MDF', icon: <ShoppingBasket01Icon className="w-5 h-5 text-slate-400" /> },
        { name: 'Tomadas', icon: <Settings01Icon className="w-5 h-5 text-slate-400" /> },
        { name: 'LED/Spot', icon: <BulbIcon className="w-5 h-5 text-slate-400" /> }
      ];
    }


    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-neutral-600 mb-2">Acessórios para {formData.ambiente}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((option) => (
            <label
              key={option.name}
              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${formData.acessorios.includes(option.name)
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
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* Step Indicator */}
        <div className="text-[#F7D634] text-xs font-bold tracking-[0.2em] uppercase mb-2">
          Passo {step} de 6
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="min-h-[250px] flex flex-col justify-between">

          {/* Passo 1: Ambiente */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Qual ambiente deseja mobiliar?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Cozinha', img: cozinhaImg, icon: <ChefHatIcon className="w-8 h-8 text-[#F7D634]" /> },
                  { name: 'Quarto', img: quartoImg, icon: <BedIcon className="w-8 h-8 text-[#F7D634]" /> },
                  { name: 'Banheiro', img: banheiroImg, icon: <Toilet01Icon className="w-8 h-8 text-[#F7D634]" /> }
                ].map((amb) => (
                  <button
                    type="button"
                    key={amb.name}
                    onClick={() => handleAmbienteSelect(amb.name)}
                    className={`relative h-40 rounded-2xl overflow-hidden border-2 transition-all transform hover:scale-105 ${formData.ambiente === amb.name
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
                  <MagicWand01Icon className="w-4 h-4 text-[#F7D634]" /> Estilo do Móvel
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Liso', icon: <SquareIcon className="w-4 h-4" /> },
                    { name: 'Provençal', icon: <MagicWand01Icon className="w-4 h-4" /> },
                    { name: 'C/Palhinha', icon: <GridIcon className="w-4 h-4" /> },
                    { name: 'Industrial', icon: <Settings01Icon className="w-4 h-4" /> }
                  ].map((style) => (
                    <button
                      type="button"
                      key={style.name}
                      onClick={() => setFormData({ ...formData, estilo: style.name })}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${formData.estilo === style.name
                        ? 'bg-[#F7D634]/20 border-[#F7D634] text-neutral-900 font-medium'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                        }`}
                    >
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 bg-white border border-slate-100">
                        {style.icon}
                      </span>
                      <span className="text-xs font-medium">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-3 uppercase flex items-center gap-1">
                  <PaintBucketIcon className="w-4 h-4 text-[#F7D634]" /> Acabamentos
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'MDF Melamínico', icon: <PaintBucketIcon className="w-4 h-4 text-white" />, color: 'bg-amber-800' },
                    { name: 'MDF c/ Pintura Laca', icon: <PaintBucketIcon className="w-4 h-4 text-neutral-900" />, color: 'bg-white border border-neutral-200' },
                    { name: 'Lâmina Natural', icon: <PaintBucketIcon className="w-4 h-4 text-white" />, color: 'bg-amber-950' },
                    { name: 'Metal/Fórmica', icon: <PaintBucketIcon className="w-4 h-4 text-white" />, color: 'bg-neutral-700' }
                  ].map((style) => (
                    <button
                      type="button"
                      key={style.name}
                      onClick={() => setFormData({ ...formData, mdf: style.name })}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${formData.mdf === style.name
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
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${formData.puxadores === puxador.name
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

              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-3 uppercase flex items-center gap-1">
                  <DiamondIcon className="w-4 h-4 text-[#F7D634]" /> Marcas de Ferragens
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Blum', 'Häfele', 'FGV/TN'].map((marca) => (
                    <button
                      type="button"
                      key={marca}
                      onClick={() => setFormData({ ...formData, marcaFerragem: marca })}
                      className={`flex items-center justify-center p-3 rounded-xl border transition-all text-xs font-bold ${formData.marcaFerragem === marca
                        ? 'bg-[#F7D634]/20 border-[#F7D634] text-neutral-900'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:border-neutral-300'
                        }`}
                    >
                      {marca}
                    </button>
                  ))}
                </div>
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


          {/* Passo 5: Descrição do Projeto */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Descrição do Projeto</h2>
              <p className="text-xs text-neutral-500 mb-4 font-medium uppercase tracking-wider">Opcional</p>

              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-2 uppercase flex items-center gap-1">
                  <MagicWand01Icon className="w-4 h-4 text-[#F7D634]" /> Detalhes Adicionais
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Conte-nos mais sobre sua ideia, necessidades específicas ou referências..."
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-4 text-neutral-900 text-sm focus:border-[#F7D634] focus:outline-none transition-all placeholder:text-neutral-400 min-h-[150px] resize-none"
                />
              </div>
            </div>
          )}


          {/* Passo 6: Contato */}
          {step === 6 && (
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

              <div>
                <label className="block text-xs font-semibold tracking-wider text-neutral-500 mb-1 uppercase flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#F7D634]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg> Seu Telefone (WhatsApp)
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="(00) 00000-0000"
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

            {step < 6 ? (
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
