import { createServerFn } from "@tanstack/react-start";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
  homepage: string | null;
  topics: string[];
}

const GITHUB_USERNAME = "ervndty";

export const getGithubRepos = createServerFn({ method: "GET" }).handler(
  async (): Promise<GitHubRepo[]> => {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "ervndty-portfolio",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = (await response.json()) as Array<Record<string, unknown>>;

    return data
      .filter((repo) => repo.name !== GITHUB_USERNAME)
      .map((repo) => ({
        id: Number(repo.id),
        name: String(repo.name),
        description: repo.description ? String(repo.description) : null,
        language: repo.language ? String(repo.language) : null,
        stargazers_count: Number(repo.stargazers_count ?? 0),
        forks_count: Number(repo.forks_count ?? 0),
        html_url: String(repo.html_url),
        updated_at: String(repo.updated_at),
        homepage: repo.homepage ? String(repo.homepage) : null,
        topics: Array.isArray(repo.topics) ? repo.topics.map(String) : [],
      }))
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      );
  },
);
