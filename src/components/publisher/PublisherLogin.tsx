import React, { useState } from 'react';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck, Newspaper, ArrowLeft } from 'lucide-react';
import { loginPublisher } from '../../utils/auth';
import { PublisherUser } from '../../types';

interface PublisherLoginProps {
  onLoginSuccess: (user: PublisherUser) => void;
  onNavigateHome: () => void;
}

export const PublisherLogin: React.FC<PublisherLoginProps> = ({ onLoginSuccess, onNavigateHome }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide your editorial username and passkey.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const res = await loginPublisher(email, password);
    setLoading(false);

    if (res.success && res.user) {
      onLoginSuccess(res.user);
    } else {
      setErrorMessage(res.error || 'Authentication rejected. Verify your newsroom credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F5F5F2] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Navbar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#E63946] flex items-center justify-center text-white font-bold text-base shadow-sm">
            W
          </div>
          <div>
            <span className="font-display font-black text-lg tracking-tight text-white block">
              WHAT’S GOING ON
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B7A58A]">
              Editorial Newsroom Portal
            </span>
          </div>
        </div>

        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#A7AAB0] hover:text-white rounded-md border border-[#2E333D] hover:bg-[#1A1D24] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Public Reader Portal</span>
        </button>
      </div>

      {/* Center Login Box */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-[#14171D] border border-[#2E333D] rounded-xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center pb-6 border-b border-[#2E333D]">
            <div className="w-12 h-12 rounded-full bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-2xl text-white">
              Publisher Authentication
            </h2>
            <p className="text-xs text-[#A7AAB0] mt-1">
              Restricted workspace for Editors, Bureau Chiefs, and Authorized Journalists
            </p>
          </div>

          {errorMessage && (
            <div className="mt-4 p-3 rounded-lg bg-red-950/40 border border-red-800 text-xs text-red-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                Editorial Email / Bureau ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#5F6368] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="publisher-login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="editor@whatsgoingon.com"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0]">
                  Passkey / Secret Key
                </label>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#5F6368] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="publisher-login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#A7AAB0]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded bg-[#0F1115] border-[#2E333D] text-[#E63946] focus:ring-[#E63946]"
                />
                <span>Keep session active on this workstation</span>
              </label>
            </div>

            <button
              id="publisher-login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#E63946] hover:bg-[#C92A37] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Enter Publisher Newsroom</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Security Footer */}
      <div className="max-w-md w-full mx-auto text-center text-xs text-[#5F6368] flex items-center justify-center gap-1.5 py-2">
        <ShieldCheck className="w-4 h-4 text-[#B7A58A]" />
        <span>End-to-End Cryptographic Token Session Auth • 2026 What’s Going On</span>
      </div>
    </div>
  );
};
