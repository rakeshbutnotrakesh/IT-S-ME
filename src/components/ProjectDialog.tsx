import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Code2, Clock, Info } from 'lucide-react';
import { ProjectItem } from '../data/projects';

interface ProjectDialogProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[var(--bg-canvas)] border border-[var(--border-strong)] rounded-2xl shadow-2xl text-[var(--text-primary)] p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Close */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center flex-wrap gap-2 text-xs font-mono uppercase tracking-wider">
              <span className="text-[var(--accent-text)] font-semibold">{project.category}</span>
              <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>
              <span className="text-[var(--text-secondary)]">{project.status}</span>
            </div>
            <h2 id="project-dialog-title" className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-primary)] tracking-tight">
              {project.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-lg border border-transparent hover:border-[var(--border-hairline)] transition-colors cursor-pointer"
            aria-label="Close project details dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Featured Media Showcase */}
        <div className="relative rounded-xl overflow-hidden border border-[var(--border-hairline)] bg-zinc-950 aspect-video">
          <img
            src={project.coverImage}
            alt={`${project.name} preview`}
            width={1280}
            height={720}
            decoding="async"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Two-Column Specification Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Overview &amp; Purpose
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.detailedOverview || project.description}
              </p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                  Key Technical Features
                </h3>
                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Metadata Sidebar */}
          <div className="space-y-6 border-t md:border-t-0 md:border-l border-[var(--border-hairline)] pt-6 md:pt-0 md:pl-8">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                <Clock className="w-3.5 h-3.5" />
                <span>Project Status</span>
              </div>
              <div className="text-sm font-semibold text-[var(--text-primary)]">
                {project.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                <Code2 className="w-3.5 h-3.5" />
                <span>Technologies</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-center shadow-sm"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)' }}
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-xs text-[var(--text-secondary)] flex items-start gap-2">
                  <Info className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <span>{project.demoNote || 'Live hosted demo is not available for this project.'}</span>
                </div>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 bg-[var(--bg-surface)] hover:bg-[var(--bg-subtle)] border border-[var(--border-hairline)] hover:border-[var(--border-strong)] text-[var(--text-primary)] text-xs font-mono uppercase tracking-wider font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>View GitHub Profile</span>
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
