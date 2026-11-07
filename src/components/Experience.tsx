import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceProps {
  experience: ExperienceItem[];
  showExperience: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ experience, showExperience }) => {
  if (!showExperience || !experience || experience.length === 0) {
    return null;
  }

  // State to track expanded items
  const [expandedIds, setExpandedIds] = useState<string[]>([experience[0]?.id || '']);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="experience" className="py-24 md:py-32 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#e32b3c] font-semibold">
              Career Timeline &amp; Track Record
            </div>
            <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-[#f2efeb]">
              Professional Experience
            </h2>
          </div>

          <div className="text-sm text-[#a09c9a] max-w-md">
            Verified leadership and technical contributions across product companies and creative engineering studios.
          </div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {experience.map((item) => {
            const isExpanded = expandedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden transition-all duration-200"
              >
                {/* Header row (Clickable to toggle) */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#a09c9a]">
                      <span className="text-[#e32b3c] font-semibold">{item.company}</span>
                      <span aria-hidden="true" className="text-white/20">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display uppercase tracking-tight text-[#f2efeb]">
                      {item.role}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#a09c9a] bg-white/5 px-3 py-1.5 rounded border border-white/10">
                      <Calendar className="w-3.5 h-3.5 text-[#e32b3c]" />
                      <span>{item.period}</span>
                    </div>
                    <div className="p-1 rounded-full text-[#a09c9a] hover:text-[#f2efeb]">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-5 text-sm text-[#a09c9a] animate-in fade-in duration-200">
                    <p className="leading-relaxed text-[#f2efeb]/90">
                      {item.description}
                    </p>

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="space-y-2">
                        <div className="text-xs font-mono uppercase tracking-wider text-white/50">
                          Key Achievements &amp; Impact
                        </div>
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                              <span className="text-[#e32b3c] font-mono mt-0.5">↳</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {item.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-[11px] font-mono bg-white/5 border border-white/10 rounded text-[#f2efeb]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
