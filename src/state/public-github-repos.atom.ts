import { atom } from "jotai";

export interface PublicGithubRepo {
    id: number;
    repoName: string;
    owner: string;
    htmlUrl: string;
}

export const publicGithubReposAtom = atom<PublicGithubRepo[]>([]);