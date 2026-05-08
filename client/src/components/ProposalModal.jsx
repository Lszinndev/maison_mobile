import React, { useState } from 'react';
import { Cancel01Icon, FileAttachmentIcon, ArrowRight01Icon } from 'hugeicons-react';
import logoImg from '../assets/logo.webp';

export default function ProposalModal({ isOpen, onClose, lead }) {
  if (!isOpen || !lead) return null;

  const [formData, setFormData] = useState({
    valorTotal: '',
    sinal: '',
    parcelamento: '',
    validade: '15 dias',
    observacoesExtras: ''
  });

  const formatCurrency = (value) => {
    if (!value) return '';
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue) return '';
    const formatter = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter.format(parseFloat(cleanValue) / 100);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'valorTotal' || name === 'sinal') {
      const maskedValue = formatCurrency(value);
      setFormData(prev => ({ ...prev, [name]: maskedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const phone = lead.budget.whatsapp?.replace(/\D/g, '') || '';
    if (!phone) {
      alert("Número de WhatsApp não encontrado no lead.");
      return;
    }
    const text = `Olá ${lead.name.split(' ')[0]}, tudo bem?
Aqui é da Maison Mobile. Segue em anexo a proposta para o seu projeto de ${lead.budget.ambiente}.
    
Valor Total: R$ ${formData.valorTotal || 'A combinar'}
Condições: ${formData.parcelamento || 'Sob consulta'}

(Por favor, nos envie o arquivo PDF baixado aqui nesta conversa!)`;
    const url = `https://wa.me/55${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex bg-white/80 backdrop-blur-md animate-fade-in">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          html, body {
            height: 100%;
            margin: 0 !important; 
            padding: 0 !important;
            overflow: hidden;
          }
          body * {
            visibility: hidden !important;
          }
          #print-area, #print-area * {
            visibility: visible !important;
          }
          #print-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            box-shadow: none !important;
            z-index: 9999 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="flex w-full h-full">
        
        {/* Left Side: Controls & Form */}
        <div className="w-[400px] border-r border-neutral-200 bg-[#F5F5F7] flex flex-col h-full shadow-2xl z-10 shrink-0 no-print">
          <header className="p-6 border-b border-neutral-200 bg-white flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-black tracking-tight">Estúdio de Propostas</h2>
              <p className="text-xs text-neutral-500">Editando proposta para {lead.name}</p>
            </div>
            <button onClick={onClose} className="p-2 text-neutral-400 hover:text-black transition-colors rounded-full hover:bg-neutral-100">
              <Cancel01Icon size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Valores & Pagamento</h3>
              
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-neutral-600">Valor Total (R$)</label>
                <input 
                  type="text" name="valorTotal" value={formData.valorTotal} onChange={handleInputChange}
                  placeholder="Ex: 15.500,00"
                  className="w-full p-3 rounded-xl border border-neutral-200 text-sm focus:ring-2 focus:ring-[#F7D634] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-neutral-600">Entrada / Sinal</label>
                <input 
                  type="text" name="sinal" value={formData.sinal} onChange={handleInputChange}
                  placeholder="Ex: 40% na assinatura"
                  className="w-full p-3 rounded-xl border border-neutral-200 text-sm focus:ring-2 focus:ring-[#F7D634] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-neutral-600">Condição Restante</label>
                <input 
                  type="text" name="parcelamento" value={formData.parcelamento} onChange={handleInputChange}
                  placeholder="Ex: Saldo em até 6x no cartão"
                  className="w-full p-3 rounded-xl border border-neutral-200 text-sm focus:ring-2 focus:ring-[#F7D634] outline-none"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">Gerais</h3>
              
              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-neutral-600">Validade da Proposta</label>
                <input 
                  type="text" name="validade" value={formData.validade} onChange={handleInputChange}
                  placeholder="Ex: 15 dias"
                  className="w-full p-3 rounded-xl border border-neutral-200 text-sm focus:ring-2 focus:ring-[#F7D634] outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-neutral-600">Observações Extras</label>
                <textarea 
                  name="observacoesExtras" value={formData.observacoesExtras} onChange={handleInputChange}
                  placeholder="Itens que não estão inclusos, observações de montagem..."
                  className="w-full p-3 rounded-xl border border-neutral-200 text-sm focus:ring-2 focus:ring-[#F7D634] outline-none min-h-[100px] resize-none"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border-t border-neutral-200 space-y-3 no-print">
            <button 
              onClick={handlePrint}
              className="w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <FileAttachmentIcon size={18} /> Gerar PDF / Imprimir
            </button>
            <button 
              onClick={handleSendWhatsApp}
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba57] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <ArrowRight01Icon size={18} /> Enviar no WhatsApp
            </button>
          </div>
        </div>

        {/* Right Side: PDF Live Preview Background */}
        <div className="flex-1 bg-[#f5f5f5] overflow-y-auto p-12 flex justify-center items-start print:p-0 print:bg-white">
          
          {/* A4 Container (210mm x 297mm aspect ratio approx) */}
          <div 
            id="print-area"
            className="bg-[#ffffff] w-[210mm] min-h-[297mm] shadow-2xl relative shrink-0 flex flex-col"
          >
            {/* --- INÍCIO DO CONTEÚDO DO PDF --- */}
            
            {/* Header (Top Yellow Bar + Logo) */}
            <div className="h-4 bg-[#F7D634] w-full absolute top-0 left-0" />
            <div className="px-10 pt-10 pb-6 flex justify-between items-start border-b border-[#f5f5f5]">
              <div>
                <img 
                  src={logoImg} 
                  alt="Maison Mobile" 
                  className="h-8 object-contain invert grayscale mb-2" 
                />
                <p className="text-[10px] text-[#a3a3a3] uppercase tracking-widest font-bold">Proposta Comercial</p>
                <h1 className="text-3xl font-bold text-[#000000] tracking-tight mt-1">Projeto: {lead.budget.ambiente}</h1>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[12px] font-bold text-[#000000]">Maison Mobile</p>
                <p className="text-[11px] text-[#737373]">contato@maison.com</p>
                <p className="text-[11px] text-[#737373]">(41) 3000-0000</p>
                <p className="text-[11px] text-[#737373] mt-2">Data: {new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>

            {/* Client Info */}
            <div className="px-10 py-5 bg-[#fafafa]/50">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[9px] font-bold text-[#a3a3a3] uppercase tracking-widest mb-1">Cliente</p>
                  <p className="text-[14px] font-semibold text-[#000000]">{lead.name}</p>
                  <p className="text-[12px] text-[#737373]">{lead.email}</p>
                  <p className="text-[12px] text-[#737373]">{lead.budget.whatsapp}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-[#a3a3a3] uppercase tracking-widest mb-1">Detalhes Base</p>
                  <p className="text-[12px] text-[#525252]"><span className="font-semibold text-[#000000]">Medidas:</span> {lead.budget.medidas || 'N/A'}</p>
                  <p className="text-[12px] text-[#525252]"><span className="font-semibold text-[#000000]">Estilo:</span> {lead.budget.estilo || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="px-10 py-6 space-y-5 flex-1">
              <div>
                <h2 className="text-[14px] font-bold text-[#000000] border-b border-[#e5e5e5] pb-1.5 mb-3">Especificações Técnicas</h2>
                <div className="grid grid-cols-2 gap-3 text-[12px]">
                  <p><span className="font-semibold text-[#404040]">Material/Acabamento:</span> {lead.budget.mdf || 'N/A'}</p>
                  <p><span className="font-semibold text-[#404040]">Ferragens:</span> {lead.budget.ferragens || 'N/A'}</p>
                  <p><span className="font-semibold text-[#404040]">Puxadores:</span> {lead.budget.puxadores || 'N/A'}</p>
                </div>
              </div>

              {lead.budget.acessorios && lead.budget.acessorios.length > 0 && (
                <div>
                  <h2 className="text-[14px] font-bold text-[#000000] border-b border-[#e5e5e5] pb-1.5 mb-3">Acessórios Inclusos</h2>
                  <ul className="list-disc list-inside text-[12px] text-[#525252] space-y-1">
                    {lead.budget.acessorios.map((acc, i) => (
                      <li key={i}>{acc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {lead.budget.descricao && (
                <div>
                  <h2 className="text-[14px] font-bold text-[#000000] border-b border-[#e5e5e5] pb-1.5 mb-3">Observações do Cliente / Descritivo</h2>
                  <p className="text-[12px] text-[#525252] leading-relaxed whitespace-pre-wrap">
                    "{lead.budget.descricao}"
                  </p>
                </div>
              )}
            </div>

            {/* Financial Summary */}
            <div className="px-10 py-6 bg-[#F5F5F7]">
              <h2 className="text-[14px] font-bold text-[#000000] border-b border-[#e5e5e5] pb-1.5 mb-4">Resumo de Valores</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[14px] font-semibold text-[#404040]">Investimento Total</span>
                  <span className="text-[24px] font-bold text-[#000000]">R$ {formData.valorTotal || '0,00'}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#e5e5e5]">
                  <div>
                    <p className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-widest mb-1">Entrada / Sinal</p>
                    <p className="text-[13px] font-medium text-[#000000]">{formData.sinal ? `R$ ${formData.sinal}` : '-'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#a3a3a3] uppercase tracking-widest mb-1">Saldo</p>
                    <p className="text-[13px] font-medium text-[#000000]">{formData.parcelamento || '-'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Notes & Footer */}
            <div className="px-10 py-5 space-y-4">
              {(formData.observacoesExtras || formData.validade) && (
                <div className="text-[10px] text-[#737373] space-y-1.5 border border-[#e5e5e5] p-3 rounded-xl bg-[#fafafa]">
                  {formData.validade && <p><span className="font-bold text-[#000000]">Validade da proposta:</span> {formData.validade}</p>}
                  {formData.observacoesExtras && (
                    <p className="whitespace-pre-wrap leading-snug"><span className="font-bold text-[#000000]">Observações da loja:</span><br/>{formData.observacoesExtras}</p>
                  )}
                </div>
              )}

              <div className="text-center pt-8 mt-4">
                <div className="w-64 border-t border-black mx-auto mb-2" />
                <p className="text-[12px] font-bold text-[#000000]">{lead.name}</p>
                <p className="text-[10px] font-bold tracking-widest text-[#a3a3a3] uppercase mt-1">Assinatura do Cliente</p>
              </div>
            </div>
            
            {/* --- FIM DO CONTEÚDO DO PDF --- */}
          </div>
        </div>
      </div>
    </div>
  );
}
