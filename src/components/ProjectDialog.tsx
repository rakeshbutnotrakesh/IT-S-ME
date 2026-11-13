import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, CheckCircle2, Code2, Clock, Info } from 'lucide-react';
import { ProjectItem } from '../data/projects';
import { ProjectPreview } from './ProjectPreview';

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-dialog-title"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[var(--bg-canvas)] border border-[var(--border)] rounded-xl shadow-2xl text-[var(--text-primary)] p-5 sm:p-8 space-y-6 sm:space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Close */}
        <div className="flex items-start justify-between gap-4 border-b border-[var(--border)] pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center flex-wrap gap-2 text-xs font-mono">
              <span className="text-[var(--accent)] font-medium">{project.indexNumber}</span>
              <span aria-hidden="true" className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-secondary)]">{project.category}</span>
              <span aria-hidden="true" className="text-[var(--text-muted)]">&middot;</span>
              <span className="text-[var(--text-secondary)]">{project.status}</span>
            </div>
            <h2
              id="project-dialog-title"
              className="text-2xl sm:text-3xl font-heading font-bold text-[var(--text-primary)] tracking-tight"
            >
              {project.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] rounded-lg border border-transparent hover:border-[var(--border)] transition-colors cursor-pointer"
            aria-label="Close project details dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Showcase */}
        <div className="relative rounded-lg overflow-hidden border border-[var(--border)] aspect-[16/9]">
          <ProjectPreview project={project} />
        </div>

        {/* Two-Column Specification Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium">
                Overview
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {project.detailedOverview || project.description}
              </p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3 pt-1">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] font-medium">
                  Highlights
                </h3>
                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Metadata Sidebar */}
          <div className="space-y-6 border-t md:border-t-0 md:border-l border-[var(--border)] pt-6 md:pt-0 md:pl-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                <Clock className="w-3.5 h-3.5" />
                <span>Status</span>
              </div>
              <div className="text-sm font-medium text-[var(--text-primary)]">
                {project.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)]">
                <Code2 className="w-3.5 h-3.5" />
                <span>Stack</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] px-4 py-2.5 text-xs font-medium rounded-lg transition-opacity hover:opacity-95 flex items-center justify-center gap-2 text-center"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-fg)' }}
                >
                  <span>{project.status === 'Live' ? 'Open Live Website' : 'Open Preview Build'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border)] text-xs text-[var(--text-secondary)] flex items-start gap-2">
                  <Info className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                  <span>{project.demoNote || 'No public hosted demo available.'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
