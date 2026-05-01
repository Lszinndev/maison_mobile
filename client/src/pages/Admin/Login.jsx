import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.webp';
import bgImg from '../../assets/login-bg.webp';
import { Mail01Icon, ViewIcon, ViewOffSlashIcon, LockPasswordIcon, Tick01Icon, Cancel01Icon } from 'hugeicons-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot Password State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState('');

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

  const maskEmail = (email) => {
    if (!email) return '---';
    const [user, domain] = email.split('@');
    return `${user.slice(0, 3)}***** @${domain.slice(0, 2)}********* .com.br`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-end pr-[5%] md:pr-[10%] lg:pr-[1%] font-sans bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Dark Blur Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[4px]"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[480px] bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-[40px] p-10 md:p-14 shadow-2xl animate-fade-in">
        <div className="flex flex-col items-center mb-10">
          <img src={logoImg} alt="Maison Mobile" className="h-28 w-auto object-contain mb-8" />
          <h1 className="text-3xl font-bold text-slate-100 mb-1">Olá novamente!</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="block text-lg font-semibold text-slate-300">Usuário:</label>
            <div className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-5 pr-12 py-4 bg-slate-950/50 border border-slate-700 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#F7D634]/30 focus:border-[#F7D634] transition-all text-lg"
                placeholder="admin@maison.com"
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#F7D634] transition-colors">
                <Mail01Icon size={24} />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-slate-300">Senha:</label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-5 pr-12 py-4 bg-slate-950/50 border border-slate-700 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#F7D634]/30 focus:border-[#F7D634] transition-all text-lg"
                placeholder="****************"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
              >
                {showPassword ? <ViewOffSlashIcon size={24} /> : <ViewIcon size={24} />}
              </button>
            </div>
            <div className="flex justify-end">
              <button 
                type="button"
                onClick={() => { setIsForgotModalOpen(true); setForgotEmail(email); }}
                className="text-slate-400 text-sm italic hover:text-[#F7D634] transition-colors"
              >
                Esqueceu sua senha?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#F7D634] hover:bg-[#e5c323] text-slate-950 font-bold rounded-2xl shadow-xl shadow-[#F7D634]/10 transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98] text-xl"
          >
            Login
          </button>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="remember"
              className="w-5 h-5 rounded-full border-slate-700 bg-slate-950/50 text-[#F7D634] focus:ring-[#F7D634] cursor-pointer"
            />
            <label htmlFor="remember" className="text-slate-400 text-lg cursor-pointer flex items-center gap-2">
              Lembrar minha conta
            </label>
          </div>
        </form>

        <div className="mt-16 flex justify-end">
          <p className="text-slate-500 text-sm font-medium">Versão do sistema: 15.6.02</p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-slate-900 w-full max-w-xl rounded-[50px] overflow-hidden shadow-2xl border border-slate-800 animate-fade-up">
            
            {/* Header Content */}
            <div className="p-10 md:p-14 pb-8 flex flex-col items-center">
              {/* Close Button */}
              <button 
                onClick={() => { setIsForgotModalOpen(false); setForgotStep(1); }}
                className="absolute top-10 right-10 text-slate-500 hover:text-slate-100 transition-colors"
              >
                <Cancel01Icon size={28} />
              </button>

              {forgotStep === 1 ? (
                <>
                  <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mb-8 border border-slate-700">
                    <LockPasswordIcon size={48} className="text-[#F7D634]" />
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-100 mb-2 text-center">Informe seu e-mail:</h2>
                  <p className="text-slate-400 text-lg text-center mb-10 max-w-sm">
                    Será enviado um código de confirmação para o e-mail informado.
                  </p>
                  
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-950/50 border border-slate-700 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#F7D634]/30 focus:border-[#F7D634] transition-all text-lg"
                    placeholder="admin@maison.com"
                  />
                </>
              ) : (
                <div className="py-6 flex flex-col items-center">
                  <div className="w-28 h-28 bg-[#F7D634]/10 rounded-full flex items-center justify-center mb-10 border border-[#F7D634]/20">
                    <Tick01Icon size={56} className="text-[#F7D634]" strokeWidth={2.5} />
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-100 mb-4 text-center">Código enviado!</h2>
                  <p className="text-slate-400 text-xl text-center max-w-md">
                    Um novo código foi enviado para: <br />
                    <span className="font-medium text-slate-200">{maskEmail(forgotEmail)}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Footer with Button (Step 1 only) */}
            {forgotStep === 1 && (
              <div className="bg-slate-950/30 border-t border-slate-800 p-8 px-14 flex justify-end">
                <button
                  onClick={() => setForgotStep(2)}
                  className="px-10 py-4 bg-[#F7D634] hover:bg-[#e5c323] text-slate-950 font-bold rounded-2xl transition-all shadow-lg text-lg"
                >
                  Enviar confirmação
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



