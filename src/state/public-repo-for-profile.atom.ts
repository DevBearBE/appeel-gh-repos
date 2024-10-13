import { atom } from "jotai";

export interface PublicRepoForProfile {
    id: number;
    repoName: string;
    htmlUrl: string;
    gitUrl: string;
    sshUrl: string;
    language: string;
}

export const publicReposForProfileAtom = atom<PublicRepoForProfile[]>([]);