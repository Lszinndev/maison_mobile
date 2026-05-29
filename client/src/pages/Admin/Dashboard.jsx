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
  Settings04Icon
} from 'hugeicons-react';
import ProposalModal from '../../components/ProposalModal';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://maisonmobileapi.vercel.app';

const MOCK_LEAD = {
  id: 'mock-1',
  name: 'Gabriel Albuquerque',
  email: 'gabriel.albuquerque@gmail.com',
  telefone: '(41) 99887-7665',
  status: 'Novo',
  date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', ''),
  budget: {
    ambiente: 'Cozinha Gourmet',
    mdf: 'Nobile Grigio & Louro Freijó',
    estilo: 'Contemporâneo / Minimalista',
    ferragens: 'Blum Tandembox / Amortecedores',
    puxadores: 'Cava Oculto',
    medidas: '4.50m x 2.80m',
    whatsapp: 'Sim',
    descricao: 'Solicito orçamento para cozinha planejada em ilha. Desejo portas em MDF cinza fosco texturizado e detalhes superiores em amadeirado Louro Freijó natural. Despensa embutida com iluminação LED interna nas prateleiras e gavetas corrediças ocultas com amortecimento.',
    fotos: []
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(null);
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const [isMobileListVisible, setIsMobileListVisible] = useState(true);
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

    const fetchLeads = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/orcamentos`);
        if (res.ok) {
          const data = await res.json();
          const formattedLeads = data.map(item => ({
            id: item._id,
            name: item.nome,
            email: item.email,
            telefone: item.telefone,
            status: item.status,
            date: new Date(item.criado_em).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', ''),
            budget: item.budget || {}
          }));
          
          if (formattedLeads.length > 0) {
            setLeads(formattedLeads);
            setSelectedLead(formattedLeads[0]);
          } else {
            setLeads([MOCK_LEAD]);
            setSelectedLead(MOCK_LEAD);
          }
        } else {
          setLeads([MOCK_LEAD]);
          setSelectedLead(MOCK_LEAD);
        }
      } catch (err) {
        console.error("Erro ao buscar leads, usando mock local", err);
        setLeads([MOCK_LEAD]);
        setSelectedLead(MOCK_LEAD);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/admin');
  };

  const handleStatusChange = async (id, newStatus) => {
    if (id === 'mock-1') {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      if (selectedLead?.id === id) setSelectedLead(prev => ({ ...prev, status: newStatus }));
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/api/orcamentos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
        if (selectedLead?.id === id) setSelectedLead(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Erro ao atualizar status", error);
    }
  };

  const handleStartEdit = () => {
    setEditedLead({ ...selectedLead });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedLead(null);
  };

  const handleSaveEdit = async () => {
    if (editedLead.id === 'mock-1') {
      const updatedLeads = leads.map(l => l.id === editedLead.id ? editedLead : l);
      setLeads(updatedLeads);
      setSelectedLead(editedLead);
      setIsEditing(false);
      setEditedLead(null);
      return;
    }
    try {
      const { id, name, email, telefone, status, budget } = editedLead;
      const res = await fetch(`${API_BASE_URL}/api/orcamentos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, email, telefone, status, budget })
      });
      if (res.ok) {
        const updatedLeads = leads.map(l => l.id === editedLead.id ? editedLead : l);
        setLeads(updatedLeads);
        setSelectedLead(editedLead);
        setIsEditing(false);
        setEditedLead(null);
      }
    } catch (error) {
      console.error("Erro ao salvar edição", error);
    }
  };

  const handleEditChange = (field, value, isBudgetField = false) => {
    if (isBudgetField) {
      setEditedLead(prev => ({
        ...prev,
        budget: { ...prev.budget, [field]: value }
      }));
    } else {
      setEditedLead(prev => ({ ...prev, [field]: value }));
    }
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
    <div className={`h-screen font-sans flex flex-col md:flex-row antialiased overflow-hidden selection:bg-[#F7D634] selection:text-black transition-colors duration-500 bg-[#F5F5F7] text-[#1D1D1F]`}>

      {/* 1. Desktop Slim Sidebar */}
      <aside className="hidden md:flex flex-col items-center justify-start w-16 lg:w-20 py-8 border-r shrink-0 transition-colors duration-500 bg-white border-neutral-200 z-50">
        <img src={logoImg} alt="M" className="h-5 w-auto mb-10" />
        <nav className="flex flex-col gap-8 items-center">
          <SidebarIcon
            icon={<UserGroupIcon size={22} />}
            active
            badge={leads.filter(l => l.status === 'Novo').length}
          />
        </nav>
        <div className="mt-auto flex flex-col items-center gap-6">
          <button onClick={handleLogout} className="text-zinc-600 transition-colors p-2 hover:text-black cursor-pointer">
            <Logout01Icon size={22} />
          </button>
        </div>
      </aside>

      {/* 2. Mobile Fixed Bottom Pill Footer */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-t border-neutral-200/50 flex items-center justify-between px-6 z-50">
        {/* Invisible spacer to perfectly center the Leads pill button */}
        <div className="w-9" />
        
        {/* Leads Capsule Option */}
        <button
          onClick={() => setIsMobileListVisible(true)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
            isMobileListVisible
              ? 'bg-[#F7D634] text-black shadow-lg shadow-[#F7D634]/15'
              : 'bg-neutral-100 text-neutral-500 hover:text-black'
          }`}
        >
          <UserGroupIcon size={16} />
          <span>Leads</span>
          {leads.filter(l => l.status === 'Novo').length > 0 && (
            <span className="w-4.5 h-4.5 bg-[#FF3B30] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {leads.filter(l => l.status === 'Novo').length}
            </span>
          )}
        </button>

        {/* Logout Icon */}
        <button onClick={handleLogout} className="text-zinc-500 hover:text-black transition-colors p-2 cursor-pointer">
          <Logout01Icon size={20} />
        </button>
      </footer>

      {/* 2. Middle Pane - List */}
      <section className={`w-full md:w-80 lg:w-96 border-r flex-col shrink-0 overflow-hidden transition-colors duration-500 bg-[#F5F5F7] border-neutral-200 ${!isMobileListVisible ? 'hidden md:flex' : 'flex'}`}>
        <header className="px-3 pt-6 pb-4 space-y-6">
          <div className="flex justify-between items-center px-1">
            <h1 className="text-xl font-bold tracking-tight">Leads</h1>
          </div>
          <div className="flex gap-2 items-center">
            <div className="relative group flex-1">
              <Search01Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors text-neutral-400 group-focus-within:text-black" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-none rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-all bg-white text-black placeholder:text-neutral-400 focus:ring-1 focus:ring-black/5"
              />
            </div>

            {/* Botão de Filtro Único */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`p-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 ${isFilterOpen || statusFilter !== 'Todos'
                  ? 'bg-[#F7D634] border-[#F7D634] text-black'
                  : 'bg-white border-neutral-200 text-neutral-400 hover:text-black'
                  }`}
              >
                <Settings04Icon size={18} />
              </button>

              {/* Popover de Filtro */}
              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl p-2 z-50 animate-fade-in shadow-2xl border bg-white border-neutral-200">
                    <p className="text-[10px] font-bold uppercase tracking-widest px-3 py-2 text-neutral-400">Filtrar por Status</p>
                    <div className="space-y-1">
                      {['Todos', 'Novo', 'Atendimento', 'Pendente', 'Finalizado'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setStatusFilter(status);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all ${statusFilter === status
                            ? 'bg-black/5 text-black'
                            : 'text-neutral-500 hover:bg-black/5 hover:text-black'
                            }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${status === 'Todos' ? 'bg-black/10' :
                            status === 'Novo' ? 'bg-[#0A84FF]' :
                              status === 'Atendimento' ? 'bg-[#FF9F0A]' :
                                status === 'Pendente' ? 'bg-[#FF3B30]' :
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

        <div className="flex-1 overflow-y-auto px-3 py-2 pb-20 md:pb-2 space-y-1 scrollbar-hide">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/60 border border-neutral-100/50 animate-pulse space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-neutral-200 rounded-md w-2/3" />
                  <div className="h-3 bg-neutral-100 rounded-md w-1/6" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-neutral-100 rounded-md w-1/2" />
                  <div className="h-2 w-2 bg-neutral-200 rounded-full" />
                </div>
              </div>
            ))
          ) : currentLeads.length === 0 ? (
            <div className="text-center py-8 text-neutral-400 text-sm">Nenhum lead encontrado</div>
          ) : (
            currentLeads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => {
                  setSelectedLead(lead);
                  setIsEditing(false);
                  setIsMobileListVisible(false);
                }}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 relative ${selectedLead?.id === lead.id
                  ? 'bg-white ring-1 ring-black/5 z-10'
                  : 'hover:bg-black/5 text-neutral-600'
                  }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-[15px] font-semibold tracking-tight ${selectedLead?.id === lead.id ? 'text-black' : ''}`}>{lead.name}</span>
                  <span className="text-[10px] text-zinc-600 font-bold uppercase">{lead.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[12px] text-zinc-500 truncate max-w-[160px]">{lead.email}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'Novo' ? 'bg-[#0A84FF] animate-pulse ring-4 ring-[#0A84FF]/20' :
                    lead.status === 'Atendimento' ? 'bg-[#FF9F0A]' :
                      lead.status === 'Pendente' ? 'bg-[#FF3B30]' :
                        'bg-[#30D158]'
                    }`} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t flex justify-between items-center border-neutral-200">
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
      <main className={`flex-1 flex-col min-w-0 overflow-hidden transition-colors duration-500 bg-white ${isMobileListVisible ? 'hidden md:flex' : 'flex'}`}>
        {isLoading ? (
          <div className="flex flex-col h-full animate-pulse">
            {/* Header */}
            <header className="p-6 md:p-10 pb-8 md:pb-12 border-b transition-colors duration-500 bg-[#F5F5F7]/30 border-neutral-100 backdrop-blur-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                <div className="space-y-3 w-full md:w-auto">
                  <div className="flex items-center gap-3">
                    <div className="h-8 bg-neutral-200 rounded-xl w-48 sm:w-64" />
                    <div className="h-5 bg-neutral-200 rounded-full w-16" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-4 bg-neutral-200 rounded-md w-32" />
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                    <div className="h-4 bg-neutral-200 rounded-md w-16" />
                  </div>
                </div>
                <div className="hidden md:flex gap-3">
                  <div className="h-10 bg-neutral-200 rounded-xl w-24" />
                  <div className="h-10 bg-neutral-200 rounded-xl w-36" />
                </div>
              </div>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 pb-24 md:p-12 lg:p-16 space-y-8 md:space-y-16 scrollbar-hide">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-neutral-50/70 border border-neutral-200/60 p-5 rounded-2xl min-h-[105px] flex flex-col justify-between">
                    <div className="h-3 bg-neutral-200 rounded-md w-1/2" />
                    <div className="h-4 bg-neutral-200 rounded-md w-3/4" />
                  </div>
                ))}
              </div>

              <section className="space-y-6">
                <div className="h-4 bg-neutral-200 rounded-md w-32" />
                <div className="bg-neutral-50/70 border border-neutral-200/60 p-6 md:p-8 rounded-3xl min-h-[120px] space-y-3">
                  <div className="h-4 bg-neutral-200 rounded-md w-full" />
                  <div className="h-4 bg-neutral-200 rounded-md w-5/6" />
                  <div className="h-4 bg-neutral-200 rounded-md w-2/3" />
                </div>
              </section>
            </div>
          </div>
        ) : selectedLead ? (
          <div className="flex flex-col h-full animate-fade-in">
            {/* Header */}
            <header className="p-6 md:p-10 pb-8 md:pb-12 border-b transition-colors duration-500 bg-[#F5F5F7]/30 border-neutral-100 backdrop-blur-xl">
              {/* Top Control Bar (Mobile only: Back and action buttons side by side) */}
              <div className="flex justify-between items-center w-full md:hidden mb-6">
                <button 
                  className="flex items-center gap-2 text-sm text-neutral-500 hover:text-black font-medium"
                  onClick={() => setIsMobileListVisible(true)}
                >
                  <ArrowRight01Icon size={16} className="rotate-180" />
                  <span>Voltar</span>
                </button>
                
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 text-xs font-bold rounded-xl border transition-all bg-white text-black border-neutral-200 hover:bg-neutral-50 cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 text-xs font-bold rounded-xl transition-all bg-black text-white hover:bg-neutral-800 cursor-pointer"
                      >
                        Salvar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleStartEdit}
                        className="px-4 py-2 text-xs font-bold rounded-xl border transition-all bg-white text-black border-neutral-200 hover:bg-neutral-50 cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setIsProposalModalOpen(true)}
                        className="px-4 py-2 text-xs font-bold rounded-xl transition-all bg-black text-white hover:bg-neutral-800 cursor-pointer"
                      >
                        Proposta
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Main Header Info (Desktop: Name on left, Actions on right. Mobile: Name only) */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 md:gap-0">
                <div className="space-y-2 w-full md:w-auto">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black break-words max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-2xl">{selectedLead.name}</h2>
                    <AppleBadge status={selectedLead.status} />
                  </div>
                  <div className="flex items-center gap-3 text-[13px] text-zinc-500 font-medium">
                    <span className="truncate max-w-[180px] sm:max-w-none">{selectedLead.email}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span>ID #{selectedLead.id.toString().padStart(4, '0')}</span>
                  </div>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleCancelEdit}
                        className="px-6 py-2.5 text-[13px] font-bold rounded-xl border transition-all bg-white text-black border-neutral-200 hover:bg-neutral-50 cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-6 py-2.5 text-[13px] font-bold rounded-xl transition-all bg-black text-white hover:bg-neutral-800 cursor-pointer"
                      >
                        Salvar Alterações
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleStartEdit}
                        className="px-6 py-2.5 text-[13px] font-bold rounded-xl border transition-all bg-white text-black border-neutral-200 hover:bg-neutral-50 cursor-pointer"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => setIsProposalModalOpen(true)}
                        className="px-6 py-2.5 text-[13px] font-bold rounded-xl transition-all bg-black text-white hover:bg-neutral-800 cursor-pointer"
                      >
                        Gerar Proposta
                      </button>
                    </>
                  )}
                </div>
              </div>
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 pb-24 md:p-12 lg:p-16 space-y-8 md:space-y-16 scrollbar-hide">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DetailBox
                  label="Ambiente"
                  value={isEditing ? editedLead.budget.ambiente : selectedLead.budget.ambiente}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('ambiente', val, true)}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                />
                <DetailBox
                  label="Acabamento"
                  value={isEditing ? editedLead.budget.mdf : selectedLead.budget.mdf}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('mdf', val, true)}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9 4v16m6-16v16" /></svg>}
                />
                <DetailBox
                  label="Estilo"
                  value={isEditing ? editedLead.budget.estilo : selectedLead.budget.estilo}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('estilo', val, true)}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3" /></svg>}
                />
                <DetailBox
                  label="Recebido"
                  value={selectedLead.date}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                />

                <DetailBox
                  label="Ferragens"
                  value={isEditing ? (editedLead.budget.ferragens || '') : (selectedLead.budget.ferragens || 'N/A')}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('ferragens', val, true)}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                />
                <DetailBox
                  label="Puxadores"
                  value={isEditing ? (editedLead.budget.puxadores || '') : (selectedLead.budget.puxadores || 'N/A')}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('puxadores', val, true)}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4M8 12a4 4 0 118 0 4 4 0 01-8 0z" /></svg>}
                />
                <DetailBox
                  label="Medidas"
                  value={isEditing ? (editedLead.budget.medidas || '') : (selectedLead.budget.medidas || 'N/A')}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('medidas', val, true)}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10M20 7v10M8 5v14M12 7v10M16 5v14" /></svg>}
                />
                <DetailBox
                  label="WhatsApp"
                  value={isEditing ? (editedLead.budget.whatsapp || '') : (selectedLead.budget.whatsapp || 'N/A')}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('whatsapp', val, true)}
                  icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
                />
              </div>

              {selectedLead.budget.acessorios && selectedLead.budget.acessorios.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F7D634]" />
                    <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Acessórios & Upgrades</h3>
                  </div>
                  <div className="bg-neutral-50/70 border border-neutral-200/60 p-6 rounded-3xl transition-all duration-300 hover:shadow-md hover:shadow-black/[0.02] hover:bg-white flex flex-wrap gap-3">
                    {selectedLead.budget.acessorios.map((acc, index) => (
                      <div key={index} className="px-4 py-2 border rounded-xl text-[13px] font-semibold transition-colors bg-white border-neutral-200 text-black shadow-sm">
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
                <div className="bg-neutral-50/70 border border-neutral-200/60 p-6 md:p-8 rounded-3xl transition-all duration-300 hover:shadow-md hover:shadow-black/[0.02] hover:bg-white">
                  {isEditing ? (
                    <textarea
                      value={editedLead.budget.descricao}
                      onChange={(e) => handleEditChange('descricao', e.target.value, true)}
                      className="w-full p-4 rounded-2xl border border-neutral-200 text-[18px] font-medium focus:ring-2 focus:ring-[#F7D634] outline-none min-h-[150px] resize-none bg-black/5"
                    />
                  ) : (
                    <p className="text-[18px] md:text-[22px] leading-relaxed max-w-3xl font-medium tracking-tight break-words whitespace-pre-wrap text-neutral-800">
                      "{selectedLead.budget.descricao}"
                    </p>
                  )}
                </div>
              </section>

              {selectedLead.budget.fotos && selectedLead.budget.fotos.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F7D634]" />
                    <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Fotos de Referência</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {selectedLead.budget.fotos.map((foto, idx) => (
                      <div
                        key={idx}
                        onClick={() => setViewingPhoto(foto)}
                        className="group relative aspect-square rounded-2xl overflow-hidden border border-neutral-200 shadow-sm cursor-pointer hover:shadow-md transition-all bg-neutral-50"
                      >
                        <img src={foto} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold uppercase tracking-widest">Abrir Foto</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Actions */}
              <section className="space-y-6 pt-16 border-t border-neutral-100">
                <h3 className="text-[11px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Gestão de Status</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <StatusButton label="Novo Lead" active={selectedLead.status === 'Novo'} onClick={() => handleStatusChange(selectedLead.id, 'Novo')} color="#0A84FF" className="cursor-pointer" />
                  <StatusButton label="Em Atendimento" active={selectedLead.status === 'Atendimento'} onClick={() => handleStatusChange(selectedLead.id, 'Atendimento')} color="#FF9F0A" className="cursor-pointer" />
                  <StatusButton label="Pendente" active={selectedLead.status === 'Pendente'} onClick={() => handleStatusChange(selectedLead.id, 'Pendente')} color="#FF3B30" className="cursor-pointer" />
                  <StatusButton label="Finalizado" active={selectedLead.status === 'Finalizado'} icon={<Tick01Icon size={18} />} onClick={() => handleStatusChange(selectedLead.id, 'Finalizado')} color="#30D158" className="cursor-pointer" />
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

      {/* Modals */}
      <ProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        lead={selectedLead}
      />

      {/* Lightbox Modal */}
      {viewingPhoto && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-sm flex items-center justify-center p-10 animate-fade-in"
          onClick={() => setViewingPhoto(null)}
        >
          <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors">
            <Cancel01Icon size={32} />
          </button>
          <img
            src={viewingPhoto}
            className="max-w-full max-h-full object-contain shadow-2xl rounded-lg animate-scale-in"
            alt="Reference"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

function FilterPill({ label, active, onClick, color }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all whitespace-nowrap flex items-center gap-2 ${active
        ? 'bg-[#F7D634] text-black'
        : 'bg-white border border-neutral-200 text-neutral-500 hover:text-black'
        }`}
    >
      {color && <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />}
      {label}
    </button>
  );
}

function SidebarIcon({ icon, active = false, badge = 0 }) {
  return (
    <div className={`p-3 rounded-2xl transition-all cursor-pointer relative ${active
      ? 'bg-[#F7D634] text-black'
      : 'text-neutral-300 hover:text-black hover:bg-black/5'
      }`}>
      {icon}
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF3B30] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-inherit shadow-lg">
          {badge}
        </span>
      )}
    </div>
  );
}

function AppleBadge({ status }) {
  const styles = {
    'Novo': 'bg-[#0A84FF]/15 text-[#0A84FF]',
    'Atendimento': 'bg-[#FF9F0A]/15 text-[#FF9F0A]',
    'Pendente': 'bg-[#FF3B30]/15 text-[#FF3B30]',
    'Finalizado': 'bg-[#30D158]/15 text-[#30D158]'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shrink-0 select-none ${styles[status]}`}>
      {status}
    </span>
  );
}

function DetailBox({ label, value, isEditing = false, onChange, icon }) {
  return (
    <div className="bg-neutral-50/70 border border-neutral-200/60 p-5 rounded-2xl transition-all duration-300 hover:shadow-md hover:shadow-black/[0.02] hover:bg-white flex flex-col justify-between min-h-[105px]">
      <div className="flex justify-between items-start gap-4 mb-2">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{label}</p>
        {icon && <div className="text-zinc-400">{icon}</div>}
      </div>
      {isEditing && onChange ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 -ml-2 rounded-lg border-neutral-200 text-base font-semibold tracking-tight text-black focus:ring-1 focus:ring-[#F7D634] outline-none bg-black/5 border"
        />
      ) : (
        <p className="text-base font-semibold tracking-tight text-neutral-800 break-words">{value || 'N/A'}</p>
      )}
    </div>
  );
}

function StatusButton({ label, active, onClick, color, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer ${active
        ? 'bg-black/5 border-black/10 text-black'
        : 'bg-white border-neutral-200 text-neutral-500 hover:border-black/10 hover:text-black'
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
