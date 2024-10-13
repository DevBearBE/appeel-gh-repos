import { PublicRepoForProfile } from "../state";

export const publicRepoForProfileMapper = (publicRepoForProfileResponse: any): PublicRepoForProfile => {
    return {
        id: publicRepoForProfileResponse.id,
        repoName: publicRepoForProfileResponse.name,
        htmlUrl: publicRepoForProfileResponse.html_url,
        gitUrl: publicRepoForProfileResponse.git_url,
        sshUrl: publicRepoForProfileResponse.ssh_url,
        language: publicRepoForProfileResponse.language,
    }
}