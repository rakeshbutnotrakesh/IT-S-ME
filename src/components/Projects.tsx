import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Info, Search, CheckCircle2, Clock, Calendar } from 'lucide-react';
import { projectsData, ProjectItem } from '../data/projects';
import { MessageBlockTypewriter } from './MessageBlockTypewriter';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(projectsData.map(p => p.category)))];
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-zinc-200 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Message Block Typing Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-white/10">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-semibold">
              Selected Works &amp; Builds
            </div>
            <MessageBlockTypewriter
              as="h2"
              text="Projects & Automation Experiments"
              badgeLabel="DEPLOYMENT // REPOSITORIES"
              className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-zinc-900 dark:text-white tracking-tight text-balance"
              speed={20}
            />
          </div>

          <div className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md font-sans">
            Completed web applications with live deployments alongside ongoing automation workflows clearly labeled by development status.
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-white/5 rounded-xl border border-zinc-200 dark:border-white/10 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Responsive Search Field (safe at 320px) */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech..."
              aria-label="Search projects by name or technology"
              className="w-full pl-9 pr-8 py-2 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-xl text-xs font-mono text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-10 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40 text-center space-y-3">
            <p className="text-sm text-zinc-700 dark:text-zinc-300 font-sans">
              No projects match &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project) => {
              const isCompleted = project.status === 'Completed';
              const isPlanned = project.status === 'Planned';

              return (
                <article
                  key={project.id}
                  className="group flex flex-col justify-between bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg transition-all duration-300"
                >
                  {/* Visual Cover Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                    <img
                      src={project.coverImage}
                      alt={`${project.name} preview banner`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter brightness-90"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/35 to-transparent" />

                    {/* Status Indicator */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-md font-semibold inline-flex items-center gap-1.5 shadow-sm ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isPlanned
                            ? 'bg-zinc-700 text-white'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3 h-3 shrink-0" />
                        ) : isPlanned ? (
                          <Calendar className="w-3 h-3 shrink-0" />
                        ) : (
                          <Clock className="w-3 h-3 shrink-0" />
                        )}
                        <span>{project.status}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 text-xs font-mono text-zinc-200">
                      {project.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-heading font-bold text-xl text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack & Actions */}
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {project.techStack.join(' · ')}
                      </div>

                      <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="text-xs font-heading font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>

                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                              title="View GitHub profile repositories"
                              aria-label={`View GitHub profile for ${project.name}`}
                            >
                              <Github className="w-4 h-4" />
                            </a>
                          )}

                          {project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shadow-sm font-semibold whitespace-nowrap"
                              title={`Open live app: ${project.liveUrl}`}
                              aria-label={`Launch Live Demo for ${project.name}`}
                            >
                              <span>Live Demo</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span
                              className="px-2.5 py-1.5 text-[11px] font-mono bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-white/10 rounded-lg whitespace-nowrap"
                              title={project.demoNote || 'No public hosted demo available'}
                            >
                              Local / No Demo
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
