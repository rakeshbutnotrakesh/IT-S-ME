import React, { useEffect } from 'react';
import { X, Download, FileText, GraduationCap, Award, Code2, ExternalLink, Printer } from 'lucide-react';
import { portfolioConfig } from '../config/portfolioConfig';
import { projectsData } from '../data/projects';
import { skillCategories } from '../data/skills';
import { downloadResumeOffline } from '../utils/resumeDownload';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--bg-canvas)] border border-[var(--border-strong)] rounded-2xl shadow-2xl p-5 sm:p-8 md:p-10 space-y-8 text-[var(--text-primary)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[var(--accent-tint)] text-[var(--accent-text)] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="resume-modal-title" className="font-heading font-bold text-base truncate">
                Resume Summary
              </h3>
              <p className="text-[11px] font-mono text-[var(--text-muted)]">
                Offline-ready · Zero tracking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => downloadResumeOffline()}
              className="min-h-[44px] px-4 py-2 rounded-lg accent-gradient-bg text-xs font-mono uppercase tracking-wider font-semibold text-white flex items-center gap-1.5 shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download Offline</span>
              <span className="sm:hidden">Save</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="min-h-[44px] px-3.5 py-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] hover:border-[var(--border-strong)] flex items-center gap-1.5 transition-colors cursor-pointer"
              aria-label="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print PDF</span>
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

        <div className="space-y-6 font-sans text-xs sm:text-sm">
          <div className="space-y-1.5 text-center sm:text-left border-b border-[var(--border-hairline)] pb-5">
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--text-primary)]">
              {portfolioConfig.profile.name}
            </h2>
            <p className="text-[var(--accent-text)] font-mono text-xs font-semibold">
              {portfolioConfig.profile.title}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-[var(--text-secondary)] font-mono pt-1">
              <span>{portfolioConfig.contact.email}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{portfolioConfig.contact.githubUrl}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{portfolioConfig.contact.linkedinUrl}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--accent-text)] flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h4>
            <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] space-y-1.5">
              <div className="font-semibold text-[var(--text-primary)]">
                {portfolioConfig.education.degree} &middot; {portfolioConfig.education.college} &middot; Expected Graduation: {portfolioConfig.education.expectedGraduation}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Focus: {portfolioConfig.education.focus}.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--accent-text)] flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>Technical Skills</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] space-y-1">
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
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--accent-text)] flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Selected Projects</span>
            </h4>
            <div className="space-y-2.5">
              {projectsData.slice(0, 5).map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] space-y-1.5">
                  <div className="flex items-center justify-between gap-2 font-semibold text-[var(--text-primary)]">
                    <span className="flex items-center gap-2">
                      <span>{p.name}</span>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[var(--accent-text)] hover:underline inline-flex items-center gap-0.5"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          <span>Live</span>
                        </a>
                      )}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-semibold">
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
