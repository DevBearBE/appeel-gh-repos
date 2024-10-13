import { Commit } from "../state";

export const commitMapper = (commitForPublicGithubRepo: any): Commit => {
    return {
        id: commitForPublicGithubRepo.sha,
        login: commitForPublicGithubRepo.author?.login ?? '',
        authorName: commitForPublicGithubRepo.commit?.author?.name ?? '',
        authorEmail: commitForPublicGithubRepo.commit?.author?.email ?? '',
        message: commitForPublicGithubRepo.commit?.message,
        commitDate: commitForPublicGithubRepo.commit?.author?.date ?? '',
    }
}