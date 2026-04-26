import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.webp';

// Mock de Leads/Contatos
const mockLeads = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '(21) 99999-9999', status: 'Novo', date: '2026-04-25' },
  { id: 2, name: 'Maria Souza', email: 'maria@email.com', phone: '(21) 98888-8888', status: 'Em Atendimento', date: '2026-04-24' },
  { id: 3, name: 'Pedro Santos', email: 'pedro@email.com', phone: '(21) 97777-7777', status: 'Finalizado', date: '2026-04-23' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState(mockLeads);

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
      <main className="flex-1 p-6 max-w-6xl w-full mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Leads (Contatos)</h1>
          <span className="px-3 py-1 bg-[#F7D634]/10 text-[#F7D634] text-xs font-semibold rounded-full border border-[#F7D634]/20">

            {leads.length} Contatos no total
          </span>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800 border-b border-slate-700 text-slate-300 text-sm font-semibold">
                  <th className="p-4">Nome</th>
                  <th className="p-4">E-mail</th>
                  <th className="p-4">Telefone</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-sm text-slate-300">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="p-4 font-medium text-slate-100">{lead.name}</td>
                    <td className="p-4">{lead.email}</td>
                    <td className="p-4">{lead.phone}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'Novo' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        lead.status === 'Em Atendimento' ? 'bg-[#F7D634]/10 text-[#F7D634] border border-[#F7D634]/20' :

                        'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400">{lead.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
