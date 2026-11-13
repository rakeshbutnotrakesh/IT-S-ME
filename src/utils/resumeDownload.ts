import { portfolioConfig } from '../config/portfolioConfig';
import { skillCategories } from '../data/skills';

/**
 * Offline, zero-tracking resume downloader.
 * Checks if static /resume.pdf exists in public/, otherwise triggers a clean
 * self-contained offline printable HTML resume download.
 */
export async function downloadResumeOffline(): Promise<'pdf' | 'html-fallback'> {
  try {
    const res = await fetch(portfolioConfig.contact.resumePdfPath, { method: 'HEAD' });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('pdf')) {
      const link = document.createElement('a');
      link.href = portfolioConfig.contact.resumePdfPath;
      link.download = 'Rakesh_Kumar_Mondal_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return 'pdf';
    }
  } catch {
    // Offline or no static PDF placed yet — fall through to client-generated summary file
  }

  const skillsHtml = skillCategories
    .map(
      (cat) =>
        `<p><strong>${cat.title}:</strong> ${cat.skills.map((s) => s.name).join(', ')}</p>`
    )
    .join('\n');

  const projectsHtml = portfolioConfig.featuredProjects
    .slice(0, 6)
    .map(
      (p) =>
        `<div class="item">
          <div class="row"><strong>${p.name}</strong><span>${p.techStack.join(' · ')}</span></div>
          <p>${p.description}</p>
        </div>`
    )
    .join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${portfolioConfig.profile.name} — Resume</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; color: #111827; max-width: 780px; margin: 40px auto; padding: 0 24px; line-height: 1.55; }
  h1 { margin: 0; font-size: 26px; }
  .meta { color: #4b5563; font-size: 13px; margin: 6px 0 22px; }
  h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; margin-top: 24px; color: #1f2937; }
  .row { display: flex; justify-content: space-between; gap: 12px; font-size: 14px; }
  .item { margin-bottom: 12px; }
  p { margin: 4px 0; font-size: 13.5px; color: #374151; }
</style>
</head>
<body>
  <h1>${portfolioConfig.profile.name}</h1>
  <div class="meta">${portfolioConfig.profile.title} · ${portfolioConfig.contact.email} · ${portfolioConfig.contact.githubUrl}</div>
  <h2>Education</h2>
  <p><strong>${portfolioConfig.education.degree}</strong> — ${portfolioConfig.education.college} (Expected Graduation: ${portfolioConfig.education.expectedGraduation})</p>
  <h2>Technical Skills</h2>
  ${skillsHtml}
  <h2>Selected Projects</h2>
  ${projectsHtml}
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Rakesh_Kumar_Mondal_Resume.html';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return 'html-fallback';
}
