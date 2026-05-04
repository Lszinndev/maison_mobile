import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.webp';
import bgImg from '../../assets/login-bg.webp';
import { Mail01Icon, ViewIcon, ViewOffSlashIcon, ArrowRight01Icon, UserLock01Icon, Tick01Icon, Cancel01Icon } from 'hugeicons-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (email === 'admin@maison.com' && password === 'admin123') {
        localStorage.setItem('auth', 'true');
        navigate('/admin/dashboard');
      } else {
        setError('Usuário ou senha incorretos.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const maskEmail = (email) => {
    if (!email || !email.includes('@')) return '---';
    const [user, domain] = email.split('@');
    const [domainName, ...tldParts] = domain.split('.');
    return `${user.slice(0, 2)}***@${domainName.slice(0, 1)}***.${tldParts.join('.')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505] font-sans selection:bg-[#F7D634] selection:text-black">
      {/* Background with Depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.05] grayscale"
          style={{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#F7D634]/5 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[400px] animate-fade-in">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <img src={logoImg} alt="Maison Mobile" className="h-16 w-auto object-contain mb-6" />
          <h1 className="text-xl font-bold text-white tracking-tight">Bem-vindo de volta</h1>
          <p className="text-zinc-500 text-sm mt-1">Acesse sua conta para gerenciar o painel</p>
        </div>

        {/* Card */}
        <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[32px] p-8 md:p-10 shadow-2xl shadow-black/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 ml-1">E-mail</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#F7D634] transition-colors">
                  <Mail01Icon size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:border-[#F7D634]/50 focus:ring-1 focus:ring-[#F7D634]/20 transition-all text-sm"
                  placeholder="exemplo@maison.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-semibold text-zinc-400">Senha</label>
                <button 
                  type="button"
                  onClick={() => { setIsForgotModalOpen(true); setForgotEmail(email); }}
                  className="text-xs text-[#F7D634] hover:underline transition-all"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#F7D634] transition-colors">
                  <UserLock01Icon size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-white placeholder-zinc-700 focus:outline-none focus:border-[#F7D634]/50 focus:ring-1 focus:ring-[#F7D634]/20 transition-all text-sm"
                  placeholder="Sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <ViewOffSlashIcon size={20} /> : <ViewIcon size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-zinc-800 bg-zinc-950 text-[#F7D634] focus:ring-0 cursor-pointer accent-[#F7D634]"
              />
              <label htmlFor="remember" className="text-xs text-zinc-500 cursor-pointer select-none">
                Manter conectado
              </label>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs text-center animate-fade-in">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#F7D634] hover:bg-[#F7D634]/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#F7D634]/10"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>Entrar no sistema</span>
                  <ArrowRight01Icon size={18} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>
        </div>

        <footer className="mt-12 flex justify-center text-[10px] text-zinc-600 uppercase tracking-widest gap-4">
          <span>Maison Mobile © 2026</span>
          <span className="text-zinc-800">|</span>
          <span>v15.6.02</span>
        </footer>
      </div>

      {/* Modal - Estilo Dashboard */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-[#0A0A0A] border border-zinc-800 w-full max-w-[400px] rounded-[32px] p-8 shadow-2xl animate-fade-up">
            <button 
              onClick={() => { setIsForgotModalOpen(false); setForgotStep(1); }}
              className="absolute top-6 right-6 text-zinc-600 hover:text-white"
            >
              <Cancel01Icon size={24} />
            </button>

            {forgotStep === 1 ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Recuperar acesso</h2>
                  <p className="text-zinc-500 text-sm mt-1">Informe seu e-mail cadastrado para prosseguir.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400">Seu e-mail</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white outline-none focus:border-[#F7D634]/50"
                    placeholder="email@maison.com"
                  />
                </div>

                <button
                  onClick={() => setForgotStep(2)}
                  className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-[#F7D634] transition-all"
                >
                  Enviar instruções
                </button>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Tick01Icon size={32} className="text-green-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">E-mail enviado</h2>
                  <p className="text-zinc-500 text-sm mt-1">
                    Verifique sua caixa de entrada:<br/>
                    <span className="text-zinc-200 mt-2 block font-medium">{maskEmail(forgotEmail)}</span>
                  </p>
                </div>
                <button
                  onClick={() => { setIsForgotModalOpen(false); setForgotStep(1); }}
                  className="text-sm text-[#F7D634] font-bold hover:underline"
                >
                  Voltar para o login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
