import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Calendar, User, Code2, Clock } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121217] border border-zinc-200 dark:border-white/15 rounded-2xl shadow-2xl text-zinc-900 dark:text-zinc-100 p-6 sm:p-8 md:p-10 space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar with Close */}
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
              <span>{project.category}</span>
              <span aria-hidden="true" className="text-zinc-400">/</span>
              <span className={`px-2 py-0.5 rounded text-[10px] ${
                project.status === 'Live'
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700/50'
                  : 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700/50'
              }`}>
                {project.status}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-zinc-900 dark:text-white tracking-tight">
              {project.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Featured Media Showcase */}
        <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-950 aspect-video">
          <img
            src={project.coverImage}
            alt={project.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Two-Column Specification Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
          {/* Main Description & Highlights (Left 2 cols) */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Overview &amp; Purpose
              </h3>
              <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.detailedOverview || project.description}
              </p>
            </div>

            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                  Key Technical Features
                </h3>
                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-zinc-800 dark:text-zinc-200">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Metadata Sidebar (Right 1 col) */}
          <div className="space-y-6 border-t md:border-t-0 md:border-l border-zinc-200 dark:border-white/10 pt-6 md:pt-0 md:pl-8">
            {/* Status */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Project Status</span>
              </div>
              <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                {project.status}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500">
                <Code2 className="w-3.5 h-3.5" />
                <span>Technologies</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="pt-2 flex flex-col gap-2.5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-center shadow-sm"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-zinc-100 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span>View on GitHub</span>
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
