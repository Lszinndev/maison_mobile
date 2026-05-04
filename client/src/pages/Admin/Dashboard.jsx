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
  CircleIcon,
  BulbIcon,
  Settings04Icon
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const leadsPerPage = 8;

  // Resetar para a primeira página ao buscar ou filtrar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth !== 'true') {
      navigate('/admin');
      return;
    }

    // Carregar leads do LocalStorage e combinar com os mocks iniciais
    const savedLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    
    // Mocks iniciais mais completos para combinar com o novo layout
    const enhancedMocks = mockLeads.map(l => ({
      ...l,
      budget: {
        ...l.budget,
        ferragens: 'Blum',
        puxadores: 'Cava (Usinado)',
        medidas: '2.50m x 2.70m',
        whatsapp: '(41) 99999-0000'
      }
    }));

    const allLeads = [...savedLeads, ...enhancedMocks];
    
    // Garantir que não existam IDs duplicados (que causariam erro de seleção)
    const uniqueLeads = Array.from(new Map(allLeads.map(l => [l.id, l])).values());
    
    setLeads(uniqueLeads);
    
    // Selecionar o lead mais recente por padrão
    if (uniqueLeads.length > 0) setSelectedLead(uniqueLeads[0]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/admin');
  };

  const handleStatusChange = (id, newStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status: newStatus });
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Lógica de Paginação
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={`h-screen font-sans flex antialiased overflow-hidden selection:bg-[#F7D634] selection:text-black transition-colors duration-500 ${
      isDarkMode ? 'bg-[#0A0A0A] text-[#F5F5F7]' : 'bg-[#F5F5F7] text-[#1D1D1F]'
    }`}>
      
      {/* 1. Slim Sidebar */}
      <aside className={`w-16 lg:w-20 border-r flex flex-col items-center py-8 gap-10 shrink-0 transition-colors duration-500 ${
        isDarkMode ? 'bg-[#121212] border-white/5' : 'bg-white border-neutral-200'
      }`}>
        <img src={logoImg} alt="M" className="h-5 w-auto" />
        <nav className="flex flex-col gap-8">
          <SidebarIcon icon={<UserGroupIcon size={22}/>} active isDarkMode={isDarkMode} />
        </nav>

        <div className="mt-auto flex flex-col items-center gap-6">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-xl transition-all ${isDarkMode ? 'text-zinc-500 hover:text-white' : 'text-neutral-400 hover:text-black'}`}
          >
            {isDarkMode ? <BulbIcon size={20} /> : <BulbIcon size={20} variant="solid" />}
          </button>
          <button onClick={handleLogout} className={`text-zinc-600 hover:text-white transition-colors p-2 ${!isDarkMode && 'hover:text-black'}`}>
            <Logout01Icon size={22} />
          </button>
        </div>
      </aside>

      {/* 2. Middle Pane - List */}
      <section className={`w-80 lg:w-96 border-r flex flex-col shrink-0 transition-colors duration-500 ${
        isDarkMode ? 'bg-[#0A0A0A] border-white/5' : 'bg-[#F5F5F7] border-neutral-200'
      }`}>
        <header className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold tracking-tight">Leads</h1>
            <button className="w-8 h-8 rounded-full bg-[#F7D634] text-black flex items-center justify-center hover:scale-110 transition-all">
              <Add01Icon size={18} />
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative group flex-1">
              <Search01Icon size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
                isDarkMode ? 'text-zinc-600 group-focus-within:text-white' : 'text-neutral-400 group-focus-within:text-black'
              }`} />
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full border-none rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all ${
                  isDarkMode ? 'bg-[#1C1C1E] text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white/10' : 'bg-white text-black placeholder:text-neutral-400 focus:ring-1 focus:ring-black/5'
                }`}
              />
            </div>
            
            {/* Botão de Filtro Único */}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                  isFilterOpen || statusFilter !== 'Todos'
                    ? 'bg-[#F7D634] border-[#F7D634] text-black' 
                    : (isDarkMode ? 'bg-[#1C1C1E] border-white/5 text-zinc-500 hover:text-white' : 'bg-white border-neutral-200 text-neutral-400 hover:text-black')
                }`}
              >
                <Settings04Icon size={18} />
              </button>

              {/* Popover de Filtro */}
              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-48 rounded-2xl p-2 z-50 animate-fade-in shadow-2xl border ${
                    isDarkMode ? 'bg-[#1C1C1E] border-white/10' : 'bg-white border-neutral-200'
                  }`}>
                    <p className={`text-[10px] font-bold uppercase tracking-widest px-3 py-2 ${isDarkMode ? 'text-zinc-500' : 'text-neutral-400'}`}>Filtrar por Status</p>
                    <div className="space-y-1">
                      {['Todos', 'Novo', 'Atendimento', 'Pendente', 'Finalizado'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setStatusFilter(status);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                            statusFilter === status 
                              ? (isDarkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-black')
                              : (isDarkMode ? 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300' : 'text-neutral-500 hover:bg-black/5 hover:text-black')
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            status === 'Todos' ? (isDarkMode ? 'bg-white/20' : 'bg-black/10') :
                            status === 'Novo' ? 'bg-[#0A84FF]' :
                            status === 'Atendimento' ? 'bg-[#FF9F0A]' :
                            status === 'Pendente' ? 'bg-[#5856D6]' :
                            'bg-[#30D158]'
                          }`} />
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-hide">
          {currentLeads.map((lead) => (
            <div 
              key={lead.id} 
              onClick={() => setSelectedLead(lead)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 relative ${
                selectedLead?.id === lead.id 
                  ? (isDarkMode ? 'bg-[#1C1C1E] ring-1 ring-white/10 z-10' : 'bg-white ring-1 ring-black/5 z-10')
                  : (isDarkMode ? 'hover:bg-white/5 opacity-60 hover:opacity-100' : 'hover:bg-black/5 text-neutral-600')
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[15px] font-semibold tracking-tight ${!isDarkMode && selectedLead?.id === lead.id ? 'text-black' : ''}`}>{lead.name}</span>
                <span className="text-[10px] text-zinc-600 font-bold uppercase">{lead.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[12px] text-zinc-500 truncate max-w-[160px]">{lead.email}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  lead.status === 'Novo' ? 'bg-[#0A84FF]' : 
                  lead.status === 'Atendimento' ? 'bg-[#FF9F0A]' : 
                  lead.status === 'Pendente' ? 'bg-[#5856D6]' : 
                  'bg-[#30D158]'
                }`} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className={`p-4 border-t flex justify-between items-center ${isDarkMode ? 'border-white/5' : 'border-neutral-200'}`}>
            <button 
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              className="text-[11px] font-bold uppercase tracking-wider disabled:opacity-20 hover:text-[#F7D634] transition-colors"
            >
              Anterior
            </button>
            <div className="flex gap-2">
              <span className="text-[11px] font-bold opacity-40">{currentPage} / {totalPages}</span>
            </div>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
              className="text-[11px] font-bold uppercase tracking-wider disabled:opacity-20 hover:text-[#F7D634] transition-colors"
            >
              Próximo
            </button>
          </div>
        )}
      </section>

      {/* 3. Right Pane - Detail View (Ultra Modern Pro) */}
      <main className={`flex-1 flex flex-col min-w-0 transition-colors duration-500 ${
        isDarkMode ? 'bg-[#121212]' : 'bg-white'
      }`}>
        {selectedLead ? (
          <div className="flex flex-col h-full animate-fade-in">
            {/* Header */}
            <header className={`p-10 pb-12 flex justify-between items-start border-b transition-colors duration-500 ${
              isDarkMode ? 'bg-[#0A0A0A]/50 border-white/5' : 'bg-[#F5F5F7]/30 border-neutral-100'
            } backdrop-blur-xl`}>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h2 className={`text-4xl font-bold tracking-tight ${!isDarkMode && 'text-black'}`}>{selectedLead.name}</h2>
                  <AppleBadge status={selectedLead.status} />
                </div>
                <div className="flex items-center gap-4 text-[13px] text-zinc-500 font-medium">
                  <span>{selectedLead.email}</span>
                  <span className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-neutral-300'}`} />
                  <span>ID #{selectedLead.id.toString().padStart(4, '0')}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className={`px-6 py-2.5 text-[13px] font-bold rounded-xl border transition-all ${
                  isDarkMode ? 'bg-[#1C1C1E] text-white border-white/5 hover:bg-white/10' : 'bg-white text-black border-neutral-200 hover:bg-neutral-50'
                }`}>Editar</button>
                <button className={`px-6 py-2.5 text-[13px] font-bold rounded-xl transition-all ${
                  isDarkMode ? 'bg-white text-black hover:bg-[#F5F5F7]' : 'bg-black text-white hover:bg-neutral-800'
                }`}>Gerar Proposta</button>
              </div>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-12 lg:p-16 space-y-16 scrollbar-hide">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
                <DetailBox label="Ambiente" value={selectedLead.budget.ambiente} isDarkMode={isDarkMode} />
                <DetailBox label="Acabamento" value={selectedLead.budget.mdf} isDarkMode={isDarkMode} />
                <DetailBox label="Estilo" value={selectedLead.budget.estilo} isDarkMode={isDarkMode} />
                <DetailBox label="Recebido" value={selectedLead.date} isDarkMode={isDarkMode} />
                
                <DetailBox label="Ferragens" value={selectedLead.budget.ferragens || selectedLead.budget.marcaFerragem || 'N/A'} isDarkMode={isDarkMode} />
                <DetailBox label="Puxadores" value={selectedLead.budget.puxadores || 'N/A'} isDarkMode={isDarkMode} />
                <DetailBox label="Medidas" value={selectedLead.budget.medidas || (selectedLead.budget.largura ? `${selectedLead.budget.largura}m x ${selectedLead.budget.altura}m` : 'N/A')} isDarkMode={isDarkMode} />
                <DetailBox label="WhatsApp" value={selectedLead.budget.whatsapp || selectedLead.budget.telefone || 'N/A'} isDarkMode={isDarkMode} />
              </div>

              {selectedLead.budget.acessorios && selectedLead.budget.acessorios.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F7D634]" />
                    <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Acessórios & Upgrades</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedLead.budget.acessorios.map((acc, index) => (
                      <div key={index} className={`px-4 py-2 border rounded-xl text-[13px] font-semibold transition-colors ${
                        isDarkMode ? 'bg-[#1C1C1E] border-white/5 text-white' : 'bg-white border-neutral-200 text-black'
                      }`}>
                        {acc}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F7D634]" />
                  <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Observações do projeto</h3>
                </div>
                <p className={`text-[22px] leading-snug max-w-3xl font-medium tracking-tight break-words whitespace-pre-wrap ${
                  isDarkMode ? 'text-zinc-200' : 'text-neutral-700'
                }`}>
                  "{selectedLead.budget.descricao}"
                </p>
              </section>

              {/* Actions */}
              <section className={`space-y-6 pt-16 border-t ${isDarkMode ? 'border-white/5' : 'border-neutral-100'}`}>
                 <h3 className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Gestão de Status</h3>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                   <StatusButton label="Novo Lead" active={selectedLead.status === 'Novo'} onClick={() => handleStatusChange(selectedLead.id, 'Novo')} color="#0A84FF" isDarkMode={isDarkMode} />
                   <StatusButton label="Em Atendimento" active={selectedLead.status === 'Atendimento'} onClick={() => handleStatusChange(selectedLead.id, 'Atendimento')} color="#FF9F0A" isDarkMode={isDarkMode} />
                   <StatusButton label="Pendente" active={selectedLead.status === 'Pendente'} onClick={() => handleStatusChange(selectedLead.id, 'Pendente')} color="#5856D6" isDarkMode={isDarkMode} />
                   <StatusButton label="Finalizado" active={selectedLead.status === 'Finalizado'} icon={<Tick01Icon size={18}/>} onClick={() => handleStatusChange(selectedLead.id, 'Finalizado')} color="#30D158" isDarkMode={isDarkMode} />
                 </div>
              </section>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-zinc-700">
            <UserGroupIcon size={48} className="opacity-20" />
            <span className="text-sm font-medium tracking-widest uppercase opacity-40">Selecione uma solicitação</span>
          </div>
        )}
      </main>
    </div>
  );
}

function FilterPill({ label, active, onClick, isDarkMode, color }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
        active 
          ? 'bg-[#F7D634] text-black' 
          : (isDarkMode ? 'bg-[#1C1C1E] text-zinc-500 hover:text-white' : 'bg-white border border-neutral-200 text-neutral-500 hover:text-black')
      }`}
    >
      {color && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
      {label}
    </button>
  );
}

function SidebarIcon({ icon, active = false, isDarkMode = true }) {
  return (
    <div className={`p-3 rounded-2xl transition-all cursor-pointer ${
      active 
        ? 'bg-[#F7D634] text-black' 
        : (isDarkMode ? 'text-zinc-700 hover:text-white hover:bg-white/5' : 'text-neutral-300 hover:text-black hover:bg-black/5')
    }`}>
      {icon}
    </div>
  );
}

function AppleBadge({ status }) {
  const styles = {
    'Novo': 'bg-[#0A84FF]/20 text-[#0A84FF]',
    'Atendimento': 'bg-[#FF9F0A]/20 text-[#FF9F0A]',
    'Pendente': 'bg-[#5856D6]/20 text-[#5856D6]',
    'Finalizado': 'bg-[#30D158]/20 text-[#30D158]'
  };
  return (
    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${styles[status]}`}>
      {status}
    </div>
  );
}

function DetailBox({ label, value, isDarkMode }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{label}</p>
      <p className={`text-[18px] font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-black'}`}>{value}</p>
    </div>
  );
}

function StatusButton({ label, active, onClick, color, icon, isDarkMode }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
        active 
          ? (isDarkMode ? 'bg-white/5 border-white/20 text-white' : 'bg-black/5 border-black/10 text-black') 
          : (isDarkMode ? 'bg-[#1C1C1E] border-transparent text-zinc-500 hover:border-white/10 hover:text-zinc-300' : 'bg-white border-neutral-200 text-neutral-500 hover:border-black/10 hover:text-black')
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[14px] font-bold tracking-tight">{label}</span>
      </div>
      {icon || <ArrowRight01Icon size={18} className="opacity-20" />}
    </button>
  );
}
