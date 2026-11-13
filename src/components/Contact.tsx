import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Globe, ArrowUpRight, AlertCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

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
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (formData.message.trim().length < 10) {
      nextErrors.message = 'Please enter a brief message (at least 10 characters).';
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
      setClipboardError('Clipboard access unavailable — please copy the email address manually.');
    }
  };

  const copyMessageDraft = async () => {
    setClipboardError(null);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formatted = `To: ${personalInfo.contact.email}\nSubject: Inquiry from ${formData.name.trim()}\n\nHello Rakesh,\n\n${formData.message.trim()}\n\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`;
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
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Hello Rakesh,\n\n${formData.message.trim()}\n\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`
    );
    window.location.href = `mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (formSubmitted) {
      setFormSubmitted(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 border-b border-[var(--border-hairline)] scroll-mt-20"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2 max-w-2xl">
          <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
            Contact
          </div>
          <h2 className="heading-section font-bold text-[var(--text-primary)]">
            Let&apos;s build something practical together.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Available for software development roles, web engineering internships, and automation projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Large Copy-to-Clipboard Email Button + Social Links */}
          <div className="lg:col-span-5 space-y-6">
            {/* Large Click-to-Copy Email Card Button */}
            <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
              <div className="font-mono text-xs text-[var(--text-muted)]">
                Direct Email (Click to Copy)
              </div>

              <button
                type="button"
                onClick={copyEmail}
                className="min-h-[56px] w-full px-4 py-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--accent)] text-left flex items-center justify-between gap-3 transition-all duration-200 cursor-pointer group"
                aria-label={`Copy email address ${personalInfo.contact.email}`}
              >
                <span className="font-mono text-sm sm:text-base font-semibold text-[var(--text-primary)] break-all">
                  {personalInfo.contact.email}
                </span>
                <span className="shrink-0 inline-flex items-center gap-1.5 font-mono text-xs text-[var(--accent-text)]">
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </span>
              </button>

              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="min-h-[44px] w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[var(--accent-fg)] inline-flex items-center justify-center gap-2 transition-opacity duration-150 hover:opacity-90"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <Mail className="w-4 h-4" />
                <span>Open Mail Client</span>
              </a>

              {clipboardError && (
                <p className="text-xs text-amber-500">{clipboardError}</p>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-2.5">
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] flex items-center justify-between gap-3 transition-colors duration-150 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Github className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[var(--text-primary)]">GitHub</div>
                    <div className="font-mono text-xs text-[var(--text-muted)] truncate">
                      github.com/rakeshbutnotrakesh
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-text)] shrink-0" />
              </a>

              <a
                href={personalInfo.contact.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] flex items-center justify-between gap-3 transition-colors duration-150 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Globe className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[var(--text-primary)]">Portfolio</div>
                    <div className="font-mono text-xs text-[var(--text-muted)] truncate">
                      portfolio-two-puce-hj49ocwerj.vercel.app
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-text)] shrink-0" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Simple Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleFormSubmit}
              noValidate
              className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-mono text-[var(--text-secondary)]">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Alex Rivera"
                    className={`min-h-[44px] w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors duration-150 ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[var(--border-hairline)] focus:border-[var(--accent)]'
                    }`}
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="text-xs text-red-500 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-mono text-[var(--text-secondary)]">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="alex@company.com"
                    className={`min-h-[44px] w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors duration-150 ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[var(--border-hairline)] focus:border-[var(--accent)]'
                    }`}
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="text-xs text-red-500 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-mono text-[var(--text-secondary)]">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="Tell me about the role, project, or collaboration..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors duration-150 resize-none ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--border-hairline)] focus:border-[var(--accent)]'
                  }`}
                />
                {errors.message && (
                  <p id="contact-message-error" className="text-xs text-red-500 flex items-center gap-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="min-h-[44px] w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-medium text-[var(--accent-fg)] inline-flex items-center justify-center gap-2 transition-opacity duration-150 hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                <button
                  type="button"
                  onClick={copyMessageDraft}
                  className="min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] text-sm font-medium text-[var(--text-primary)] inline-flex items-center justify-center gap-2 transition-colors duration-150 cursor-pointer"
                >
                  {copiedDraft ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-emerald-500">Draft Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[var(--accent-text)]" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>
              </div>

              {formSubmitted && (
                <div
                  role="status"
                  className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-[var(--text-primary)] flex items-start gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Email draft prepared for {personalInfo.contact.email}. If your mail client did not open, click &ldquo;Copy Draft&rdquo; to paste it directly.
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
