import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.webp';
import { 
  Search01Icon, 
  Logout01Icon,
  Add01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  GridIcon,
  UserGroupIcon,
  FileAttachmentIcon,
  Settings01Icon,
  Tick01Icon,
  Time01Icon,
  CircleIcon
} from 'hugeicons-react';

const mockLeads = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', status: 'Novo', date: '25 Abr', budget: { ambiente: 'Cozinha', mdf: 'MDF Melamínico', estilo: 'Industrial', descricao: 'Projeto para cozinha americana com ilha central e acabamento fosco.' } },
  { id: 2, name: 'Maria Souza', email: 'maria@email.com', status: 'Atendimento', date: '24 Abr', budget: { ambiente: 'Quarto', mdf: 'Laca', estilo: 'Provençal', descricao: 'Closet em L com divisões específicas para calçados e vestidos.' } },
  { id: 3, name: 'Pedro Santos', email: 'pedro@email.com', status: 'Finalizado', date: '23 Abr', budget: { ambiente: 'Banheiro', mdf: 'Lâmina Natural', estilo: 'Liso', descricao: 'Gabinete suspenso com cuba esculpida em mármore.' } },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState(mockLeads[0]);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth !== 'true') navigate('/admin');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/admin');
  };

  const handleStatusChange = (id, newStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status: newStatus });
  };

  const filteredLeads = leads.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="h-screen bg-[#0A0A0A] text-[#F5F5F7] font-sans flex antialiased overflow-hidden selection:bg-[#F7D634] selection:text-black">
      
      {/* 1. Slim Sidebar */}
      <aside className="w-16 lg:w-20 border-r border-white/5 flex flex-col items-center py-8 gap-10 shrink-0 bg-[#121212]">
        <img src={logoImg} alt="M" className="h-5 w-auto" />
        <nav className="flex flex-col gap-8">
          <SidebarIcon icon={<GridIcon size={22}/>} active />
          <SidebarIcon icon={<UserGroupIcon size={22}/>} />
          <SidebarIcon icon={<FileAttachmentIcon size={22}/>} />
          <SidebarIcon icon={<Settings01Icon size={22}/>} />
        </nav>
        <button onClick={handleLogout} className="mt-auto text-zinc-600 hover:text-white transition-colors p-2">
          <Logout01Icon size={22} />
        </button>
      </aside>

      {/* 2. Middle Pane - List */}
      <section className="w-80 lg:w-96 border-r border-white/5 flex flex-col shrink-0 bg-[#0A0A0A]">
        <header className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight">Leads</h1>
            <button className="w-8 h-8 rounded-full bg-[#F7D634] text-black flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-[#F7D634]/10">
              <Add01Icon size={18} />
            </button>
          </div>
          <div className="relative group">
            <Search01Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1C1C1E] border-none rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none placeholder:text-zinc-600 focus:ring-1 focus:ring-white/10 transition-all"
            />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {filteredLeads.map((lead) => (
            <div 
              key={lead.id} 
              onClick={() => setSelectedLead(lead)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${selectedLead?.id === lead.id ? 'bg-[#1C1C1E] shadow-xl border border-white/5' : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[15px] font-semibold tracking-tight">{lead.name}</span>
                <span className="text-[10px] text-zinc-600 font-bold uppercase">{lead.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-zinc-500 truncate max-w-[160px]">{lead.email}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'Novo' ? 'bg-[#0A84FF]' : lead.status === 'Atendimento' ? 'bg-[#FF9F0A]' : 'bg-[#30D158]'}`} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Right Pane - Detail View (Ultra Modern Pro) */}
      <main className="flex-1 bg-[#121212] flex flex-col min-w-0">
        {selectedLead ? (
          <div className="flex flex-col h-full animate-fade-in">
            {/* Header */}
            <header className="p-10 pb-12 flex justify-between items-start border-b border-white/5 bg-[#0A0A0A]/50 backdrop-blur-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h2 className="text-4xl font-bold tracking-tight">{selectedLead.name}</h2>
                  <AppleBadge status={selectedLead.status} />
                </div>
                <div className="flex items-center gap-4 text-[13px] text-zinc-500 font-medium">
                  <span>{selectedLead.email}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-800" />
                  <span>ID #{selectedLead.id.toString().padStart(4, '0')}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-2.5 bg-[#1C1C1E] text-white text-[13px] font-bold rounded-xl border border-white/5 hover:bg-white/10 transition-all">Editar</button>
                <button className="px-6 py-2.5 bg-white text-black text-[13px] font-bold rounded-xl hover:bg-[#F5F5F7] transition-all">Gerar Proposta</button>
              </div>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-12 lg:p-16 space-y-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                <DetailBox label="Ambiente" value={selectedLead.budget.ambiente} />
                <DetailBox label="Acabamento" value={selectedLead.budget.mdf} />
                <DetailBox label="Estilo" value={selectedLead.budget.estilo} />
                <DetailBox label="Recebido" value={`${selectedLead.date} Abr`} />
              </div>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F7D634]" />
                  <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Observações do projeto</h3>
                </div>
                <p className="text-[22px] text-zinc-200 leading-snug max-w-3xl font-medium tracking-tight">
                  "{selectedLead.budget.descricao}"
                </p>
              </section>

              {/* Actions */}
              <section className="space-y-6 pt-16 border-t border-white/5">
                 <h3 className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Gestão de Status</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   <StatusButton label="Novo Lead" active={selectedLead.status === 'Novo'} onClick={() => handleStatusChange(selectedLead.id, 'Novo')} color="#0A84FF" />
                   <StatusButton label="Em Atendimento" active={selectedLead.status === 'Atendimento'} onClick={() => handleStatusChange(selectedLead.id, 'Atendimento')} color="#FF9F0A" />
                   <StatusButton label="Finalizado" active={selectedLead.status === 'Finalizado'} icon={<Tick01Icon size={18}/>} onClick={() => handleStatusChange(selectedLead.id, 'Finalizado')} color="#30D158" />
                 </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-zinc-700">
            <GridIcon size={48} className="opacity-20" />
            <span className="text-sm font-medium tracking-widest uppercase opacity-40">Selecione uma solicitação</span>
          </div>
        )}
      </main>
    </div>
  );
}

function SidebarIcon({ icon, active = false }) {
  return (
    <div className={`p-3 rounded-2xl transition-all cursor-pointer ${active ? 'bg-[#F7D634] text-black shadow-lg shadow-[#F7D634]/20' : 'text-zinc-700 hover:text-white hover:bg-white/5'}`}>
      {icon}
    </div>
  );
}

function AppleBadge({ status }) {
  const styles = {
    'Novo': 'bg-[#0A84FF]/20 text-[#0A84FF]',
    'Atendimento': 'bg-[#FF9F0A]/20 text-[#FF9F0A]',
    'Finalizado': 'bg-[#30D158]/20 text-[#30D158]'
  };
  return (
    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${styles[status]}`}>
      {status}
    </div>
  );
}

function DetailBox({ label, value }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{label}</p>
      <p className="text-[18px] font-bold text-white tracking-tight">{value}</p>
    </div>
  );
}

function StatusButton({ label, active, onClick, color, icon }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${active ? 'bg-white/5 border-white/20 text-white' : 'bg-[#1C1C1E] border-transparent text-zinc-500 hover:border-white/10 hover:text-zinc-300'}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[14px] font-bold tracking-tight">{label}</span>
      </div>
      {icon || <ArrowRight01Icon size={18} className="opacity-20" />}
    </button>
  );
}
