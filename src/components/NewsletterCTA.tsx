import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { isSubscribedToNewsletter, setNewsletterSubscribed } from '../utils/storage';

interface NewsletterCTAProps {
  onNotify: (title: string, message: string, type?: 'info' | 'success' | 'warning') => void;
}

export const NewsletterCTA: React.FC<NewsletterCTAProps> = ({ onNotify }) => {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(() => isSubscribedToNewsletter());
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onNotify('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setNewsletterSubscribed(email);
      setSubscribed(true);
      setLoading(false);
      onNotify("You're on the list.", 'The Morning Pulse briefing will arrive in your inbox at 06:00 AM UTC.', 'success');
      setEmail('');
    }, 600);
  };

  return (
    <section id="newsletter-section" className="py-12 sm:py-16 bg-[#111215] text-[#F5F5F2] transition-colors border-b border-[#2E333D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E63946]/20 border border-[#E63946]/40 text-[#E63946] text-xs font-bold uppercase tracking-widest rounded-full mb-4">
          <Mail className="w-3.5 h-3.5" />
          <span>The Morning Pulse</span>
        </div>

        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-4">
          Know what matters. Before it becomes noise.
        </h2>

        <p className="text-sm sm:text-base text-[#A7AAB0] max-w-xl mx-auto mb-8 leading-relaxed">
          Curated global intelligence delivered directly to your inbox every morning. No algorithmic filler, no clickbait—just essential reality.
        </p>

        {subscribed ? (
          <div className="p-6 rounded-lg bg-[#1A1D24] border border-[#2E333D] max-w-md mx-auto flex items-center justify-center gap-3 text-emerald-400">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <div className="text-left text-xs">
              <span className="font-bold text-white block">You are subscribed to The Morning Pulse</span>
              <span className="text-[#A7AAB0]">Daily dispatches will be delivered to your registered inbox.</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="newsletter-email-input"
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-[#1A1D24] text-white border border-[#2E333D] focus:border-[#E63946] rounded-md text-sm outline-none transition-colors placeholder:text-[#5F6368]"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-[#E63946] text-white font-bold uppercase tracking-wider text-xs rounded-md hover:bg-[#c92a37] transition-all flex items-center justify-center gap-1.5 shadow-lg disabled:opacity-50"
              >
                <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#5F6368]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B7A58A]" />
              <span>We respect your privacy. Zero spam. Unsubscribe anytime in one click.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
