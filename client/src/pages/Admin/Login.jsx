import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.webp';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de login
    if (email === 'admin@maison.com' && password === 'admin123') {
      localStorage.setItem('auth', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Credenciais inválidas! (Use admin@maison.com / admin123)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 font-sans">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-[#F7D634]/5"></div>

      
      <div className="relative z-10 w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img src={logoImg} alt="Maison Mobile" className="h-16 w-auto object-contain mb-2" />
          <p className="text-slate-400 text-sm">Área Administrativa</p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#F7D634]/30 focus:border-[#F7D634] transition-all"

              placeholder="admin@maison.com"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#F7D634]/30 focus:border-[#F7D634] transition-all"

              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-[#F7D634] hover:bg-[#e5c323] text-slate-950 font-semibold rounded-lg shadow-lg shadow-[#F7D634]/10 transition-all duration-300 transform hover:-translate-y-0.5"
          >

            Entrar no Painel
          </button>
        </form>
      </div>
    </div>
  );
}
