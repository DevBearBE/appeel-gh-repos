import { atom } from "jotai";

export interface GithubProfile {
    id: number;
    login: string;
    name: string;
    reposUrl: string;
    type: string;

}

export const githubProfileAtom = atom<GithubProfile>({} as GithubProfile)