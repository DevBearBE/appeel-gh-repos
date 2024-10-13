import { PublicGithubRepo } from "../state";

export const publicGithubRepoMapper = (publicGithubRepo: any): PublicGithubRepo => {
    return {
        id: publicGithubRepo.id,
        repoName: publicGithubRepo.name,
        owner: publicGithubRepo.owner.login,
        htmlUrl: publicGithubRepo.html_url,
    }
}