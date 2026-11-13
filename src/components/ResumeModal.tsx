import React, { useEffect, useState } from 'react';
import { X, Download, FileText, GraduationCap, Code2, ExternalLink, Printer, Layers } from 'lucide-react';
import { portfolioConfig } from '../config/portfolioConfig';
import { projectsData } from '../data/projects';
import { skillCategories } from '../data/skills';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [hasResumePdf, setHasResumePdf] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      fetch(portfolioConfig.contact.resumePdfPath, { method: 'HEAD' })
        .then((res) => {
          const contentType = res.headers.get('content-type') || '';
          if (res.ok && contentType.includes('pdf')) {
            setHasResumePdf(true);
          }
        })
        .catch(() => {});
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--bg-canvas)] border border-[var(--border)] rounded-xl shadow-2xl p-5 sm:p-8 md:p-10 space-y-8 text-[var(--text-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="resume-modal-title" className="font-heading font-bold text-base truncate">
                Resume Overview
              </h3>
              <p className="text-xs font-mono text-[var(--text-muted)]">
                {portfolioConfig.profile.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasResumePdf && (
              <a
                href={portfolioConfig.contact.resumePdfPath}
                download="Rakesh_Kumar_Mondal_Resume.pdf"
                className="min-h-[44px] px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-opacity hover:opacity-95"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)' }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="min-h-[44px] px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-primary)] hover:border-[var(--border-strong)] flex items-center gap-1.5 transition-colors cursor-pointer"
              aria-label="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm">
          <div className="space-y-1.5 border-b border-[var(--border)] pb-5">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--text-primary)]">
              {portfolioConfig.profile.name}
            </h2>
            <p className="text-[var(--accent)] font-medium text-xs sm:text-sm">
              {portfolioConfig.profile.roleLine}
            </p>
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[var(--text-secondary)] font-mono pt-1">
              <span>{portfolioConfig.contact.email}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{portfolioConfig.contact.githubUrl}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{portfolioConfig.education.location}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--accent)] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h4>
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] space-y-1.5">
              <div className="font-semibold text-[var(--text-primary)]">
                {portfolioConfig.education.degree} &middot; {portfolioConfig.education.academicAchievement}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Focus: {portfolioConfig.education.focus} &middot; {portfolioConfig.education.location}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--accent)] flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>Technologies &amp; Interests</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] space-y-1">
                  <div className="font-semibold text-[var(--text-primary)] font-mono text-[11px] uppercase">
                    {cat.title}
                  </div>
                  <div className="text-[var(--text-secondary)] leading-relaxed">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--accent)] flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Selected Projects</span>
            </h4>
            <div className="space-y-2.5">
              {projectsData.map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border)] space-y-1.5">
                  <div className="flex items-center justify-between gap-2 font-semibold text-[var(--text-primary)]">
                    <span className="flex items-center gap-2">
                      <span>{p.indexNumber}. {p.name}</span>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          <span>Link</span>
                        </a>
                      )}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {p.description}
                  </p>
                  <div className="text-[11px] font-mono text-[var(--text-muted)]">
                    Stack: {p.techStack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
