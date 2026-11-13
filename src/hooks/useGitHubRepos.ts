import { useState, useEffect } from 'react';
import { portfolioConfig } from '../config/portfolioConfig';

export interface GitHubRepoCard {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  updatedAt: string;
  htmlUrl: string;
  homepage?: string;
  isPinned: boolean;
  isFallback?: boolean;
}

export interface GitHubActivitySummary {
  recentEventsCount: number;
  lastPushLabel: string;
  activeDaysCount: number;
}

interface CachedGitHubPayload {
  timestamp: number;
  repos: GitHubRepoCard[];
  activity: GitHubActivitySummary;
}

const CACHE_KEY = 'rkm_github_cache_v2';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache TTL

function buildStaticFallback(): { repos: GitHubRepoCard[]; activity: GitHubActivitySummary } {
  const pinnedSet = new Set(portfolioConfig.github.pinnedRepos.map((n) => n.toLowerCase()));

  const repos: GitHubRepoCard[] = portfolioConfig.featuredProjects
    .slice(0, portfolioConfig.github.maxReposToShow)
    .map((p) => ({
      id: `static-${p.id}`,
      name: p.name,
      description: p.description,
      language: p.techStack.includes('n8n') ? 'JavaScript' : 'TypeScript',
      stars: 0,
      updatedAt: portfolioConfig.meta.lastUpdated,
      htmlUrl: p.githubUrl || portfolioConfig.contact.githubUrl,
      homepage: p.liveUrl,
      isPinned: pinnedSet.has(p.name.toLowerCase()),
      isFallback: true,
    }));

  return {
    repos,
    activity: {
      recentEventsCount: 0,
      lastPushLabel: portfolioConfig.meta.lastUpdated,
      activeDaysCount: 0,
    },
  };
}

export function formatRelativeDate(isoOrLabel: string): string {
  const parsed = Date.parse(isoOrLabel);
  if (Number.isNaN(parsed)) return isoOrLabel;
  return new Date(parsed).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function useGitHubRepos() {
  const fallback = buildStaticFallback();
  const [repos, setRepos] = useState<GitHubRepoCard[]>(fallback.repos);
  const [activity, setActivity] = useState<GitHubActivitySummary>(fallback.activity);
  const [status, setStatus] = useState<'cached' | 'live' | 'fallback' | 'loading'>('fallback');

  useEffect(() => {
    const username = portfolioConfig.contact.githubUsername?.trim();
    if (!username || username.includes('[')) {
      setStatus('fallback');
      return;
    }

    let cancelled = false;

    const load = async () => {
      // 1. Check localStorage cache first
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const parsed: CachedGitHubPayload = JSON.parse(raw);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS && parsed.repos?.length > 0) {
            if (!cancelled) {
              setRepos(parsed.repos);
              setActivity(parsed.activity);
              setStatus('cached');
            }
            return;
          }
        }
      } catch {
        // Ignore storage read errors
      }

      if (!cancelled) setStatus('loading');

      try {
        const [reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`, {
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=20`, {
            headers: { Accept: 'application/vnd.github+json' },
          }).catch(() => null),
        ]);

        if (!reposRes.ok) {
          throw new Error(`GitHub API ${reposRes.status}`);
        }

        const rawRepos = (await reposRes.json()) as Array<{
          id: number;
          name: string;
          description: string | null;
          language: string | null;
          stargazers_count: number;
          updated_at: string;
          html_url: string;
          homepage?: string | null;
          fork?: boolean;
        }>;

        const pinnedOrder = portfolioConfig.github.pinnedRepos.map((n) => n.toLowerCase());

        const mapped: GitHubRepoCard[] = rawRepos
          .filter((r) => !r.fork)
          .map((r) => ({
            id: String(r.id),
            name: r.name,
            description: r.description || 'Repository source code and project documentation.',
            language: r.language || 'TypeScript',
            stars: r.stargazers_count || 0,
            updatedAt: formatRelativeDate(r.updated_at),
            htmlUrl: r.html_url,
            homepage: r.homepage || undefined,
            isPinned: pinnedOrder.includes(r.name.toLowerCase()),
            isFallback: false,
          }))
          .sort((a, b) => {
            const aIdx = pinnedOrder.indexOf(a.name.toLowerCase());
            const bIdx = pinnedOrder.indexOf(b.name.toLowerCase());
            if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
            if (aIdx !== -1) return -1;
            if (bIdx !== -1) return 1;
            return b.stars - a.stars;
          })
          .slice(0, portfolioConfig.github.maxReposToShow);

        let computedActivity: GitHubActivitySummary = {
          recentEventsCount: 0,
          lastPushLabel: mapped[0]?.updatedAt || portfolioConfig.meta.lastUpdated,
          activeDaysCount: 0,
        };

        if (eventsRes && eventsRes.ok) {
          const events = (await eventsRes.json()) as Array<{ created_at?: string }>;
          const uniqueDays = new Set(
            events
              .map((ev) => (ev.created_at ? ev.created_at.slice(0, 10) : ''))
              .filter(Boolean)
          );
          computedActivity = {
            recentEventsCount: events.length,
            lastPushLabel: events[0]?.created_at
              ? formatRelativeDate(events[0].created_at)
              : mapped[0]?.updatedAt || portfolioConfig.meta.lastUpdated,
            activeDaysCount: uniqueDays.size,
          };
        }

        if (mapped.length > 0 && !cancelled) {
          setRepos(mapped);
          setActivity(computedActivity);
          setStatus('live');

          try {
            const payload: CachedGitHubPayload = {
              timestamp: Date.now(),
              repos: mapped,
              activity: computedActivity,
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
          } catch {
            // Ignore storage quota errors
          }
        }
      } catch {
        if (!cancelled) {
          setRepos(fallback.repos);
          setActivity(fallback.activity);
          setStatus('fallback');
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { repos, activity, status };
}
