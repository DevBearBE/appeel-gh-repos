// mapper to map request response to actual type
import { GithubProfile } from "../state/github-profile/github-profile.atom";

export const githubProfileMapper = (profileResponse: any): GithubProfile => {
    return {
        id: profileResponse?.data.id,
        login: profileResponse?.data.login,
        name: profileResponse?.data.name,
        reposUrl: profileResponse?.data.repos_url,
        type: profileResponse?.data.type,
    };
}