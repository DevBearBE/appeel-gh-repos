import { useAtom } from "jotai";
import { useErrorBoundary } from "react-error-boundary";
import React, { useCallback, useEffect } from "react";
import { getCommitsForPublicGithubRepo, getPublicGithubRepos } from "../utils/helpers";
import { commitsAtom, publicGithubReposAtom } from "../state";

export const PublicGithubRepos = () => {
    const {showBoundary} = useErrorBoundary();
    const [publicGithubRepos, setPublicGithubRepos] = useAtom(publicGithubReposAtom);
    const [commitsForRepo, setCommitsForRepo] = useAtom(commitsAtom);

    const fetchPublicGithubRepos = useCallback(async () => {
        try {
            const publicGithubReposData = await getPublicGithubRepos();
            setPublicGithubRepos(publicGithubReposData)
        } catch (error: any) {
            showBoundary(error);
        }
    }, []);

    useEffect(() => {
        fetchPublicGithubRepos();
    }, []);

    const getCommitsForRepo = async (owner: string, repo: string) => {
        const commits = await getCommitsForPublicGithubRepo(owner, repo);
        setCommitsForRepo(commits);
    }

    return (<div>
        <h3 className="text-lg text-blue-700 font-bold my-4">Public repositories</h3>
        {publicGithubRepos && (
            <div className="grid grid-cols-6 gap-2 mb-6">
                {publicGithubRepos.map((repo) => (
                    <div key={repo.id} className="border rounded-2xl px-6 py-4 flex flex-col justify-between">
                        <div className="mb-6">
                            <h4 className="text-md font-bold">{repo.repoName}</h4>
                            <span className="text-xs text-violet-400">{repo.owner.toUpperCase()}</span>
                        </div>

                        <div>
                            <button
                                className="border border-blue-700 rounded-full w-full mb-4 px-4 py-1 text-blue-700 hover:bg-blue-700 hover:text-white"
                                onClick={() => getCommitsForRepo(repo.owner, repo.repoName)}>
                                Show commits
                            </button>
                            <a
                                href={repo.htmlUrl}
                                target="_blank"
                                rel="noopener noreferrer">
                                <button
                                    className="border border-blue-700 rounded-full w-full px-4 py-1 text-blue-700 hover:bg-blue-700 hover:text-white">To
                                    github
                                </button>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        )}

        {commitsForRepo && commitsForRepo.map((commit) => (
            <div key={commit.id} className="mb-2">
                <p className="-mb-1">{commit.message}</p>
                <span className="text-xs text-violet-400">{commit.authorName.toUpperCase()}</span>
            </div>
        ))}
    </div>)
}