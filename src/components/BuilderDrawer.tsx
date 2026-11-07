import React, { useState } from 'react';
import { X, Copy, Check, RotateCcw, Palette, User, Briefcase, Eye, Sliders, Code } from 'lucide-react';
import { SiteConfig } from '../types';

interface BuilderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onResetConfig: () => void;
}

export const BuilderDrawer: React.FC<BuilderDrawerProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'appearance' | 'sections' | 'export'>('identity');
  const [copiedYaml, setCopiedYaml] = useState(false);

  if (!isOpen) return null;

  const handleIdentityChange = (field: keyof SiteConfig['identity'], value: string) => {
    onUpdateConfig({
      ...config,
      identity: {
        ...config.identity,
        [field]: value,
      },
    });
  };

  const handleContactChange = (field: keyof SiteConfig['contact'], value: string) => {
    onUpdateConfig({
      ...config,
      contact: {
        ...config.contact,
        [field]: value,
      },
    });
  };

  const handlePreferenceToggle = (field: keyof SiteConfig['preferences']) => {
    onUpdateConfig({
      ...config,
      preferences: {
        ...config.preferences,
        [field]: !config.preferences[field],
      },
    });
  };

  const handleAccentChange = (color: string) => {
    onUpdateConfig({
      ...config,
      appearance: {
        ...config.appearance,
        accent: color,
      },
    });
  };

  // Quick Preset Profiles for universal portfolio creation
  const applyPreset = (role: 'developer' | 'designer' | 'editor' | 'marketer') => {
    if (role === 'developer') {
      onUpdateConfig({
        ...config,
        identity: {
          ...config.identity,
          profession: "Full-Stack Engineer & System Architect",
          roleLine2: "Distributed Systems, WebGL & Modern React",
          headline: "BUILDING RESILIENT DISTRIBUTED SYSTEMS & INTERACTIVE TOOLS",
          intro: "Specializing in cloud-native microservices, real-time frontend interfaces, and deterministic state architectures.",
        },
      });
    } else if (role === 'designer') {
      onUpdateConfig({
        ...config,
        identity: {
          ...config.identity,
          profession: "Principal Product Designer & Technologist",
          roleLine2: "Design Systems, Motion Choreography & Spatial Interfaces",
          headline: "TRANSFORMING COMPLEX LOGIC INTO TACTILE HUMAN PRODUCTS",
          intro: "Directing product design and design systems for enterprise platforms and ambitious zero-to-one startups.",
        },
      });
    } else if (role === 'editor') {
      onUpdateConfig({
        ...config,
        identity: {
          ...config.identity,
          profession: "Creative Director & Film Editor",
          roleLine2: "Commercial Campaigns, Narrative Showreels & Sound Design",
          headline: "DIRECTING VISCERAL VISUAL STORIES WITH KINETIC TIMING",
          intro: "Crafting editorial campaigns, brand films, and motion graphics for global culture brands and agencies.",
        },
      });
    } else if (role === 'marketer') {
      onUpdateConfig({
        ...config,
        identity: {
          ...config.identity,
          profession: "Growth Architect & Digital Marketer",
          roleLine2: "Performance Engines, Inbound Strategy & Conversion Optimization",
          headline: "ENGINEERING MEASURABLE PIPELINES & RETENTION ENGINES",
          intro: "Scaling venture-backed B2B SaaS and consumer products through rigorous experimentation and content ecosystems.",
        },
      });
    }
  };

  // Generate YAML string for the user to copy
  const generateYaml = () => {
    return `# UNIVERSAL PORTFOLIO CONFIGURATION
identity:
  fullName: "${config.identity.fullName}"
  displayName: "${config.identity.displayName}"
  profession: "${config.identity.profession}"
  roleLine2: "${config.identity.roleLine2}"
  location: "${config.identity.location}"
  availability: "${config.identity.availability}"
  headline: "${config.identity.headline}"
  intro: "${config.identity.intro}"
  about: "${config.identity.about}"
  portrait: "${config.identity.portrait}"

contact:
  email: "${config.contact.email}"
  phone: "${config.contact.phone}"
  whatsapp: "${config.contact.whatsapp}"
  linkedin: "${config.contact.linkedin}"
  github: "${config.contact.github}"

appearance:
  theme: "${config.appearance.theme}"
  accent: "${config.appearance.accent}"
  displayFont: "${config.appearance.displayFont}"
  bodyFont: "${config.appearance.bodyFont}"

preferences:
  showEducation: ${config.preferences.showEducation}
  showExperience: ${config.preferences.showExperience}
  showDownloadResume: ${config.preferences.showDownloadResume}
`;
  };

  const copyYaml = () => {
    navigator.clipboard.writeText(generateYaml());
    setCopiedYaml(true);
    setTimeout(() => setCopiedYaml(false), 2000);
  };

  const colorPresets = [
    { label: 'Crimson Vermilion (Default)', hex: '#e32b3c' },
    { label: 'Cobalt Blue', hex: '#2563eb' },
    { label: 'Emerald Mint', hex: '#10b981' },
    { label: 'Electric Amber', hex: '#f59e0b' },
    { label: 'Monochrome Silver', hex: '#e4e4e7' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#121212] border-l border-white/15 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto text-[#f2efeb]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#e32b3c]" />
              <span className="text-sm font-mono uppercase tracking-wider font-semibold">
                Portfolio Builder Controls
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#a09c9a] hover:text-[#f2efeb] hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#a09c9a]">
              Instant Role Templates
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => applyPreset('developer')}
                className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono text-left"
              >
                ⚡ Full-Stack Dev
              </button>
              <button
                onClick={() => applyPreset('designer')}
                className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono text-left"
              >
                🎨 Product Designer
              </button>
              <button
                onClick={() => applyPreset('editor')}
                className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono text-left"
              >
                🎬 Video / Film
              </button>
              <button
                onClick={() => applyPreset('marketer')}
                className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs font-mono text-left"
              >
                📈 Growth Marketer
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-white/5 rounded-lg border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('identity')}
              className={`flex-1 py-1.5 rounded text-center transition-colors ${
                activeTab === 'identity' ? 'bg-[#e32b3c] text-white font-semibold' : 'text-[#a09c9a] hover:text-white'
              }`}
            >
              Identity
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`flex-1 py-1.5 rounded text-center transition-colors ${
                activeTab === 'appearance' ? 'bg-[#e32b3c] text-white font-semibold' : 'text-[#a09c9a] hover:text-white'
              }`}
            >
              Style
            </button>
            <button
              onClick={() => setActiveTab('sections')}
              className={`flex-1 py-1.5 rounded text-center transition-colors ${
                activeTab === 'sections' ? 'bg-[#e32b3c] text-white font-semibold' : 'text-[#a09c9a] hover:text-white'
              }`}
            >
              Toggles
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex-1 py-1.5 rounded text-center transition-colors ${
                activeTab === 'export' ? 'bg-[#e32b3c] text-white font-semibold' : 'text-[#a09c9a] hover:text-white'
              }`}
            >
              Export
            </button>
          </div>

          {/* Tab 1: Identity */}
          {activeTab === 'identity' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[#a09c9a] uppercase">Full Name</label>
                <input
                  type="text"
                  value={config.identity.fullName}
                  onChange={(e) => handleIdentityChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f2efeb] focus:outline-none focus:border-[#e32b3c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a09c9a] uppercase">Display Wordmark (Header)</label>
                <input
                  type="text"
                  value={config.identity.displayName}
                  onChange={(e) => handleIdentityChange('displayName', e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f2efeb] focus:outline-none focus:border-[#e32b3c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a09c9a] uppercase">Primary Profession</label>
                <input
                  type="text"
                  value={config.identity.profession}
                  onChange={(e) => handleIdentityChange('profession', e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f2efeb] focus:outline-none focus:border-[#e32b3c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a09c9a] uppercase">Hero Display Headline</label>
                <input
                  type="text"
                  value={config.identity.headline}
                  onChange={(e) => handleIdentityChange('headline', e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f2efeb] focus:outline-none focus:border-[#e32b3c]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a09c9a] uppercase">Introduction (2 Sentences)</label>
                <textarea
                  rows={3}
                  value={config.identity.intro}
                  onChange={(e) => handleIdentityChange('intro', e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f2efeb] focus:outline-none focus:border-[#e32b3c] resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#a09c9a] uppercase">Contact Email</label>
                <input
                  type="email"
                  value={config.contact.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f2efeb] focus:outline-none focus:border-[#e32b3c]"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Style & Accent */}
          {activeTab === 'appearance' && (
            <div className="space-y-5 text-xs font-mono">
              <div className="space-y-2">
                <label className="text-[#a09c9a] uppercase">Focal Accent Color</label>
                <div className="space-y-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.hex}
                      onClick={() => handleAccentChange(preset.hex)}
                      className={`w-full p-2.5 rounded-lg border flex items-center justify-between transition-colors ${
                        config.appearance.accent === preset.hex
                          ? 'border-[#e32b3c] bg-white/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: preset.hex }}
                        />
                        <span className="text-[#f2efeb]">{preset.label}</span>
                      </div>
                      <span className="text-[10px] text-[#a09c9a]">{preset.hex}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 space-y-1">
                <label className="text-[#a09c9a] uppercase">Custom Hex Value</label>
                <input
                  type="text"
                  value={config.appearance.accent}
                  onChange={(e) => handleAccentChange(e.target.value)}
                  placeholder="#e32b3c"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-[#f2efeb] focus:outline-none focus:border-[#e32b3c]"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Section Toggles */}
          {activeTab === 'sections' && (
            <div className="space-y-3 text-xs font-mono">
              <div className="text-[11px] text-[#a09c9a] leading-relaxed">
                As per specification, omit unverified sections cleanly. Missing or unverified data should never create broken empty slots.
              </div>

              {[
                { key: 'showExperience', label: 'Work Experience Timeline' },
                { key: 'showEducation', label: 'Education & Academic Record' },
                { key: 'showDownloadResume', label: 'Download Resume / CV Button' },
                { key: 'showAwards', label: 'Honors & Awards Strip' },
                { key: 'showTestimonials', label: 'Client Testimonials' },
                { key: 'showClientLogos', label: 'Client Brand Logos' },
              ].map(({ key, label }) => {
                const isEnabled = config.preferences[key as keyof SiteConfig['preferences']];
                return (
                  <button
                    key={key}
                    onClick={() => handlePreferenceToggle(key as keyof SiteConfig['preferences'])}
                    className="w-full p-3 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg flex items-center justify-between text-left transition-colors"
                  >
                    <span className="text-[#f2efeb]">{label}</span>
                    <span
                      className={`text-[10px] uppercase px-2 py-0.5 rounded font-semibold ${
                        isEnabled
                          ? 'bg-[#e32b3c] text-white'
                          : 'bg-white/10 text-[#a09c9a]'
                      }`}
                    >
                      {isEnabled ? 'Visible' : 'Hidden'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Tab 4: Export YAML */}
          {activeTab === 'export' && (
            <div className="space-y-4 text-xs font-mono">
              <div className="text-[11px] text-[#a09c9a] leading-relaxed">
                Copy your customized configuration to commit directly to your GitHub repository or reuse in future builds.
              </div>

              <div className="relative">
                <pre className="p-3 bg-black/80 border border-white/10 rounded-lg text-[11px] text-white/90 overflow-x-auto max-h-72">
                  {generateYaml()}
                </pre>
              </div>

              <button
                onClick={copyYaml}
                className="w-full py-2.5 bg-[#e32b3c] hover:bg-[#d02030] text-white uppercase tracking-wider font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {copiedYaml ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied YAML Configuration!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy YAML Configuration</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer Reset */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onResetConfig}
            className="text-xs font-mono text-[#a09c9a] hover:text-[#e32b3c] transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-[#f2efeb] text-xs font-mono rounded transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
