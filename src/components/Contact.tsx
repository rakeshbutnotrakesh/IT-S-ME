import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  Github,
  Globe,
  Linkedin,
  ArrowUpRight,
  AlertCircle,
  Send,
  Loader2,
  Info,
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<
    'idle' | 'submitting' | 'sent' | 'no-backend' | 'error'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const isEmailConfigured = Boolean(
    portfolioConfig.contact.email && !portfolioConfig.contact.email.includes('[')
  );
  const isLinkedInConfigured = Boolean(
    portfolioConfig.contact.linkedinUrl && !portfolioConfig.contact.linkedinUrl.includes('[')
  );
  const isFormspreeConfigured = Boolean(
    portfolioConfig.contact.formspreeEndpoint &&
      !portfolioConfig.contact.formspreeEndpoint.includes('[')
  );

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (formData.message.trim().length < 10) {
      nextErrors.message = 'Please enter a message (at least 10 characters).';
    }
    return nextErrors;
  };

  const copyEmail = async () => {
    if (!isEmailConfigured) return;
    try {
      await navigator.clipboard.writeText(portfolioConfig.contact.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // Clipboard blocked
    }
  };

  const copyDraft = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formatted = `To: ${portfolioConfig.contact.email}\nSubject: Inquiry from ${formData.name.trim()}\n\nHello Rakesh,\n\n${formData.message.trim()}\n\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopiedDraft(true);
      window.setTimeout(() => setCopiedDraft(false), 2400);
    } catch {
      // Clipboard blocked
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot.trim().length > 0) {
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitMessage(null);

    if (isFormspreeConfigured) {
      setSubmitState('submitting');
      try {
        const res = await fetch(portfolioConfig.contact.formspreeEndpoint, {
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
        setSubmitMessage('Your message was delivered.');
        return;
      } catch {
        setSubmitState('error');
        setSubmitMessage(
          'The form relay encountered an error. Please use Open in Email Client or Copy Draft below.'
        );
        return;
      }
    }

    // Honest behavior when no backend email endpoint is configured
    setSubmitState('no-backend');
    setSubmitMessage(
      'No form backend is connected on this static site, so your message has not been sent automatically. Use "Open in Email Client" or "Copy Draft" below to reach out directly.'
    );
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field !== 'honeypot' && errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitState !== 'idle') {
      setSubmitState('idle');
      setSubmitMessage(null);
    }
  };

  const mailtoHref = isEmailConfigured
    ? `mailto:${portfolioConfig.contact.email}?subject=${encodeURIComponent(
        formData.name.trim()
          ? `Portfolio Inquiry from ${formData.name.trim()}`
          : 'Portfolio Inquiry'
      )}&body=${encodeURIComponent(
        formData.message.trim()
          ? `Hello Rakesh,\n\n${formData.message.trim()}\n\nFrom: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`
          : ''
      )}`
    : undefined;

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 border-b border-[var(--border)] scroll-mt-20"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3 max-w-2xl">
          <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] font-medium">
            05 / CONTACT
          </div>
          <h2 className="heading-section font-bold text-[var(--text-primary)]">
            Let&apos;s build something meaningful.
          </h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed">
            I&apos;m always interested in exploring ideas, collaborating on projects and connecting with people who enjoy building useful technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Verified Links Directory */}
          <div className="lg:col-span-5 space-y-3">
            <a
              href={portfolioConfig.contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[58px] px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--accent)] flex items-center justify-between gap-3 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Github className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[var(--text-primary)]">GitHub</div>
                  <div className="font-mono text-xs text-[var(--text-muted)] truncate">
                    {portfolioConfig.contact.githubUrl}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0" />
            </a>

            <a
              href={portfolioConfig.contact.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[58px] px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--accent)] flex items-center justify-between gap-3 transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Globe className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[var(--text-primary)]">Portfolio</div>
                  <div className="font-mono text-xs text-[var(--text-muted)] truncate">
                    {portfolioConfig.contact.portfolioUrl}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0" />
            </a>

            {isLinkedInConfigured ? (
              <a
                href={portfolioConfig.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[58px] px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--accent)] flex items-center justify-between gap-3 transition-colors group"
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
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] shrink-0" />
              </a>
            ) : (
              <div className="min-h-[58px] px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] flex items-center gap-3">
                <Linkedin className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[var(--text-primary)]">LinkedIn</div>
                  <div className="font-mono text-xs text-[var(--text-muted)] truncate">
                    {portfolioConfig.contact.linkedinUrl}
                  </div>
                </div>
              </div>
            )}

            <div className="px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Mail className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[var(--text-primary)]">Email</div>
                  {isEmailConfigured ? (
                    <a
                      href={`mailto:${portfolioConfig.contact.email}`}
                      className="font-mono text-xs text-[var(--accent)] hover:underline break-all"
                    >
                      {portfolioConfig.contact.email}
                    </a>
                  ) : (
                    <div className="font-mono text-xs text-[var(--text-muted)]">
                      {portfolioConfig.contact.email}
                    </div>
                  )}
                </div>
              </div>

              {isEmailConfigured && (
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={`Copy email address ${portfolioConfig.contact.email}`}
                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-canvas)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer shrink-0"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right: Minimal Honest Contact Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleFormSubmit}
              noValidate
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-5"
            >
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
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs text-[var(--text-secondary)]"
                  >
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
                    placeholder="Your name"
                    className={`min-h-[44px] w-full px-3.5 py-2.5 rounded-lg border bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
                      errors.name
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[var(--border)] focus:border-[var(--accent)]'
                    }`}
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 pt-0.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs text-[var(--text-secondary)]"
                  >
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
                    placeholder="you@example.com"
                    className={`min-h-[44px] w-full px-3.5 py-2.5 rounded-lg border bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-[var(--border)] focus:border-[var(--accent)]'
                    }`}
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 pt-0.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs text-[var(--text-secondary)]"
                >
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
                  placeholder="Share an idea, project, or collaboration note..."
                  className={`w-full px-3.5 py-2.5 rounded-lg border bg-[var(--bg-canvas)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors resize-none ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--border)] focus:border-[var(--accent)]'
                  }`}
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1 pt-0.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={submitState === 'submitting'}
                  className="min-h-[44px] w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-95 disabled:opacity-60 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-fg)',
                  }}
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

                {mailtoHref && (
                  <a
                    href={mailtoHref}
                    className="min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)] text-sm font-medium text-[var(--text-primary)] inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[var(--accent)]" />
                    <span>Open Email Client</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={copyDraft}
                  className="min-h-[44px] w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-canvas)] hover:border-[var(--border-strong)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedDraft ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Draft Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Draft</span>
                    </>
                  )}
                </button>
              </div>

              {submitState === 'sent' && submitMessage && (
                <div
                  role="status"
                  className="p-3.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs text-[var(--text-primary)] flex items-start gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{submitMessage}</span>
                </div>
              )}

              {submitState === 'no-backend' && submitMessage && (
                <div
                  role="status"
                  className="p-3.5 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-tint)] text-xs text-[var(--text-primary)] flex items-start gap-2 leading-relaxed"
                >
                  <Info className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{submitMessage}</span>
                </div>
              )}

              {submitState === 'error' && submitMessage && (
                <div
                  role="alert"
                  className="p-3.5 rounded-lg border border-red-500/30 bg-red-500/10 text-xs text-red-600 dark:text-red-400 flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitMessage}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
