import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, ArrowUpRight, Search, CheckCircle2, Clock } from 'lucide-react';
import { projectsData, ProjectItem } from '../data/projects';
import { ScrollReveal } from './ScrollReveal';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(projectsData.map((p) => p.category)))];
  }, []);

  // Place CyberSafe first when showing "All" so a standout engineering build is featured larger
  const orderedProjects = useMemo(() => {
    const cybersafe = projectsData.find((p) => p.id === 'cybersafe');
    const rest = projectsData.filter((p) => p.id !== 'cybersafe');
    return cybersafe ? [cybersafe, ...rest] : projectsData;
  }, []);

  const filteredProjects = useMemo(() => {
    return orderedProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [orderedProjects, selectedCategory, searchQuery]);

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 border-b border-[var(--border-hairline)] scroll-mt-20"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
              Selected Work
            </div>
            <h2 className="heading-section font-bold text-[var(--text-primary)]">
              Projects &amp; Automation Builds
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md">
            Seven deployed React &amp; TypeScript applications alongside self-hosted Docker + n8n automation experiments.
          </p>
        </div>

        {/* Category Filter Tabs & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div
            className="flex items-center gap-1 p-1 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-x-auto no-scrollbar"
            role="tablist"
            aria-label="Project categories"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer ${
                    active
                      ? 'text-[var(--accent-fg)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  style={active ? { backgroundColor: 'var(--accent)' } : undefined}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by tech or title..."
              aria-label="Search projects by name or technology"
              className="min-h-[44px] w-full pl-10 pr-11 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors duration-150"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear project search"
                className="min-w-[44px] min-h-[44px] flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid (1st item featured larger on desktop when multiple results exist) */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-10 text-center space-y-4">
            <p className="text-sm text-[var(--text-secondary)]">
              No projects match &ldquo;{searchQuery}&rdquo; under {selectedCategory}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="min-h-[44px] px-5 py-2.5 rounded-lg text-xs font-medium text-[var(--accent-fg)] cursor-pointer"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => {
              const isFeatured = index === 0 && filteredProjects.length > 1;
              const isCompleted = project.status === 'Completed';

              return (
                <ScrollReveal
                  key={project.id}
                  delay={Math.min(index, 4) * 60}
                  direction="up"
                  className={isFeatured ? 'md:col-span-2' : ''}
                >
                  <article
                    className={`group h-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_14px_34px_-14px_var(--accent-glow)] ${
                      isFeatured ? 'grid grid-cols-1 lg:grid-cols-12' : 'flex flex-col'
                    }`}
                  >
                    {/* Cover Image Slot (with aspect + gradient fallback container) */}
                    <div
                      className={`relative overflow-hidden bg-[var(--bg-subtle)] ${
                        isFeatured
                          ? 'lg:col-span-6 aspect-[16/10] lg:aspect-auto lg:min-h-[300px]'
                          : 'aspect-[16/10]'
                      }`}
                    >
                      <img
                        src={project.coverImage}
                        alt={`${project.name} application interface preview`}
                        width={800}
                        height={500}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"
                      />
                      <div className="absolute bottom-3 left-4 font-mono text-xs text-zinc-100">
                        {isFeatured ? 'Featured Build' : project.category}
                      </div>
                    </div>

                    {/* Card Details */}
                    <div
                      className={`p-6 flex flex-col justify-between space-y-5 ${
                        isFeatured ? 'lg:col-span-6 lg:p-8' : 'flex-1'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Unboxed Clean Metadata Line */}
                        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                          <span className="inline-flex items-center gap-1.5 text-[var(--text-primary)] font-medium">
                            {isCompleted ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            ) : (
                              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            )}
                            <span>{project.status}</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{project.category}</span>
                        </div>

                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent-text)] transition-colors duration-150">
                          {project.name}
                        </h3>

                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                          {project.description}
                        </p>

                        <div className="pt-1 font-mono text-xs text-[var(--text-muted)] leading-relaxed">
                          {project.techStack.join(' · ')}
                        </div>
                      </div>

                      {/* Actions Row (>= 44px touch targets) */}
                      <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="min-h-[44px] px-2 -ml-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 cursor-pointer"
                        >
                          <span>Case Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`View GitHub repository for ${project.name}`}
                              title="GitHub Repository"
                              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors duration-150"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}

                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open live deployment for ${project.name}`}
                              className="min-h-[44px] px-4 py-2 rounded-lg text-xs font-medium text-[var(--accent-fg)] inline-flex items-center gap-1.5 transition-opacity duration-150 hover:opacity-90 whitespace-nowrap"
                              style={{ backgroundColor: 'var(--accent)' }}
                            >
                              <span>Live</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span
                              className="min-h-[44px] px-3.5 py-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-xs font-mono text-[var(--text-muted)] inline-flex items-center whitespace-nowrap"
                              title={project.demoNote || 'Runs locally via Docker'}
                            >
                              Local Only
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
