import React from 'react';
import { GraduationCap, Award, Compass, Cpu, Target, CheckCircle2, User, BookOpen } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { MessageBlockTypewriter } from './MessageBlockTypewriter';

export const About: React.FC = () => {
  const philosophies = [
    {
      icon: Target,
      title: "Problem-Driven Engineering",
      description: "Technology becomes truly meaningful when it solves real-world problems and simplifies repetitive human workflows."
    },
    {
      icon: BookOpen,
      title: "Strong Computer Science Core",
      description: "Focusing on procedural and object-oriented fundamentals in C, C++, Python, and Java alongside Data Structures."
    },
    {
      icon: Cpu,
      title: "Automation & Tooling",
      description: "Reducing manual effort by experimenting with Docker containers, n8n visual automation pipelines, and API integrations."
    },
    {
      icon: Compass,
      title: "Continuous Self-Direction",
      description: "Building functional projects from scratch to turn academic concepts into reliable, practical applications."
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-t border-zinc-200 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Header with Scroll-Triggered Message Block Animation */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-semibold">
            About Rakesh Kumar Mondal
          </div>
          <MessageBlockTypewriter
            as="h2"
            text="Curious Mind. Practical Logic. Building Useful Software."
            badgeLabel="DIRECTIVE // BIOGRAPHY"
            className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-zinc-900 dark:text-white tracking-tight text-balance"
            speed={22}
          />
        </div>

        {/* Two-Column Split: Narrative Prose & Personal Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Authentic Biography & Interests */}
          <div className="lg:col-span-7 space-y-5 text-zinc-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
            {personalInfo.aboutText.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "text-lg sm:text-xl font-medium text-zinc-900 dark:text-white" : ""}>
                {paragraph}
              </p>
            ))}

            <div className="pt-3 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Core Technical Interests
              </div>
              <div className="flex flex-wrap gap-x-2.5 gap-y-1.5 text-sm font-mono text-zinc-800 dark:text-zinc-200">
                {personalInfo.interests.map((interest, idx) => (
                  <React.Fragment key={interest}>
                    <span>{interest}</span>
                    {idx < personalInfo.interests.length - 1 && (
                      <span aria-hidden="true" className="text-blue-600 dark:text-cyan-400">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Personal Information Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10 rounded-2xl shadow-lg space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-heading font-semibold text-sm text-zinc-900 dark:text-white uppercase tracking-wider">
                    Student &amp; Developer Profile
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  Verified Info
                </span>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="space-y-1">
                  <div className="text-zinc-500 uppercase text-[11px]">Name</div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white font-sans">
                    {personalInfo.name}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-zinc-500 uppercase text-[11px]">Education</div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-white font-sans flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{personalInfo.academic.degree}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-zinc-500 uppercase text-[11px]">Academic Achievement</div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-white font-sans flex items-center gap-1.5 tabular-nums">
                    <Award className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>SGPA {personalInfo.academic.sgpa}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-zinc-500 uppercase text-[11px]">Interests</div>
                  <div className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans">
                    {personalInfo.interests.join(', ')}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-zinc-500 uppercase text-[11px]">Current Focus</div>
                  <div className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>Building practical web &amp; automation software projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Developer Mindset */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {philosophies.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 hover:border-blue-500/40 transition-colors shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-semibold text-base text-zinc-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
