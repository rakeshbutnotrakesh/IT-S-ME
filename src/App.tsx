import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { ProjectDialog } from './components/ProjectDialog';
import { ResumeModal } from './components/ResumeModal';
import { SwarmAntigravity } from './components/SwarmAntigravity';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ScrollReveal } from './components/ScrollReveal';
import { ProjectItem } from './data/projects';

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [swarmActive, setSwarmActive] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:text-xs focus:font-mono focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Top Reading / Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Standalone Swarm Antigravity Animation Canvas */}
      <SwarmAntigravity
        isActive={swarmActive}
        onToggle={() => setSwarmActive(!swarmActive)}
        accentColor={isDark ? '#3b82f6' : '#2563eb'}
      />

      {/* Responsive Navigation Bar */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        swarmActive={swarmActive}
        onToggleSwarm={() => setSwarmActive(!swarmActive)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Landmark */}
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          swarmActive={swarmActive}
          onToggleSwarm={() => setSwarmActive(!swarmActive)}
        />

        {/* About Section with Scroll Reveal */}
        <ScrollReveal direction="up" delay={50}>
          <About />
        </ScrollReveal>

        {/* Technical Skills Organized into 4 Categories */}
        <ScrollReveal direction="up" delay={50}>
          <Skills />
        </ScrollReveal>

        {/* Featured Projects with Live status indicators */}
        <ScrollReveal direction="up" delay={50}>
          <Projects
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </ScrollReveal>

        {/* Development Journey Timeline */}
        <ScrollReveal direction="up" delay={50}>
          <Journey />
        </ScrollReveal>

        {/* Verified Academic & Developer Achievements */}
        <ScrollReveal direction="up" delay={50}>
          <Achievements />
        </ScrollReveal>

        {/* Contact Section */}
        <ScrollReveal direction="up" delay={50}>
          <Contact />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer
        onToggleSwarm={() => setSwarmActive(!swarmActive)}
        swarmActive={swarmActive}
      />

      {/* Floating Interactive Portfolio Assistant (Rex) */}
      <Chatbot />

      {/* Project Case Study Fullscreen Modal */}
      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
