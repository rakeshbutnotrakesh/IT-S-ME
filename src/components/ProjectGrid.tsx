import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Sparkles, SlidersHorizontal, Eye } from 'lucide-react';
import { Project } from '../types';

interface ProjectGridProps {
  projects: Project[];
  categories: string[];
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  categories,
  onSelectProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories if not defined
  const derivedCategories = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    const cats = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
    return cats;
  }, [categories, projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="work" className="py-24 md:py-32 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#e32b3c] font-semibold">
              Selected Works · 2024 — 2026
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#f2efeb]">
              Featured Engineering &amp; Design
            </h2>
          </div>

          <div className="text-sm text-[#a09c9a] max-w-md">
            Production applications, high-performance interfaces, and design systems crafted with obsessive attention to detail and performance.
          </div>
        </div>

        {/* Filter Bar & Search Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-lg border border-white/10 overflow-x-auto no-scrollbar">
            {derivedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#e32b3c] text-white shadow-sm font-semibold'
                    : 'text-[#a09c9a] hover:text-[#f2efeb] hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-[#a09c9a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tech or keyword..."
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-[#f2efeb] placeholder:text-[#a09c9a]/60 focus:outline-none focus:border-[#e32b3c] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#a09c9a] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid (Bento Style Layout) */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center space-y-4 border border-dashed border-white/15 rounded-xl bg-white/[0.02]">
            <p className="text-sm text-[#a09c9a] font-mono">
              No projects found matching &ldquo;{searchQuery || selectedCategory}&rdquo;
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const isLarge = idx === 0 || idx === 3;
              return (
                <article
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className={`group cursor-pointer flex flex-col justify-between bg-[#121212] border border-white/10 rounded-xl overflow-hidden hover:border-[#e32b3c]/60 transition-all duration-300 hover:shadow-xl hover:shadow-black/60 ${
                    isLarge ? 'md:col-span-2' : 'col-span-1'
                  }`}
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video overflow-hidden bg-[#090909]">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />

                    {/* Quick Action Overlay Badge */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/20 text-white">
                      <ArrowUpRight className="w-4 h-4 text-[#e32b3c]" />
                    </div>

                    {project.metrics && (
                      <div className="absolute bottom-3 left-4 text-[11px] font-mono uppercase tracking-wider text-white/90 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
                        {project.metrics}
                      </div>
                    )}
                  </div>

                  {/* Card Content (Zero-Pill Metadata) */}
                  <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* Quiet Unboxed Metadata with Typographic Separator */}
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#a09c9a]">
                        <span className="text-[#e32b3c] font-medium">{project.category}</span>
                        <span aria-hidden="true" className="text-white/20">·</span>
                        <span>{project.year}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-[#f2efeb] group-hover:text-[#e32b3c] transition-colors">
                        {project.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-[#a09c9a] line-clamp-2 leading-relaxed">
                        {project.summary}
                      </p>
                    </div>

                    {/* Footer: Tools list & View button */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2 text-xs font-mono text-[#a09c9a]">
                      <div className="truncate text-[11px] text-[#a09c9a]/80">
                        {project.tools.slice(0, 3).join(' / ')}
                        {project.tools.length > 3 ? ` +${project.tools.length - 3}` : ''}
                      </div>
                      <span className="text-[#f2efeb] group-hover:text-[#e32b3c] transition-colors flex items-center gap-1 font-semibold shrink-0">
                        View Study
                      </span>
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
