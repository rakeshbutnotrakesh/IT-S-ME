import React from 'react';
import { ProjectConfigItem } from '../config/portfolioConfig';

interface ProjectPreviewProps {
  project: ProjectConfigItem;
  className?: string;
}

/**
 * Editorial, lightweight schematic UI preview for each project card and modal.
 * Avoids heavy/generic stock graphics while visually communicating each app's purpose.
 */
export const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project, className = '' }) => {
  return (
    <div
      className={`relative w-full h-full bg-[var(--bg-subtle)] text-[var(--text-primary)] overflow-hidden select-none p-5 sm:p-6 flex flex-col justify-between ${className}`}
      role="img"
      aria-label={`${project.name} interface preview`}
    >
      {/* Top editorial window chrome */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] pb-3 border-b border-[var(--border)]">
        <span className="truncate">{project.category}</span>
        <span className="tabular-nums">{project.indexNumber}</span>
      </div>

      {/* Domain-specific minimal schematic */}
      <div className="my-auto py-3">
        {project.previewType === 'portfolio' && (
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
              <span className="font-heading font-bold text-xs">
                RKM<span className="text-[var(--accent)]">.</span>
              </span>
              <div className="flex gap-2">
                <span className="w-6 h-1.5 rounded-full bg-[var(--border-strong)]" />
                <span className="w-6 h-1.5 rounded-full bg-[var(--border-strong)]" />
                <span className="w-6 h-1.5 rounded-full bg-[var(--accent)]" />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-3 items-center pt-1">
              <div className="col-span-7 space-y-1.5">
                <div className="w-3/4 h-2.5 rounded bg-[var(--text-primary)]/85" />
                <div className="w-full h-2 rounded bg-[var(--border-strong)]" />
                <div className="w-14 h-4 rounded bg-[var(--accent)] mt-2" />
              </div>
              <div className="col-span-5 aspect-square rounded border border-[var(--border)] bg-grid-architect" />
            </div>
          </div>
        )}

        {project.previewType === 'fileforge' && (
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-4 space-y-3 shadow-xs">
            <div className="grid grid-cols-12 gap-3 items-center">
              <div className="col-span-5 aspect-[3/4] rounded border border-dashed border-[var(--accent)]/60 bg-[var(--accent-tint)] flex items-center justify-center">
                <div className="w-7 h-9 rounded-sm border border-[var(--accent)]/50 bg-[var(--bg-surface)]" />
              </div>
              <div className="col-span-7 space-y-2">
                <div className="text-[11px] font-mono text-[var(--text-muted)]">35mm × 45mm · 300 DPI</div>
                <div className="h-2 w-full rounded bg-[var(--border)]" />
                <div className="h-2 w-4/5 rounded bg-[var(--border)]" />
                <div className="pt-1 flex gap-2">
                  <span className="h-5 w-14 rounded border border-[var(--border)] bg-[var(--bg-subtle)]" />
                  <span className="h-5 w-14 rounded bg-[var(--accent)]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {project.previewType === 'civicdesk' && (
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-3.5 space-y-2 shadow-xs font-mono text-[10.5px]">
            <div className="flex items-center justify-between py-1.5 border-b border-[var(--border)]">
              <span className="truncate font-sans font-medium text-[var(--text-primary)]">Streetlight Outage · Ward 4</span>
              <span className="text-[var(--accent)] shrink-0 ml-2">Open</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-[var(--border)]">
              <span className="truncate font-sans font-medium text-[var(--text-primary)]">Drainage Repair Request</span>
              <span className="text-[var(--text-muted)] shrink-0 ml-2">In Review</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="truncate font-sans font-medium text-[var(--text-primary)]">Road Patch Maintenance</span>
              <span className="text-[var(--text-muted)] shrink-0 ml-2">Logged</span>
            </div>
          </div>
        )}

        {project.previewType === 'lifeos' && (
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-3.5 grid grid-cols-2 gap-2.5 shadow-xs">
            <div className="p-2.5 rounded border border-[var(--border)] space-y-1.5">
              <div className="text-[10px] font-mono text-[var(--text-muted)]">Tasks</div>
              <div className="h-2 w-4/5 rounded bg-[var(--text-primary)]/70" />
              <div className="h-2 w-3/5 rounded bg-[var(--border-strong)]" />
            </div>
            <div className="p-2.5 rounded border border-[var(--border)] space-y-1.5">
              <div className="text-[10px] font-mono text-[var(--text-muted)]">Study</div>
              <div className="h-2 w-3/4 rounded bg-[var(--accent)]" />
              <div className="h-2 w-1/2 rounded bg-[var(--border-strong)]" />
            </div>
            <div className="p-2.5 rounded border border-[var(--border)] space-y-1.5">
              <div className="text-[10px] font-mono text-[var(--text-muted)]">Habits</div>
              <div className="h-2 w-2/3 rounded bg-[var(--border-strong)]" />
            </div>
            <div className="p-2.5 rounded border border-[var(--border)] space-y-1.5">
              <div className="text-[10px] font-mono text-[var(--text-muted)]">Finances</div>
              <div className="h-2 w-3/5 rounded bg-[var(--border-strong)]" />
            </div>
          </div>
        )}

        {project.previewType === 'cybersafe' && (
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-4 space-y-2.5 shadow-xs font-mono">
            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
              <span>SHA-256 CHECKSUM</span>
              <span className="text-[var(--accent)]">CLIENT-SIDE</span>
            </div>
            <div className="p-2 rounded bg-[var(--bg-subtle)] border border-[var(--border)] text-[10px] text-[var(--text-secondary)] truncate">
              e3b0c44298fc1c149afbf4c8996fb924...
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <div className="h-1.5 flex-1 rounded-full bg-[var(--border)] overflow-hidden">
                <div className="h-full w-4/5 bg-[var(--accent)] rounded-full" />
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">Entropy</span>
            </div>
          </div>
        )}

        {project.previewType === 'n8n' && (
          <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
              <div className="px-2.5 py-2 rounded border border-[var(--border)] bg-[var(--bg-subtle)] text-center">
                Webhook
              </div>
              <div className="flex-1 h-px bg-[var(--border-strong)]" />
              <div className="px-2.5 py-2 rounded border border-[var(--accent)]/50 bg-[var(--accent-tint)] text-[var(--accent)] text-center font-medium">
                Transform
              </div>
              <div className="flex-1 h-px bg-[var(--border-strong)]" />
              <div className="px-2.5 py-2 rounded border border-[var(--border)] bg-[var(--bg-subtle)] text-center">
                Docker
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom tech footnote */}
      <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
        <span className="truncate">{project.techStack.slice(0, 3).join(' · ')}</span>
      </div>
    </div>
  );
};
