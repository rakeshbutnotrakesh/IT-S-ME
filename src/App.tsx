import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { ProjectDialog } from './components/ProjectDialog';
import { ResumeModal } from './components/ResumeModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CursorGlow } from './components/CursorGlow';
import { ScrollReveal } from './components/ScrollReveal';
import { ProjectItem } from './data/projects';

export default function App() {
  const { toggleTheme, isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:text-white focus:text-xs focus:font-mono focus:shadow-lg"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        Skip to main content
      </a>

      <ScrollProgressBar />
      <CursorGlow />

      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
      />

      <main id="main-content" className="relative z-10">
        <Hero onOpenResume={() => setResumeOpen(true)} />

        <ScrollReveal direction="up">
          <About />
        </ScrollReveal>

        <ScrollReveal direction="up">
          <Skills />
        </ScrollReveal>

        <ScrollReveal direction="up">
          <Projects onSelectProject={(project) => setSelectedProject(project)} />
        </ScrollReveal>

        <ScrollReveal direction="up">
          <Timeline />
        </ScrollReveal>

        <ScrollReveal direction="up">
          <Contact />
        </ScrollReveal>
      </main>

      <Footer />

      <Chatbot />

      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
