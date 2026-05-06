import React, { useState, useEffect } from 'react';
import { 
  Cancel01Icon, 
  PrinterIcon, 
  Message01Icon, 
  SquareIcon,
  Tick01Icon,
  CircleIcon,
  PencilEdit01Icon,
  ViewIcon
} from 'hugeicons-react';
import logoImg from '../assets/logo.webp';

export default function ProposalModal({ isOpen, onClose, lead }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    if (lead) {
      setEditedData({
        name: lead.name,
        ambiente: lead.budget.ambiente,
        estilo: lead.budget.estilo,
        mdf: lead.budget.mdf,
        ferragens: lead.budget.ferragens || lead.budget.marcaFerragem || 'N/A',
        medidas: lead.budget.medidas || 'Sob Medida',
        puxadores: lead.budget.puxadores || 'N/A',
        descricao: lead.budget.descricao,
        valor: '',
        validade: '15 dias'
      });
    }
  }, [lead]);

  if (!isOpen || !lead || !editedData) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const message = `Olá ${editedData.name}, aqui é da Maison Mobile! %0A%0ARecebemos sua solicitação para o projeto de ${editedData.ambiente}.%0A%0A*Resumo do Projeto:*%0A- Estilo: ${editedData.estilo}%0A- Acabamento: ${editedData.mdf}%0A- Ferragens: ${editedData.ferragens}%0A%0A*Observações:* ${editedData.descricao}%0A%0A*Investimento Estimado:* ${editedData.valor || 'A definir'}%0A%0AVamos agendar uma reunião para detalharmos os valores?`;
    
    const phone = lead.budget.whatsapp?.replace(/\D/g, '') || '';
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/40 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white print:backdrop-blur-none">
      
      {/* Container do Modal */}
      <div className="bg-white w-full max-w-5xl h-full max-h-[95vh] overflow-hidden rounded-[40px] shadow-2xl flex flex-col animate-fade-up print:max-h-none print:rounded-none print:shadow-none">
        
        {/* Header - Escondido no Print */}
        <header className="p-8 border-b flex justify-between items-center shrink-0 print:hidden bg-neutral-50/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#F7D634] rounded-xl flex items-center justify-center shadow-lg shadow-[#F7D634]/20">
              <Tick01Icon size={20} className="text-black" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Editor de Proposta</h2>
              <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-widest">Ajuste os campos antes de gerar o documento</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`px-5 py-2.5 text-[13px] font-bold rounded-xl transition-all flex items-center gap-2 border ${
                isEditing 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {isEditing ? <ViewIcon size={18} /> : <PencilEdit01Icon size={18} />}
              {isEditing ? 'Visualizar Documento' : 'Editar Campos'}
            </button>

            <div className="w-px h-6 bg-neutral-200 mx-2" />

            <button 
              onClick={handlePrint}
              className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-black text-[13px] font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <PrinterIcon size={18} /> Imprimir PDF
            </button>
            <button 
              onClick={handleWhatsApp}
              className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba57] text-white text-[13px] font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-[#25D366]/20"
            >
              <Message01Icon size={18} /> Enviar WhatsApp
            </button>
            
            <button onClick={onClose} className="ml-4 p-2 text-neutral-400 hover:text-black transition-all">
              <Cancel01Icon size={24} />
            </button>
          </div>
        </header>

        {/* Área do Documento */}
        <div className="flex-1 overflow-y-auto p-12 md:p-20 scrollbar-hide bg-[#FDFDFD] print:overflow-visible print:bg-white">
          
          <div className="max-w-[800px] mx-auto space-y-16">
            
            {/* Logo & Info Empresa */}
            <div className="flex justify-between items-start">
              <img src={logoImg} alt="Maison Mobile" className="h-14 w-auto grayscale print:grayscale-0" />
              <div className="text-right space-y-1">
                <p className="text-[10px] font-bold text-[#F7D634] uppercase tracking-[0.2em]">Marcenaria de Alto Padrão</p>
                <p className="text-[12px] text-neutral-500 font-medium">maisonmobile.com.br</p>
                <p className="text-[12px] text-neutral-500 font-medium">(21) 99999-0000</p>
              </div>
            </div>

            {/* Título e Cliente */}
            <div className="space-y-8 pt-10 border-t border-neutral-100">
              <h1 className="text-5xl font-bold tracking-tighter text-black">Especificações do Projeto</h1>
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Preparado para</p>
                  {isEditing ? (
                    <input 
                      className="w-full text-xl font-bold text-black border-b-2 border-[#F7D634] outline-none bg-neutral-50 px-2 py-1"
                      value={editedData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                    />
                  ) : (
                    <>
                      <p className="text-xl font-bold text-black">{editedData.name}</p>
                      <p className="text-sm text-neutral-500">{lead.email}</p>
                    </>
                  )}
                </div>
                <div className="text-right space-y-2">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Validade da Proposta</p>
                  {isEditing ? (
                    <input 
                      className="w-full text-xl font-bold text-black text-right border-b-2 border-[#F7D634] outline-none bg-neutral-50 px-2 py-1"
                      value={editedData.validade}
                      onChange={(e) => handleChange('validade', e.target.value)}
                    />
                  ) : (
                    <>
                      <p className="text-xl font-bold text-black">{editedData.validade}</p>
                      <p className="text-sm text-neutral-500">Emitido em: {new Date().toLocaleDateString('pt-BR')}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Detalhes Técnicos - Grid Editável */}
            <div className="grid grid-cols-2 gap-y-12 gap-x-20">
              <EditableField 
                label="Ambiente Principal" 
                value={editedData.ambiente} 
                isEditing={isEditing} 
                onChange={(val) => handleChange('ambiente', val)} 
              />
              <EditableField 
                label="Estilo de Design" 
                value={editedData.estilo} 
                isEditing={isEditing} 
                onChange={(val) => handleChange('estilo', val)} 
              />
              <EditableField 
                label="Acabamento Externo" 
                value={editedData.mdf} 
                isEditing={isEditing} 
                onChange={(val) => handleChange('mdf', val)} 
              />
              <EditableField 
                label="Padrão de Ferragens" 
                value={editedData.ferragens} 
                isEditing={isEditing} 
                onChange={(val) => handleChange('ferragens', val)} 
              />
              <EditableField 
                label="Dimensões Iniciais" 
                value={editedData.medidas} 
                isEditing={isEditing} 
                onChange={(val) => handleChange('medidas', val)} 
              />
              <EditableField 
                label="Puxadores" 
                value={editedData.puxadores} 
                isEditing={isEditing} 
                onChange={(val) => handleChange('puxadores', val)} 
              />
            </div>

            {/* Acessórios (Visual apenas, mantido para o PDF) */}
            {lead.budget.acessorios && lead.budget.acessorios.length > 0 && (
              <div className="space-y-6 pt-10 border-t border-neutral-100">
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Acessórios Incluídos</p>
                <div className="flex flex-wrap gap-2">
                  {lead.budget.acessorios.map((acc, i) => (
                    <span key={i} className="px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-xl text-xs font-bold text-neutral-700">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Descrição - Texto Longo Editável */}
            <div className="space-y-6 pt-10 border-t border-neutral-100">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Resumo das Necessidades</p>
              {isEditing ? (
                <textarea 
                  className="w-full text-xl leading-relaxed text-neutral-700 italic font-medium border-2 border-[#F7D634] outline-none bg-neutral-50 p-6 rounded-2xl min-h-[150px] resize-none"
                  value={editedData.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                />
              ) : (
                <p className="text-xl leading-relaxed text-neutral-700 italic font-medium">
                  "{editedData.descricao}"
                </p>
              )}
            </div>

            {/* Footer do Doc */}
            <div className="pt-20 space-y-10">
              <div className="h-px bg-neutral-200 w-full" />
              <div className="flex justify-between items-end">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Assinatura do Consultor</p>
                  <div className="w-64 h-px bg-black" />
                  <p className="text-sm font-bold">Maison Mobile Design</p>
                </div>
                <div className="text-right space-y-2">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Investimento Estimado</p>
                  {isEditing ? (
                    <input 
                      placeholder="Ex: R$ 15.000,00"
                      className="text-right text-4xl font-bold text-black border-b-2 border-[#F7D634] outline-none bg-neutral-50 px-2 py-1 max-w-[300px]"
                      value={editedData.valor}
                      onChange={(e) => handleChange('valor', e.target.value)}
                    />
                  ) : (
                    <>
                      <p className="text-4xl font-bold text-black">{editedData.valor || 'A DEFINIR'}</p>
                      <p className="text-[11px] text-neutral-400 mt-2 font-medium">Sujeito a alteração após medição técnica</p>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function EditableField({ label, value, isEditing, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{label}</p>
      {isEditing ? (
        <input 
          className="w-full text-lg font-bold text-black border-b-2 border-[#F7D634] outline-none bg-neutral-50 px-2 py-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <p className="text-lg font-bold text-black">{value}</p>
      )}
    </div>
  );
}

