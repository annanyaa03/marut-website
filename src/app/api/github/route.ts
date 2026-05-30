import { NextResponse } from 'next/server';

export const revalidate = 3600; // cache for 1 hour

interface GitHubRepoData {
  stargazers_count: number;
  forks_count: number;
}

interface GitHubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';

    // During build time, if no token is available, return fallback immediately
    // to prevent hitting GitHub's rate limits on shared build server IPs.
    if (isBuildPhase && !token) {
      console.info('Next.js build phase detected with no GITHUB_TOKEN; using static fallback data.');
      return NextResponse.json({
        stars: 13,
        forks: 2,
        contributorsCount: 5,
        contributors: [
          { login: 'lawslefthand', avatar_url: 'https://github.com/lawslefthand.png', html_url: 'https://github.com/lawslefthand' }
        ],
        isFallback: true,
      });
    }

    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'marut-website',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Fetch repo details
    const repoRes = await fetch('https://api.github.com/repos/lawslefthand/Marut_FCU', {
      headers,
      next: { revalidate: 3600 },
    });

    if (!repoRes.ok) {
      throw new Error(`GitHub repo API returned status ${repoRes.status}`);
    }
    const repoData = (await repoRes.json()) as GitHubRepoData;

    // Fetch contributors with pagination
    const contributorResponses = await Promise.all(
      [1, 2, 3, 4, 5].map((page) => fetch(`https://api.github.com/repos/lawslefthand/Marut_FCU/contributors?per_page=100&page=${page}`, {
        headers,
        next: { revalidate: 3600 },
      }))
    );

    const contributorPages = await Promise.all(
      contributorResponses.map(async (contribRes) => {
      if (!contribRes.ok) {
        throw new Error(`GitHub contributors API returned status ${contribRes.status}`);
      }
        return contribRes.json();
      })
    );

    const contributors = contributorPages
      .filter((pageData): pageData is GitHubContributor[] => Array.isArray(pageData))
      .flat();

    // Filter out bots
    const humanContributors = contributors.filter(
      (c) => c.type !== 'Bot' && !c.login.endsWith('[bot]')
    );

    const data = {
      stars: repoData.stargazers_count ?? 13,
      forks: repoData.forks_count ?? 2,
      contributorsCount: humanContributors.length || 5,
      contributors: humanContributors.map((c) => ({
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url,
      })),
    };

    return NextResponse.json(data);
  } catch (error) {
    const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (isBuildPhase) {
      console.warn('GitHub API fetch failed during build, returning fallback data:', errorMessage);
    } else {
      console.error('Error fetching GitHub data, returning fallback:', error);
    }
    return NextResponse.json({
      stars: 13,
      forks: 2,
      contributorsCount: 5,
      contributors: [
        { login: 'lawslefthand', avatar_url: 'https://github.com/lawslefthand.png', html_url: 'https://github.com/lawslefthand' }
      ],
      isFallback: true,
    });
  }
}
