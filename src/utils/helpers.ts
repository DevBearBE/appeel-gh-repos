import { octokit } from "./octokit";
import { GithubProfile } from "../state/github-profile/github-profile.atom";
import { githubProfileMapper } from "../mappers/github-profile.mapper";

export const getGithubProfile = async (username: string): Promise<GithubProfile> => {
    const profile = await octokit.rest.users.getByUsername({username});

    if (!profile) throw new Error('No Github user found');

    return githubProfileMapper(profile);
}