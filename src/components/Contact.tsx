import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Globe, ArrowUpRight, MessageSquare, AlertCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { TypewriterText } from './TypewriterText';
import { MessageBlockTypewriter } from './MessageBlockTypewriter';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Truthful client-side mailto draft (No fake backend claims)
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Rakesh,\n\n${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`
    );
    window.location.href = `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 border-t border-zinc-200 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header with Message Block Typing Animation */}
        <div className="space-y-4 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
            <span>//</span>
            <span>GET IN TOUCH · LET'S CONNECT</span>
          </div>
          <MessageBlockTypewriter
            as="h2"
            text="Have an Idea? Let's Build Something Great."
            badgeLabel="TRANSMISSION // INBOX"
            className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-zinc-900 dark:text-white"
            speed={20}
          />
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            Whether you want to discuss a project collaboration, software development, automation workflows, or internship opportunities, my inbox is always open.
          </p>
        </div>

        {/* Two-Column Grid: Contact Information & Direct Message Dispatcher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Info & Verified Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card with 1-Click Copy */}
            <div className="p-6 sm:p-8 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Direct Email Address
              </div>

              <div className="text-base sm:text-lg font-mono text-zinc-900 dark:text-white break-all select-all font-semibold">
                {personalInfo.contact.email}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={copyEmail}
                  className="px-4 py-2 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-800 dark:text-zinc-200 rounded-xl transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-blue-500" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Mail</span>
                </a>
              </div>
            </div>

            {/* Verified Digital Profiles */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Verified Profiles
              </div>
              <div className="flex flex-col gap-2.5">
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 hover:border-blue-500/50 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-900 dark:text-white">
                      <Github className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-mono text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors">
                        GitHub Profile
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        @rakeshbutnotrakesh
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                </a>

                <a
                  href={personalInfo.contact.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 hover:border-blue-500/50 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-900 dark:text-white">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold font-mono text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors">
                        Live Vercel Portfolio
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        rakesh-kumar-mondal.vercel.app
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                </a>
              </div>
            </div>

            {/* Note on LinkedIn */}
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 text-[11px] text-zinc-500 font-mono flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>LinkedIn profile can be added once verified. No placeholders or invented social handles are rendered.</span>
            </div>
          </div>

          {/* Right Column: Direct Message Composer */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/5">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                  Message Dispatcher
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  Prepares mailto envelope
                </span>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Developer Internship"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Rakesh, I would like to discuss..."
                    className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors font-sans resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-wider font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message Draft</span>
                  </button>

                  {formSubmitted && (
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>Email draft prepared in your email client!</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
