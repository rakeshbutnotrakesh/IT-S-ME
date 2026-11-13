import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Globe,
  ArrowUpRight,
  AlertCircle,
  Loader2,
  Linkedin,
} from 'lucide-react';
import { portfolioConfig } from '../config/portfolioConfig';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'sent' | 'mailto-fallback' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.setTimeout(() => setToastMessage(null), 2600);
  };

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
    try {
      await navigator.clipboard.writeText(portfolioConfig.contact.email);
      setCopiedEmail(true);
      showToast(`Copied ${portfolioConfig.contact.email} to clipboard`);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      showToast('Clipboard access blocked — copy email manually.');
    }
  };

  const copyMessageDraft = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formatted = `To: ${portfolioConfig.contact.email}\nSubject: Inquiry from ${formData.name.trim()}\n\nHello Rakesh,\n\n${formData.message.trim()}\n\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedDraft(true);
      showToast('Formatted email draft copied to clipboard');
      window.setTimeout(() => setCopiedDraft(false), 2400);
    } catch {
      showToast('Clipboard access blocked — copy message manually.');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot.trim().length > 0) {
      setSubmitState('sent');
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitError(null);

    const endpoint = portfolioConfig.contact.formspreeEndpoint;
    const isFormspreeConfigured = Boolean(endpoint && !endpoint.includes('['));

    if (isFormspreeConfigured) {
      setSubmitState('submitting');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
          }),
        });

        if (!res.ok) {
          throw new Error(`Submission error (${res.status})`);
        }

        setSubmitState('sent');
        setFormData({ name: '', email: '', message: '', honeypot: '' });
        showToast('Message delivered successfully');
        return;
      } catch {
        setSubmitState('error');
        setSubmitError('Automated relay failed — click Open Mail Client or Copy Draft below.');
        return;
      }
    }

    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Hello Rakesh,\n\n${formData.message.trim()}\n\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`
    );
    window.location.href = `mailto:${portfolioConfig.contact.email}?subject=${subject}&body=${body}`;
    setSubmitState('mailto-fallback');
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field !== 'honeypot' && errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitState !== 'idle') {
      setSubmitState('idle');
    }
  };

  const hasLinkedIn = Boolean(
    portfolioConfig.contact.linkedinUrl && !portfolioConfig.contact.linkedinUrl.includes('[')
  );

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 border-b border-[var(--border-hairline)] scroll-mt-20 relative"
    >
      {/* Floating Clipboard / Form Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl border border-[var(--accent)]/45 bg-[var(--bg-elevated)] text-xs font-mono text-[var(--text-primary)] shadow-xl flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2 max-w-2xl">
          <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
            06 &middot; Contact
          </div>
          <h2 className="heading-section font-bold text-[var(--text-primary)]">
            Let&apos;s build something practical together.
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            Available for software engineering internships, frontend roles, and Python / n8n workflow automation projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Copy-to-Clipboard Email & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-4">
              <div className="font-mono text-xs text-[var(--text-muted)]">
                Direct Email (Click to Copy)
              </div>

              <button
                type="button"
                onClick={copyEmail}
                className="min-h-[56px] w-full px-4 py-3.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--accent)]/55 text-left flex items-center justify-between gap-3 transition-colors duration-200 cursor-pointer"
                aria-label={`Copy email address ${portfolioConfig.contact.email}`}
              >
                <span className="font-mono text-sm sm:text-base font-semibold text-[var(--text-primary)] break-all">
                  {portfolioConfig.contact.email}
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
                href={`mailto:${portfolioConfig.contact.email}`}
                className="min-h-[44px] w-full px-4 py-2.5 rounded-xl accent-gradient-bg text-xs sm:text-sm font-semibold text-white inline-flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
              >
                <Mail className="w-4 h-4" />
                <span>Open Mail Client</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="space-y-2.5">
              <a
                href={portfolioConfig.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent)]/45 flex items-center justify-between gap-3 transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Github className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[var(--text-primary)]">GitHub</div>
                    <div className="font-mono text-xs text-[var(--text-muted)] truncate">
                      github.com/{portfolioConfig.contact.githubUsername}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-text)] shrink-0" />
              </a>

              {hasLinkedIn ? (
                <a
                  href={portfolioConfig.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[52px] px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent)]/45 flex items-center justify-between gap-3 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Linkedin className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[var(--text-primary)]">LinkedIn</div>
                      <div className="font-mono text-xs text-[var(--text-muted)] truncate">
                        {portfolioConfig.contact.linkedinUrl}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-text)] shrink-0" />
                </a>
              ) : (
                <div className="min-h-[52px] px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Linkedin className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[var(--text-primary)]">LinkedIn</div>
                      <div className="font-mono text-xs text-[var(--text-muted)] truncate">
                        {portfolioConfig.contact.linkedinUrl}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <a
                href={portfolioConfig.contact.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] px-4 py-3 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] hover:border-[var(--accent)]/45 flex items-center justify-between gap-3 transition-colors group"
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

          {/* Right Column: Automated Contact Form (Formspree + Honeypot + Validation + Fallback) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleFormSubmit}
              noValidate
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-5"
            >
              {/* Hidden Anti-Spam Honeypot Field */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="company-website">Leave blank</label>
                <input
                  id="company-website"
                  name="_gotcha"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => handleChange('honeypot', e.target.value)}
                />
              </div>

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
                    className={`min-h-[44px] w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
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
                    className={`min-h-[44px] w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
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
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors resize-none ${
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
                  disabled={submitState === 'submitting'}
                  className="min-h-[44px] w-full sm:w-auto px-6 py-2.5 rounded-xl accent-gradient-bg text-sm font-semibold text-white inline-flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-60 transition-opacity cursor-pointer"
                >
                  {submitState === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={copyMessageDraft}
                  className="min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] hover:border-[var(--accent)]/45 text-sm font-medium text-[var(--text-primary)] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
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

              <AnimatePresence>
                {submitState === 'sent' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-[var(--text-primary)] flex items-start gap-2"
                  >
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Thanks! Your message has been sent to Rakesh Kumar Mondal.</span>
                  </motion.div>
                )}

                {submitState === 'mailto-fallback' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-[var(--text-primary)] flex items-start gap-2"
                  >
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>
                      Email draft prepared for {portfolioConfig.contact.email}. If your mail client did not open, click &ldquo;Copy Draft&rdquo; to paste it directly.
                    </span>
                  </motion.div>
                )}

                {submitState === 'error' && submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-400 flex items-start gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
