import { octokit } from "./octokit";
import { GithubProfile, PublicRepoForProfile } from "../state";
import { githubProfileMapper, publicRepoForProfileMapper } from "../mappers";

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