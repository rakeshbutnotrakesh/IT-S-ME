import React, { useState, useMemo } from 'react';
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Search,
  CheckCircle2,
  Clock,
  Star,
  Pin,
  GitBranch,
  Activity,
} from 'lucide-react';
import { projectsData, ProjectItem } from '../data/projects';
import { portfolioConfig } from '../config/portfolioConfig';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { ScrollReveal } from './ScrollReveal';
import { TiltSpotlightCard } from './TiltSpotlightCard';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { repos, activity, status } = useGitHubRepos();

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(projectsData.map((p) => p.category)))];
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 border-b border-[var(--border-hairline)] scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Featured Case Studies (Problem -> Solution -> Result) */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
                03 &middot; Featured Engineering Work
              </div>
              <h2 className="heading-section font-bold text-[var(--text-primary)]">
                Projects &amp; Automation Systems
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-md">
              Built end-to-end with problem framing, client-side security or Canvas engineering, and deployed live on Vercel.
            </p>
          </div>

          {/* Interactive Category Filter Tabs & Search */}
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
                    className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-150 cursor-pointer ${
                      active
                        ? 'accent-gradient-bg text-white font-semibold shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
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
                className="min-h-[44px] w-full pl-10 pr-11 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
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

          {/* Gallery Bento Grid with 3D Tilt & Warm Spotlight */}
          {filteredProjects.length === 0 ? (
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-10 text-center space-y-4">
              <p className="text-sm text-[var(--text-secondary)]">
                No projects match &ldquo;{searchQuery}&rdquo; under {selectedCategory}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="min-h-[44px] px-5 py-2.5 rounded-xl accent-gradient-bg text-xs font-semibold text-white cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => {
                const isLeadFeatured = index === 0 && filteredProjects.length > 1;
                const isCompleted = project.status === 'Completed';

                return (
                  <ScrollReveal
                    key={project.id}
                    delay={Math.min(index, 4) * 55}
                    direction="up"
                    className={isLeadFeatured ? 'md:col-span-2' : ''}
                  >
                    <TiltSpotlightCard className="h-full overflow-hidden">
                      <article
                        className={`h-full ${
                          isLeadFeatured ? 'grid grid-cols-1 lg:grid-cols-12' : 'flex flex-col'
                        }`}
                      >
                        {/* Media Preview Container */}
                        <div
                          className={`relative overflow-hidden bg-[var(--bg-subtle)] ${
                            isLeadFeatured
                              ? 'lg:col-span-6 aspect-[16/10] lg:aspect-auto lg:min-h-[340px]'
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
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          />
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                          />
                          <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between font-mono text-xs text-zinc-100">
                            <span>{isLeadFeatured ? 'Featured Case Study' : project.category}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-amber-300">
                              Inspect &rarr;
                            </span>
                          </div>
                        </div>

                        {/* Card Details + Problem / Solution / Result */}
                        <div
                          className={`p-6 flex flex-col justify-between space-y-5 ${
                            isLeadFeatured ? 'lg:col-span-6 lg:p-8' : 'flex-1'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                              <span className="inline-flex items-center gap-1.5 text-[var(--text-primary)] font-medium">
                                {isCompleted ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                ) : (
                                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                )}
                                <span>{project.status}</span>
                              </span>
                              <span aria-hidden="true">&middot;</span>
                              <span>{project.category}</span>
                            </div>

                            <h3 className="font-heading font-bold text-xl sm:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent-text)] transition-colors duration-150">
                              {project.name}
                            </h3>

                            {/* Problem / Solution / Result Proof Format */}
                            <dl className="space-y-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pt-1">
                              <div>
                                <dt className="inline font-mono text-[var(--text-primary)] font-semibold mr-1.5">
                                  Problem:
                                </dt>
                                <dd className="inline">{project.problem}</dd>
                              </div>
                              <div>
                                <dt className="inline font-mono text-[var(--text-primary)] font-semibold mr-1.5">
                                  Solution:
                                </dt>
                                <dd className="inline">{project.solution}</dd>
                              </div>
                              <div>
                                <dt className="inline font-mono text-[var(--accent-text)] font-semibold mr-1.5">
                                  Result:
                                </dt>
                                <dd className="inline">{project.result}</dd>
                              </div>
                            </dl>

                            <div className="pt-1 font-mono text-xs text-[var(--text-muted)] leading-relaxed">
                              {project.techStack.join(' · ')}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => onSelectProject(project)}
                              className="min-h-[44px] px-2 -ml-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
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
                                  className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
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
                                  className="min-h-[44px] px-4 py-2 rounded-xl accent-gradient-bg text-xs font-semibold text-white inline-flex items-center gap-1.5 hover:opacity-95 transition-opacity whitespace-nowrap"
                                >
                                  <span>Live</span>
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              ) : (
                                <span
                                  className="min-h-[44px] px-3.5 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-xs font-mono text-[var(--text-muted)] inline-flex items-center whitespace-nowrap"
                                  title={project.demoNote || 'Runs locally via Docker'}
                                >
                                  Local Only
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    </TiltSpotlightCard>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </div>

        {/* Part 2: Auto-Fetched GitHub Repositories + Activity Summary (with Cached Static Fallback) */}
        <div className="pt-12 border-t border-[var(--border-hairline)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="font-mono text-xs text-[var(--accent-text)] font-medium inline-flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5" />
                <span>Open-Source Repository Ledger</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-[var(--text-primary)]">
                Public Repositories (@{portfolioConfig.contact.githubUsername})
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                <span>
                  {activity.recentEventsCount > 0
                    ? `${activity.recentEventsCount} recent events · Last active ${activity.lastPushLabel}`
                    : status === 'loading'
                    ? 'Syncing GitHub...'
                    : `Updated ${activity.lastPushLabel}`}
                </span>
              </span>
              <a
                href={portfolioConfig.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] inline-flex items-center gap-1 text-[var(--accent-text)] hover:underline"
              >
                <span>View all on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map((repo) => (
              <TiltSpotlightCard key={repo.id} enableTilt={false} className="h-full">
                <div className="h-full p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 font-mono text-xs text-[var(--text-muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        {repo.isPinned && (
                          <Pin className="w-3 h-3 text-[var(--accent-text)] shrink-0" />
                        )}
                        <span>{repo.language}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 tabular-nums">
                        <Star className="w-3 h-3 text-amber-500" />
                        <span>{repo.stars}</span>
                      </span>
                    </div>

                    <h4 className="font-heading font-semibold text-base text-[var(--text-primary)] truncate">
                      {repo.name}
                    </h4>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                      {repo.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between gap-2 font-mono text-xs text-[var(--text-muted)]">
                    <span className="truncate">Updated {repo.updatedAt}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      {repo.homepage && (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Open live app for ${repo.name}`}
                          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[var(--accent-text)] hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${repo.name} source on GitHub`}
                        className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </TiltSpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
