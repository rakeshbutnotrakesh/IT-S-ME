import React, { useEffect } from 'react';
import { X, Download, FileText, GraduationCap, Award, Code2, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { projectsData } from '../data/projects';
import { skillCategories } from '../data/skills';

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

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121217] border border-zinc-200 dark:border-white/10 rounded-2xl shadow-2xl p-5 sm:p-8 md:p-10 space-y-8 text-zinc-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 id="resume-modal-title" className="font-heading font-bold text-base truncate">
                Resume Summary
              </h3>
              <p className="text-[11px] font-mono text-zinc-500">Print or save as PDF</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrintOrDownload}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Structured Resume Content */}
        <div className="space-y-6 font-sans text-xs sm:text-sm">
          <div className="space-y-1.5 text-center sm:text-left border-b border-zinc-200 dark:border-white/10 pb-5">
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-zinc-900 dark:text-white">
              {personalInfo.name}
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-mono text-xs font-semibold">
              {personalInfo.title}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 font-mono pt-1">
              <span>{personalInfo.contact.email}</span>
              <span aria-hidden="true">·</span>
              <span>{personalInfo.contact.github}</span>
              <span aria-hidden="true">·</span>
              <span>{personalInfo.contact.portfolioUrl}</span>
            </div>
          </div>

          {/* Academic Background */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Education</span>
            </h4>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2 font-semibold text-zinc-900 dark:text-white">
                <span>{personalInfo.academic.degree}</span>
                <span className="text-blue-600 dark:text-blue-400 font-mono text-xs tabular-nums">
                  SGPA {personalInfo.academic.sgpa}
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Core interests: {personalInfo.interests.join(', ')}.
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>Technical Skills</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 space-y-1">
                  <div className="font-semibold text-zinc-900 dark:text-white font-mono text-[11px] uppercase">
                    {cat.title}
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {cat.skills.map(s => s.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Projects */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Selected Projects</span>
            </h4>
            <div className="space-y-2.5">
              {projectsData.slice(0, 5).map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 font-semibold text-zinc-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <span>{p.name}</span>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          <span>Live</span>
                        </a>
                      )}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 uppercase font-semibold">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="text-[11px] font-mono text-zinc-500">
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
