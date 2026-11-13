import React from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projectsData, ProjectItem } from '../data/projects';
import { ProjectPreview } from './ProjectPreview';
import { ScrollReveal } from './ScrollReveal';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  return (
    <section
      id="projects"
      className="py-20 sm:py-24 border-b border-[var(--border)] scroll-mt-20"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2 max-w-2xl">
          <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] font-medium">
            02 / SELECTED WORK
          </div>
          <h2 className="heading-section font-bold text-[var(--text-primary)]">
            Things I&apos;ve been building.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={Math.min(index, 3) * 50}
              direction="up"
              className="h-full"
            >
              <article className="group h-full flex flex-col rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)]">
                {/* Editorial Visual Preview */}
                <div className="aspect-[16/10] border-b border-[var(--border)] overflow-hidden">
                  <ProjectPreview project={project} />
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 font-mono text-xs text-[var(--text-muted)]">
                      <span className="tabular-nums">
                        {project.indexNumber} &middot; {project.category}
                      </span>
                      <span
                        className={
                          project.status === 'Live'
                            ? 'text-[var(--accent)] font-medium'
                            : 'text-[var(--text-muted)]'
                        }
                      >
                        {project.status}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150">
                      {project.name}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {project.description}
                    </p>

                    <div className="pt-1 font-mono text-xs text-[var(--text-muted)]">
                      {project.techStack.join(' · ')}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="min-h-[44px] px-1 -ml-1 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                    >
                      <span>Project Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.name} live preview`}
                        className="min-h-[44px] px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-canvas)] text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                      >
                        <span>{project.status === 'Live' ? 'Live Site' : 'Preview'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        Local / Docker
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
