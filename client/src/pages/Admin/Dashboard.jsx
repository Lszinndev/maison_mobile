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


/*const mockLeads = [
  { id: 1, name: 'João ', email: 'joao@email.com', status: 'Novo', date: '25 Abr', budget: { ambiente: 'Cozinha', mdf: 'MDF Melamínico', estilo: 'Industrial', descricao: 'Projeto para cozinha americana com ilha central e acabamento fosco.' } },
  { id: 2, name: 'Maria Souza', email: 'maria@email.com', status: 'Atendimento', date: '24 Abr', budget: { ambiente: 'Quarto', mdf: 'Laca', estilo: 'Provençal', descricao: 'Closet em L com divisões específicas para calçados e vestidos.' } },
  { id: 3, name: 'Pedro Santos', email: 'pedro@email.com', status: 'Finalizado', date: '23 Abr', budget: { ambiente: 'Banheiro', mdf: 'Lâmina Natural', estilo: 'Liso', descricao: 'Gabinete suspenso com cuba esculpida em mármore.' } },
];*/


export default function Dashboard() {
  const navigate = useNavigate();
  //const [leads, setLeads] = useState(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  //const [selectedLead, setSelectedLead] = useState(mockLeads[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(null);
  const [viewingPhoto, setViewingPhoto] = useState(null);
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

    // Mocks iniciais mais completos para combinar com o novo layout
    /*const enhancedMocks = mockLeads.map(l => ({
      ...l,
      budget: {
        ...l.budget,
        ferragens: 'Blum',
        puxadores: 'Cava (Usinado)',
        medidas: '2.50m x 2.70m',
        whatsapp: '(41) 99999-0000'
      }
    }));

    setLeads(enhancedMocks);

    // Selecionar o lead mais recente por padrão
    if (enhancedMocks.length > 0) setSelectedLead(enhancedMocks[0]);*/
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/admin');
  };

  const handleStatusChange = (id, newStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status: newStatus });
  };

  const handleStartEdit = () => {
    setEditedLead({ ...selectedLead });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedLead(null);
  };

  const handleSaveEdit = () => {
    const updatedLeads = leads.map(l => l.id === editedLead.id ? editedLead : l);
    setLeads(updatedLeads);
    setSelectedLead(editedLead);
    setIsEditing(false);
    setEditedLead(null);
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
    <div className={`h-screen font-sans flex antialiased overflow-hidden selection:bg-[#F7D634] selection:text-black transition-colors duration-500 bg-[#F5F5F7] text-[#1D1D1F]`}>

      {/* 1. Slim Sidebar */}
      <aside className={`w-16 lg:w-20 border-r flex flex-col items-center py-8 gap-10 shrink-0 transition-colors duration-500 bg-white border-neutral-200`}>
        <img src={logoImg} alt="M" className="h-5 w-auto" />
        <nav className="flex flex-col gap-8">
          <SidebarIcon
            icon={<UserGroupIcon size={22} />}
            active
            badge={leads.filter(l => l.status === 'Novo').length}
          />
        </nav>

        <div className="mt-auto flex flex-col items-center gap-6">
          <button onClick={handleLogout} className="text-zinc-600 transition-colors p-2 hover:text-black">
            <Logout01Icon size={22} />
          </button>
        </div>
      </aside>

      {/* 2. Middle Pane - List */}
      <section className="w-80 lg:w-96 border-r flex flex-col shrink-0 transition-colors duration-500 bg-[#F5F5F7] border-neutral-200">
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

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-hide">
          {currentLeads.map((lead) => (
            <div
              key={lead.id}
              onClick={() => {
                setSelectedLead(lead);
                setIsEditing(false);
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
          ))}
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
      <main className="flex-1 flex flex-col min-w-0 transition-colors duration-500 bg-white">
        {selectedLead ? (
          <div className="flex flex-col h-full animate-fade-in">
            {/* Header */}
            <header className="p-10 pb-12 flex justify-between items-start border-b transition-colors duration-500 bg-[#F5F5F7]/30 border-neutral-100 backdrop-blur-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h2 className="text-4xl font-bold tracking-tight text-black">{selectedLead.name}</h2>
                  <AppleBadge status={selectedLead.status} />
                </div>
                <div className="flex items-center gap-4 text-[13px] text-zinc-500 font-medium">
                  <span>{selectedLead.email}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-300" />
                  <span>ID #{selectedLead.id.toString().padStart(4, '0')}</span>
                </div>
              </div>
              <div className="flex gap-3">
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
            </header>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-12 lg:p-16 space-y-16 scrollbar-hide">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
                <DetailBox
                  label="Ambiente"
                  value={isEditing ? editedLead.budget.ambiente : selectedLead.budget.ambiente}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('ambiente', val, true)}
                />
                <DetailBox
                  label="Acabamento"
                  value={isEditing ? editedLead.budget.mdf : selectedLead.budget.mdf}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('mdf', val, true)}
                />
                <DetailBox
                  label="Estilo"
                  value={isEditing ? editedLead.budget.estilo : selectedLead.budget.estilo}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('estilo', val, true)}
                />
                <DetailBox
                  label="Recebido"
                  value={selectedLead.date}
                />

                <DetailBox
                  label="Ferragens"
                  value={isEditing ? (editedLead.budget.ferragens || '') : (selectedLead.budget.ferragens || 'N/A')}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('ferragens', val, true)}
                />
                <DetailBox
                  label="Puxadores"
                  value={isEditing ? (editedLead.budget.puxadores || '') : (selectedLead.budget.puxadores || 'N/A')}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('puxadores', val, true)}
                />
                <DetailBox
                  label="Medidas"
                  value={isEditing ? (editedLead.budget.medidas || '') : (selectedLead.budget.medidas || 'N/A')}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('medidas', val, true)}
                />
                <DetailBox
                  label="WhatsApp"
                  value={isEditing ? (editedLead.budget.whatsapp || '') : (selectedLead.budget.whatsapp || 'N/A')}
                  isEditing={isEditing}
                  onChange={(val) => handleEditChange('whatsapp', val, true)}
                />
              </div>

              {selectedLead.budget.acessorios && selectedLead.budget.acessorios.length > 0 && (
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F7D634]" />
                    <h3 className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Acessórios & Upgrades</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedLead.budget.acessorios.map((acc, index) => (
                      <div key={index} className="px-4 py-2 border rounded-xl text-[13px] font-semibold transition-colors bg-white border-neutral-200 text-black">
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
                {isEditing ? (
                  <textarea
                    value={editedLead.budget.descricao}
                    onChange={(e) => handleEditChange('descricao', e.target.value, true)}
                    className="w-full p-4 rounded-2xl border border-neutral-200 text-[18px] font-medium focus:ring-2 focus:ring-[#F7D634] outline-none min-h-[150px] resize-none"
                  />
                ) : (
                  <p className="text-[22px] leading-snug max-w-3xl font-medium tracking-tight break-words whitespace-pre-wrap text-neutral-700">
                    "{selectedLead.budget.descricao}"
                  </p>
                )}
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
    'Novo': 'bg-[#0A84FF]/20 text-[#0A84FF]',
    'Atendimento': 'bg-[#FF9F0A]/20 text-[#FF9F0A]',
    'Pendente': 'bg-[#FF3B30]/20 text-[#FF3B30]',
    'Finalizado': 'bg-[#30D158]/20 text-[#30D158]'
  };
  return (
    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${styles[status]}`}>
      {status}
    </div>
  );
}

function DetailBox({ label, value, isEditing = false, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{label}</p>
      {isEditing && onChange ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 -ml-2 rounded-lg border-neutral-200 text-[18px] font-bold tracking-tight text-black focus:ring-1 focus:ring-[#F7D634] outline-none bg-black/5 border"
        />
      ) : (
        <p className="text-[18px] font-bold tracking-tight text-black">{value}</p>
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
