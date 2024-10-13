import { octokit } from "./octokit";
import { Commit, GithubProfile, PublicGithubRepo, PublicRepoForProfile } from "../state";
import { commitMapper, githubProfileMapper, publicGithubRepoMapper, publicRepoForProfileMapper } from "../mappers";

export const getGithubProfile = async (username: string): Promise<GithubProfile> => {
    const profileResponse = await octokit.rest.users.getByUsername({username});

    if (!profileResponse) throw new Error('No Github user found');

    return githubProfileMapper(profileResponse);
}

export const getPublicReposForGithubProfile = async (username: string): Promise<PublicRepoForProfile[]> => {
    const publicReposForProfileResponse = await octokit.rest.repos.listForUser({username});

    if (!publicReposForProfileResponse) throw new Error('No public repos found for this Github user');

    return publicReposForProfileResponse.data.map((repo: any) => publicRepoForProfileMapper(repo))
}

export const getPublicGithubRepos = async (): Promise<PublicGithubRepo[]> => {
    const publicGithubReposResponse = await octokit.rest.repos.listPublic();

    if (!publicGithubReposResponse) throw new Error('No public repositories found on Github');

    return publicGithubReposResponse.data.map((repo: any) => publicGithubRepoMapper(repo));
}

export const getCommitsForPublicGithubRepo = async (owner: string, repo: string): Promise<Commit[]> => {
    const commitsForPublicGithubRepoResponse = await octokit.rest.repos.listCommits({owner, repo});

    if (!commitsForPublicGithubRepoResponse) throw new Error('No commits found');

    const latestCommitsForPublicGithubRepo = limitArray(commitsForPublicGithubRepoResponse.data);

    return latestCommitsForPublicGithubRepo.map((commit: any) => commitMapper(commit));
}

const limitArray = <T>(arr: T[]): T[] => {
    return arr.length > 20 ? arr.slice(0, 20) : arr;
}