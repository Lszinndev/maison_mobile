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
  DiamondIcon,
  JoggerPantsIcon,
  FileAttachmentIcon,
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
  Settings01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  WashingMachineIcon,
  Menu01Icon,
  Message01Icon
} from 'hugeicons-react';

import cozinhaImg from '../assets/467670809_18249282280278373_4023181893267405786_n.webp';
import quartoImg from '../assets/quarto.webp';
import banheiroImg from '../assets/banheiro.webp';

const initialFormState = {
  ambiente: '',
  largura: '',
  altura: '',
  estilo: '',
  mdf: '',
  marcaFerragem: '',
  acessorios: [],
  puxadores: '',
  nome: '',
  email: '',
  telefone: '',
  descricao: '',
  fotos: []
};

export default function BudgetModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormState);

  const [isChatFinished, setIsChatFinished] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setStep(1);
      setFormData(initialFormState);
      setIsChatFinished(false);
      setIsBotTyping(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => {
    if (isStepValid(step)) {
      setStep((prev) => Math.min(prev + 1, 7));
    }
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isStepValid = (stepNum) => {
    switch (stepNum) {
      case 1: return formData.ambiente !== '';
      case 2: return formData.largura !== '' && formData.altura !== '' && formData.estilo !== '';
      case 3: return formData.mdf !== '' && formData.marcaFerragem !== '';
      case 4: return true; // Acessórios são opcionais
      case 5: return formData.puxadores !== '';
      case 6: return formData.nome.trim() !== '' && validateEmail(formData.email) && formData.telefone.trim() !== '';
      default: return true;
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const MAX_SIZE = 100 * 1024; // 100kb in bytes

    files.forEach(file => {
      if (file.size > MAX_SIZE) {
        alert(`A imagem "${file.name}" excede o limite máximo permitido de 100KB (ela tem ${(file.size / 1024).toFixed(1)}KB). Por favor, envie uma imagem menor.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          fotos: [...prev.fotos, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;

    // Remove tudo que não for dígito
    const clean = value.replace(/\D/g, '');

    // Se estiver vazio ou for zero, limpa o campo
    const parsed = parseInt(clean, 10);
    if (isNaN(parsed) || parsed === 0) {
      setFormData({ ...formData, [name]: '' });
      return;
    }

    // Converte para decimal (dividindo por 100)
    const num = parsed / 100;

    // Se o valor resultante for maior que 10.00 metros, bloqueia a inserção (ignora o input)
    if (num > 10) {
      return;
    }

    setFormData({ ...formData, [name]: num.toFixed(2) });
  };

  const handleNumericBlur = (e) => {
    const { name, value } = e.target;
    if (!value) return;
    const num = parseFloat(value);
    if (!isNaN(num)) {
      const formatted = Math.min(num, 10).toFixed(2);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    }
  };

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 7) {
      val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
    } else if (val.length > 2) {
      val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    } else if (val.length > 0) {
      val = `(${val}`;
    }
    setFormData({ ...formData, telefone: val });
  };

  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[0-9]/g, '');
    setFormData({ ...formData, nome: val });
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
    setStep(7); // Ir para o chat final
  };

  const handleSendToBot = async () => {
    if (!formData.descricao.trim()) return;

    setIsBotTyping(true);

    try {
      const response = await fetch('http://localhost:3000/api/orcamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          budget: {
            ambiente: formData.ambiente,
            mdf: formData.mdf,
            estilo: formData.estilo,
            ferragens: formData.marcaFerragem,
            puxadores: formData.puxadores,
            medidas: `${formData.largura}m x ${formData.altura}m`,
            whatsapp: formData.telefone,
            acessorios: formData.acessorios,
            descricao: formData.descricao,
            fotos: formData.fotos
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar orçamento');
      }

      setIsBotTyping(false);
      setIsChatFinished(true);
    } catch (error) {
      console.error(error);
      setIsBotTyping(false);
      alert('Houve um erro ao enviar seu orçamento. Tente novamente.');
    }
  };

  const renderAcessorios = () => {
    let options = [];
    if (formData.ambiente === 'Cozinha') {
      options = [
        { name: 'Lixeira Zen', icon: <CubeIcon size={18} /> },
        { name: 'Porta-talheres PVC', icon: <SpoonAndForkIcon size={18} /> },
        { name: 'Porta-talheres Personalizada', icon: <SpoonAndForkIcon size={18} /> },
        { name: 'Porta-temperos MDF', icon: <JarIcon size={18} /> },
        { name: 'Porta-temperos Aramado', icon: <JarIcon size={18} /> },
        { name: 'Iluminação LED/Spot', icon: <BulbIcon size={18} /> }
      ];
    } else if (formData.ambiente === 'Closet') {
      options = [
        { name: 'Cabideiro Vesto', icon: <HangerIcon size={18} /> },
        { name: 'Cabideiro Oval', icon: <HangerIcon size={18} /> },
        { name: 'Calceiro', icon: <JoggerPantsIcon size={18} /> },
        { name: 'Gaveta Porta-joia', icon: <DiamondIcon size={18} /> },
        { name: 'Sistema de Portas de Correr', icon: <SquareIcon size={18} /> },
        { name: 'Iluminação LED/Spot', icon: <BulbIcon size={18} /> }
      ];
    } else {
      // B.W.C / Lavanderia
      options = [
        { name: 'Espelhos', icon: <MirrorIcon size={18} /> },
        { name: 'Tulha Aramado', icon: <ShoppingBasket01Icon size={18} /> },
        { name: 'Tulha MDF', icon: <ShoppingBasket01Icon size={18} /> },
        { name: 'Iluminação LED/Spot', icon: <BulbIcon size={18} /> }
      ];
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
        {options.map((opt) => (
          <button
            key={opt.name}
            type="button"
            onClick={() => handleAcessorioToggle(opt.name)}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${formData.acessorios.includes(opt.name)
              ? 'bg-[#F7D634]/10 border-[#F7D634] text-black shadow-sm'
              : 'bg-white border-neutral-100 text-neutral-800 hover:border-neutral-300 cursor-pointer'
              }`}
          >
            <div className="flex items-center gap-3">
              <span className={formData.acessorios.includes(opt.name) ? 'text-[#F7D634]' : 'text-neutral-400'}>{opt.icon}</span>
              <span className="text-[13px] font-semibold">{opt.name}</span>
            </div>
            {formData.acessorios.includes(opt.name) && <Tick01Icon size={16} className="text-[#F7D634]" />}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl animate-fade-in">
      <div className="bg-white w-full max-w-2xl max-h-[95vh] rounded-[32px] shadow-2xl relative animate-fade-up overflow-hidden flex flex-col">

        {/* Progress Header */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-neutral-100 overflow-hidden">
          <div
            className="h-full bg-[#F7D634] transition-all duration-500 ease-out"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 text-neutral-400 hover:text-black transition-all z-20 cursor-pointer">
          <Cancel01Icon size={24} />
        </button>

        <div className="p-6 md:p-10 flex-1 overflow-y-auto scrollbar-hide">
          {step <= 6 && (
            <div className="mb-6 flex items-center gap-2">
              <span className="px-2.5 py-1 bg-[#F7D634] text-black text-[10px] font-bold rounded-md tracking-wider">PASSO {step}</span>
              <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest">de 6</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col h-full">

            {/* STEP 1: AMBIENTE */}
            {step === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Qual ambiente deseja mobiliar?</h2>
                  <p className="text-neutral-800">Selecione o espaço para começarmos o seu orçamento personalizado.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'Cozinha', name: 'Cozinha', img: cozinhaImg, icon: <ChefHatIcon size={28} /> },
                    { id: 'Closet', name: 'Closet', img: quartoImg, icon: <BedIcon size={28} /> },
                    { id: 'Banheiro', name: 'B.W.C. / Banheiro', img: banheiroImg, icon: <Toilet01Icon size={28} /> },
                    { id: 'Lavanderia', name: 'Lavanderia', img: banheiroImg, icon: <WashingMachineIcon size={28} /> }
                  ].map((amb) => (
                    <button
                      key={amb.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, ambiente: amb.id });
                        setStep(2);
                      }}
                      className={`group relative h-40 rounded-3xl overflow-hidden border-2 transition-all ${formData.ambiente === amb.id ? 'border-[#F7D634]' : 'border-transparent hover:scale-[1.02] cursor-pointer'
                        }`}
                    >
                      <img src={amb.img} className="absolute inset-0 w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.6] transition-all" />
                      <div className="absolute inset-0 flex flex-col justify-end p-5 text-white text-left">
                        <div className="bg-white/10 backdrop-blur-md w-fit p-2.5 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                          {amb.icon}
                        </div>
                        <span className="text-base font-bold tracking-tight">{amb.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: MEDIDAS & ESTILO */}
            {step === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold tracking-tight">Medidas & Estilo</h2>
                  <p className="text-sm text-neutral-800">Defina o tamanho aproximado e a estética do seu móvel.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-widest flex items-center gap-2">
                      <RulerIcon size={14} /> Largura (m)
                    </label>
                    <input
                      type="text" name="largura" value={formData.largura} onChange={handleNumericChange} onBlur={handleNumericBlur}
                      placeholder="Ex: 2.50" className="w-full bg-neutral-50 border-none rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#F7D634]/50 transition-all font-medium text-black placeholder:text-neutral-400"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-widest flex items-center gap-2">
                      <RulerIcon size={14} className="rotate-90" /> Altura (m)
                    </label>
                    <input
                      type="text" name="altura" value={formData.altura} onChange={handleNumericChange} onBlur={handleNumericBlur}
                      placeholder="Ex: 2.70" className="w-full bg-neutral-50 border-none rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-[#F7D634]/50 transition-all font-medium text-black placeholder:text-neutral-400"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-widest flex items-center gap-2">
                    <MagicWand01Icon size={14} /> Estética do Projeto
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Liso', 'Provençal', 'Com Palhinha', 'Industrial'].map(style => (
                      <button
                        key={style} type="button" onClick={() => setFormData({ ...formData, estilo: style })}
                        className={`p-4 rounded-2xl border text-left transition-all ${formData.estilo === style ? 'bg-black text-white border-black' : 'bg-white border-neutral-100 text-neutral-500 hover:border-neutral-300 cursor-pointer'
                          }`}
                      >
                        <span className="text-[14px] font-semibold">{style}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: MATERIAIS & FERRAGENS */}
            {step === 3 && (
              <div className="space-y-12 animate-fade-in">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Materiais & Marcas</h2>
                  <p className="text-neutral-800">A qualidade Maison Mobile começa na escolha dos materiais.</p>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-widest flex items-center gap-2">
                    <PaintBucketIcon size={14} /> Acabamento
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['MDF Melamínico', 'Laca', 'Lâmina Natural', 'Metal/Fórmica'].map(mat => (
                      <button
                        key={mat} type="button" onClick={() => setFormData({ ...formData, mdf: mat })}
                        className={`p-4 rounded-2xl border text-left transition-all ${formData.mdf === mat ? 'bg-black text-white border-black' : 'bg-white border-neutral-100 text-neutral-500 hover:border-neutral-300 cursor-pointer'
                          }`}
                      >
                        <span className="text-[14px] font-semibold">{mat}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[11px] font-bold text-neutral-800 uppercase tracking-widest flex items-center gap-2">
                    <StarIcon size={14} /> Marca das Ferragens
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['Blum', 'Hafele', 'FGV', 'Hettich'].map(brand => (
                      <button
                        key={brand} type="button" onClick={() => setFormData({ ...formData, marcaFerragem: brand })}
                        className={`py-4 rounded-xl border text-center transition-all ${formData.marcaFerragem === brand ? 'bg-[#F7D634] text-black border-[#F7D634] font-bold' : 'bg-neutral-50 border-transparent text-neutral-400 hover:border-neutral-200 cursor-pointer'
                          }`}
                      >
                        <span className="text-[12px]">{brand}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: ACESSÓRIOS */}
            {step === 4 && (
              <div className="space-y-12 animate-fade-in">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Upgrades para {formData.ambiente}</h2>
                  <p className="text-neutral-800">Adicione funcionalidades extras para tornar seu espaço mais prático.</p>
                </div>
                {renderAcessorios()}
              </div>
            )}

            {/* STEP 5: PUXADORES */}
            {step === 5 && (
              <div className="space-y-12 animate-fade-in">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Puxadores</h2>
                  <p className="text-neutral-800">O toque final que define o design do seu projeto.<br />Defina o tipo dos puxadores:</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    'Cava (Usinado no MDF)',
                    'Perfil Alumínio',
                    'Alça Externo',
                    'Sistema Toque (Push)',
                    'Escolhido em Loja / Pelo Cliente'
                  ].map(pux => (
                    <button
                      key={pux} type="button" onClick={() => setFormData({ ...formData, puxadores: pux })}
                      className={`flex items-center gap-4 p-5 rounded-2xl border transition-all ${formData.puxadores === pux ? 'bg-black text-white border-black' : 'bg-white border-neutral-100 text-neutral-500 hover:border-neutral-300 cursor-pointer'
                        }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 ${formData.puxadores === pux ? 'bg-[#F7D634] border-[#F7D634]' : 'border-neutral-200'}`} />
                      <span className="text-[14px] font-semibold">{pux}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: CONTATO */}
            {step === 6 && (
              <div className="space-y-12 animate-fade-in">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight">Finalizar Orçamento</h2>
                  <p className="text-neutral-800">Falta pouco! Deixe seus contatos para enviarmos a proposta.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-800 uppercase tracking-[0.2em] ml-1">Nome Completo</label>
                    <div className="relative">
                      <UserIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input type="text" name="nome" value={formData.nome} onChange={handleNameChange} required className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#F7D634]/50 transition-all font-medium text-black placeholder:text-neutral-400" placeholder="Como deseja ser chamado?" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-800 uppercase tracking-[0.2em] ml-1">Seu E-mail</label>
                    <div className="relative">
                      <Mail01Icon size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formData.email && !validateEmail(formData.email) ? 'text-red-500' : 'text-neutral-400'}`} />
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        required 
                        className={`w-full pl-12 pr-4 py-4 bg-neutral-50 rounded-2xl outline-none transition-all font-medium text-black placeholder:text-neutral-400 border-2 ${
                          formData.email && !validateEmail(formData.email)
                            ? 'border-red-500/50 focus:ring-2 focus:ring-red-500/20'
                            : 'border-transparent focus:ring-2 focus:ring-[#F7D634]/50'
                        }`} 
                        placeholder="exemplo@email.com" 
                      />
                    </div>
                    {formData.email && !validateEmail(formData.email) && (
                      <span className="text-[10px] text-red-500 font-semibold ml-1 block animate-fade-in">
                        Por favor, insira um e-mail válido (ex: nome@dominio.com).
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-neutral-800 uppercase tracking-[0.2em] ml-1">WhatsApp</label>
                    <div className="relative">
                      <Message01Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input type="tel" name="telefone" value={formData.telefone} onChange={handlePhoneChange} required className="w-full pl-12 pr-4 py-4 bg-neutral-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-[#F7D634]/50 transition-all font-medium text-black placeholder:text-neutral-400" placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: INTERACTIVE CHAT SIMULATION */}
            {step === 7 && (
              <div className="flex flex-col h-full animate-fade-in space-y-6 pb-4 scrollbar-hide overflow-y-auto">
                {/* Bot Message 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F7D634] flex items-center justify-center shrink-0 shadow-lg shadow-[#F7D634]/20">
                    <Message01Icon size={20} className="text-black" />
                  </div>
                  <div className="bg-[#F2F2F7] p-6 rounded-[24px] rounded-tl-none border border-neutral-100 max-w-[85%]">
                    <p className="text-[15px] leading-relaxed text-black">
                      Olá <strong>{formData.nome.split(' ')[0]}</strong>! Para finalizarmos com perfeição, conte-me um pouco mais sobre sua ideia ou alguma necessidade específica para seu projeto de <strong>{formData.ambiente}</strong>.
                    </p>
                  </div>
                </div>

                {/* User Input or Sent Message */}
                {isChatFinished || isBotTyping ? (
                  <div className="flex justify-end animate-fade-in">
                    <div className="bg-black text-white p-6 rounded-[24px] rounded-tr-none max-w-[85%] shadow-xl">
                      <p className="text-[15px] leading-relaxed italic">"{formData.descricao}"</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-up delay-200 px-2">
                    <textarea
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      placeholder="Ex: Quero uma cozinha com ilha central e espaço para embutir forno elétrico..."
                      className="w-full bg-neutral-50 border-none rounded-[32px] px-10 py-10 text-black text-[15px] outline-none focus:ring-2 focus:ring-[#F7D634]/50 transition-all min-h-[180px] resize-none placeholder:text-neutral-400 shadow-inner"
                    />

                    <div className="px-4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {formData.fotos.map((src, idx) => (
                          <div key={idx} className="relative w-14 h-14 rounded-xl overflow-hidden border border-neutral-200 shadow-sm animate-fade-in">
                            <img src={src} className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removePhoto(idx)} className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5 hover:bg-red-500 transition-colors"><Cancel01Icon size={10} /></button>
                          </div>
                        ))}
                      </div>

                      <label className="flex items-center gap-3 p-4 bg-[#F7D634]/5 border-2 border-dashed border-[#F7D634]/30 rounded-2xl cursor-pointer hover:bg-[#F7D634]/10 transition-all group">
                        <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                        <div className="bg-[#F7D634] p-2 rounded-xl text-black shadow-sm group-hover:scale-110 transition-transform">
                          <FileAttachmentIcon size={18} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-black">Anexar Fotos de Referência</span>
                          <span className="text-[11px] text-neutral-500">Clique para selecionar arquivos do seu dispositivo</span>
                        </div>
                      </label>

                      <button
                        type="button"
                        onClick={handleSendToBot}
                        className="w-full py-4 bg-black text-white font-bold rounded-2xl hover:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        Enviar orçamento e detalhes <ArrowRight01Icon size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Bot Final Response */}
                {isBotTyping && (
                  <div className="flex items-center gap-2 pl-14 text-neutral-400 animate-pulse">
                    <span className="text-[12px] font-bold tracking-widest uppercase">Maison Bot está digitando...</span>
                  </div>
                )}

                {isChatFinished && (
                  <div className="flex items-start gap-4 animate-fade-in">
                    <div className="w-10 h-10 rounded-full bg-[#F7D634] flex items-center justify-center shrink-0">
                      <Message01Icon size={20} className="text-black" />
                    </div>
                    <div className="bg-[#F2F2F7] p-8 rounded-[32px] rounded-tl-none space-y-4 border border-neutral-100 shadow-sm max-w-[85%]">
                      <p className="text-[15px] leading-relaxed text-neutral-800">
                        Entendido! Recebemos sua ideia e os detalhes técnicos: <strong>{formData.estilo}</strong> em <strong>{formData.mdf}</strong>.
                      </p>
                      <p className="text-[15px] leading-relaxed text-neutral-800">
                        Nossos projetistas já estão analisando tudo. Em breve entraremos em contato pelo seu WhatsApp ou E-mail!
                      </p>
                      <button onClick={onClose} className="w-full mt-4 py-4 bg-black text-white font-bold rounded-2xl hover:scale-[0.98] transition-all">
                        Entendido, obrigado!
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            {step <= 6 && (
              <div className="mt-auto pt-10 flex justify-between items-center">
                {step > 1 ? (
                  <button type="button" onClick={prevStep} className="text-[12px] font-bold text-neutral-800 uppercase tracking-widest hover:text-black transition-colors cursor-pointer">Voltar</button>
                ) : <div />}

                {step === 1 ? null : step === 6 ? (
                  <button
                    type="submit"
                    disabled={!isStepValid(6)}
                    className="px-8 py-4 bg-black text-white text-[13px] font-bold rounded-2xl hover:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    Enviar Solicitação <ArrowRight01Icon size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid(step)}
                    className="px-8 py-4 bg-black text-white text-[13px] font-bold rounded-2xl hover:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    Próximo Passo <ArrowRight01Icon size={18} />
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
