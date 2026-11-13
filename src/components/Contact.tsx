import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Globe, ArrowUpRight, AlertCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { MessageBlockTypewriter } from './MessageBlockTypewriter';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [clipboardError, setClipboardError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (trimmedName.length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (trimmedMessage.length < 10) {
      nextErrors.message = 'Please write a short message (at least 10 characters).';
    }
    return nextErrors;
  };

  const copyEmail = async () => {
    setClipboardError(null);
    try {
      await navigator.clipboard.writeText(personalInfo.contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setClipboardError('Clipboard access unavailable — please copy the email address above manually.');
    }
  };

  const copyMessageDraft = async () => {
    setClipboardError(null);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formatted = `To: ${personalInfo.contact.email}\nSubject: ${formData.subject.trim() || `Inquiry from ${formData.name.trim()}`}\n\nHello Rakesh,\n\n${formData.message.trim()}\n\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2500);
    } catch {
      setClipboardError('Clipboard access unavailable — please copy your message manually.');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(false);
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const subject = encodeURIComponent(formData.subject.trim() || `Inquiry from ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Hello Rakesh,\n\n${formData.message.trim()}\n\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`
    );
    window.location.href = `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (formSubmitted) {
      setFormSubmitted(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-zinc-200 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-semibold">
            Get In Touch · Connect
          </div>
          <MessageBlockTypewriter
            as="h2"
            text="Have an Idea? Let's Build Something Great."
            badgeLabel="TRANSMISSION // INBOX"
            className="text-2xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-zinc-900 dark:text-white text-balance"
            speed={20}
          />
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            Whether you want to discuss a software project, web development collaboration, automation workflow, or internship opportunity, feel free to reach out directly.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Direct Info & Verified Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500">
                Direct Email Address
              </div>

              <div className="text-sm sm:text-lg font-mono text-zinc-900 dark:text-white break-all select-all font-semibold">
                {personalInfo.contact.email}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-4 py-2 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-800 dark:text-zinc-200 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Mail App</span>
                </a>
              </div>

              {clipboardError && (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-sans pt-1">
                  {clipboardError}
                </p>
              )}
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
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-900 dark:text-white shrink-0">
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold font-mono text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        GitHub Profile
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono truncate">
                        github.com/rakeshbutnotrakesh
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors shrink-0" />
                </a>

                <a
                  href={personalInfo.contact.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 hover:border-blue-500/50 flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-white/5 flex items-center justify-center text-zinc-900 dark:text-white shrink-0">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold font-mono text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Live Portfolio
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono truncate">
                        portfolio-two-puce-hj49ocwerj.vercel.app
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-500 transition-colors shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Client-Side Email Composer */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-semibold">
                  Compose Email Draft
                </span>
                <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  Opens your email app or copies formatted draft
                </span>
              </div>

              <form onSubmit={handleFormSubmit} noValidate className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-[11px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Jane Doe"
                      className={`w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-colors font-sans ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-zinc-200 dark:border-white/10 focus:border-blue-500'
                      }`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="text-[11px] text-red-600 dark:text-red-400 font-sans flex items-center gap-1 pt-0.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-[11px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="jane@company.com"
                      className={`w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-colors font-sans ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-zinc-200 dark:border-white/10 focus:border-blue-500'
                      }`}
                    />
                    {errors.email && (
                      <p id="contact-email-error" className="text-[11px] text-red-600 dark:text-red-400 font-sans flex items-center gap-1 pt-0.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-[11px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="Project Inquiry / Developer Internship"
                    className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-[11px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Hello Rakesh, I would like to discuss..."
                    className={`w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-800/80 border rounded-xl text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none transition-colors font-sans resize-none ${
                      errors.message
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-zinc-200 dark:border-white/10 focus:border-blue-500'
                    }`}
                  />
                  {errors.message && (
                    <p id="contact-message-error" className="text-[11px] text-red-600 dark:text-red-400 font-sans flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-wider font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Open Email Draft</span>
                  </button>

                  <button
                    type="button"
                    onClick={copyMessageDraft}
                    className="w-full sm:w-auto px-4 py-3 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400">Draft Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>

                {formSubmitted && (
                  <div
                    role="status"
                    className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300 font-sans flex items-start gap-2"
                  >
                    <Check className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Your email app has been prompted with the drafted message to {personalInfo.contact.email}. If no mail client opened, click &ldquo;Copy Message&rdquo; and paste it into your email provider.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
