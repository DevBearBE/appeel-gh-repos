import { atom } from "jotai";

export interface Commit {
    id: string;
    login: string;
    authorName: string;
    authorEmail: string;
    message: string;
    commitDate: string;
}

export const commitsAtom = atom<Commit[]>([])