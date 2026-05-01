import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.webp';
import { FileSearchIcon, Cancel01Icon, Ticket01Icon, Tick01Icon } from 'hugeicons-react';

// Mock de Leads/Contatos com TODOS os campos do BudgetModal
const mockLeads = [
  { 
    id: 1, 
    name: 'João Silva', 
    email: 'joao@email.com', 
    phone: '(21) 99999-9999', 
    status: 'Novo', 
    date: '2026-04-25',
    budget: {
      ambiente: 'Cozinha',
      largura: '3.50',
      altura: '2.40',
      mdf: 'MDF Melamínico',
      estilo: 'Industrial',
      puxadores: 'Perfil Alumínio',
      corredicas: true,
      amortecedores: true,
      marcaFerragem: 'Blum',
      acessorios: ['Lixeira Zen', 'Porta-talheres PVC', 'Porta-temperos Aramado', 'LED/Spot', 'Tomadas'],
      descricao: 'Cliente busca um aproveitamento total da parede principal com armários aéreos até o teto. Prefere tons escuros para contrastar com a bancada de mármore claro.',
      nome: 'João Silva',
      email: 'joao@email.com',
      telefone: '(21) 99999-9999'
    }
  },
  { 
    id: 2, 
    name: 'Maria Souza', 
    email: 'maria@email.com', 
    phone: '(21) 98888-8888', 
    status: 'Em Atendimento', 
    date: '2026-04-24',
    budget: {
      ambiente: 'Quarto',
      largura: '4.20',
      altura: '2.70',
      mdf: 'MDF c/ Pintura Laca',
      estilo: 'Provençal',
      puxadores: 'Cava (Usinado)',
      corredicas: true,
      amortecedores: true,
      marcaFerragem: 'Häfele',
      acessorios: ['Cabideiro Oval', 'Calceiro', 'Gaveta Porta-joia', 'LED/Spot', 'Sistema de Portas de Correr'],
      descricao: 'Closet em formato de L com divisões específicas para sapatos e vestidos longos. Necessita de gavetas com organizadores aveludados.',
      nome: 'Maria Souza',
      email: 'maria@email.com',
      telefone: '(21) 98888-8888'
    }
  },
  { 
    id: 3, 
    name: 'Pedro Santos', 
    email: 'pedro@email.com', 
    phone: '(21) 97777-7777', 
    status: 'Finalizado', 
    date: '2026-04-23',
    budget: {
      ambiente: 'Banheiro',
      largura: '1.20',
      altura: '0.85',
      mdf: 'Lâmina Natural',
      estilo: 'Liso',
      puxadores: 'Toque (Push)',
      corredicas: false,
      amortecedores: true,
      marcaFerragem: 'FGV/TN',
      acessorios: ['Espelhos', 'Tulha MDF', 'LED/Spot'],
      descricao: 'Gabinete suspenso com cuba esculpida. Material precisa ser altamente resistente à umidade.',
      nome: 'Pedro Santos',
      email: 'pedro@email.com',
      telefone: '(21) 97777-7777'
    }
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState(mockLeads);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/admin');
  };

  const handleStatusChange = (id, newStatus) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead)
    );
  };

  const openDetails = (lead) => {
    setSelectedLead(lead);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* Navbar Admin */}
      <header className="bg-slate-800 border-b border-slate-700/50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logoImg} alt="Maison Mobile" className="h-10 w-auto object-contain" />
        </div>

        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium rounded-lg transition-colors"
        >
          Sair
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
          <span className="px-3 py-1 bg-[#F7D634]/10 text-[#F7D634] text-xs font-semibold rounded-full border border-[#F7D634]/20">
            {leads.length} Contatos no total
          </span>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700 text-slate-300 text-sm font-semibold uppercase tracking-wider">
                  <th className="p-5">Nome</th>
                  <th className="p-5">E-mail</th>
                  <th className="p-5">Telefone</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 text-center">Detalhes</th>
                  <th className="p-5">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-sm text-slate-300">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-700/20 transition-all duration-200">
                    <td className="p-5 font-medium text-slate-100">{lead.name}</td>
                    <td className="p-5">{lead.email}</td>
                    <td className="p-5">{lead.phone}</td>
                    <td className="p-5">
                      <select 
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`bg-slate-900 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F7D634] transition-all ${
                          lead.status === 'Novo' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' :
                          lead.status === 'Em Atendimento' ? 'text-[#F7D634] bg-[#F7D634]/10 border-[#F7D634]/20' :
                          'text-green-400 bg-green-500/10 border-green-500/20'
                        }`}
                      >
                        <option value="Novo">Novo</option>
                        <option value="Em Atendimento">Em Atendimento</option>
                        <option value="Finalizado">Finalizado</option>
                      </select>
                    </td>
                    <td className="p-5 text-center">
                      <button 
                        onClick={() => openDetails(lead)}
                        className="p-2.5 bg-slate-100 text-slate-800 rounded-xl hover:bg-white hover:scale-110 transition-all shadow-sm group"
                      >
                        <FileSearchIcon size={20} className="group-hover:text-black transition-colors" />
                      </button>
                    </td>
                    <td className="p-5 text-slate-400 font-mono">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Budget Details Modal */}
      {isDetailsModalOpen && selectedLead && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden animate-fade-up flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-8 px-10 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-800">
                  <Ticket01Icon size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight uppercase">
                  Orçamento ID Nº {selectedLead.id}
                </h2>
              </div>
              <button 
                onClick={() => setIsDetailsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-800 transition-all"
              >
                <Cancel01Icon size={32} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 md:p-12 overflow-y-auto scrollbar-hide">

              {/* Contact Info */}
              <div className="mb-10 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Dados do Cliente</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Nome</p>
                    <p className="text-base font-bold text-slate-800">{selectedLead.budget.nome}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">E-mail</p>
                    <p className="text-base font-bold text-slate-800">{selectedLead.budget.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Telefone</p>
                    <p className="text-base font-bold text-slate-800">{selectedLead.budget.telefone}</p>
                  </div>
                </div>
              </div>

              {/* Main Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-12 mb-10">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ambiente</p>
                  <p className="text-lg font-bold text-slate-800">{selectedLead.budget.ambiente}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Largura (m)</p>
                  <p className="text-lg font-bold text-slate-800">{selectedLead.budget.largura}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Altura (m)</p>
                  <p className="text-lg font-bold text-slate-800">{selectedLead.budget.altura}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Estilo</p>
                  <p className="text-lg font-bold text-slate-800">{selectedLead.budget.estilo}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Acabamento</p>
                  <p className="text-lg font-bold text-slate-800">{selectedLead.budget.mdf}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Puxadores</p>
                  <p className="text-lg font-bold text-slate-800">{selectedLead.budget.puxadores}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Marca Ferragem</p>
                  <p className="text-lg font-bold text-slate-800">{selectedLead.budget.marcaFerragem}</p>
                </div>
              </div>

              {/* Ferragens Checkboxes */}
              <div className="mb-10 border-t border-slate-100 pt-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Ferragens Adicionais</p>
                <div className="flex flex-wrap gap-4">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold ${selectedLead.budget.corredicas ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-400'}`}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${selectedLead.budget.corredicas ? 'bg-green-600' : 'bg-red-300'}`}>
                      <Tick01Icon size={14} className="text-white" />
                    </div>
                    Corrediças
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-bold ${selectedLead.budget.amortecedores ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-400'}`}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center ${selectedLead.budget.amortecedores ? 'bg-green-600' : 'bg-red-300'}`}>
                      <Tick01Icon size={14} className="text-white" />
                    </div>
                    Amortecedores
                  </div>
                </div>
              </div>

              {/* Accessories Tag List */}
              <div className="mb-10 border-t border-slate-100 pt-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Acessórios Selecionados</p>
                <div className="flex flex-wrap gap-3">
                  {selectedLead.budget.acessorios.map((item, idx) => (
                    <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-700 text-sm font-bold rounded-xl border border-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 border-t border-slate-100 pt-8">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Descrição do produto</p>
                <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] text-slate-600 leading-relaxed italic text-lg shadow-inner">
                  "{selectedLead.budget.descricao}"
                </div>
              </div>
            </div>

            {/* Modal Footer Buttons */}
            <div className="p-8 px-12 border-t border-slate-100 flex justify-end gap-4 bg-white sticky bottom-0">
              <button className="px-8 py-4 bg-[#333333] hover:bg-black text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95">
                Exportar como .xlsx
              </button>
              <button className="px-8 py-4 bg-[#333333] hover:bg-black text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95">
                Exportar como PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


