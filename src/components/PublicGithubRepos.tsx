import { useAtom } from "jotai";
import { useErrorBoundary } from "react-error-boundary";
import React, { useCallback, useEffect, useState } from "react";
import { getCommitsForPublicGithubRepo, getPublicGithubRepos } from "../utils/helpers";
import { Commit, commitsAtom, PublicGithubRepo, publicGithubReposAtom } from "../state";

export const PublicGithubRepos = () => {
    const {showBoundary} = useErrorBoundary();
    const [publicGithubRepos, setPublicGithubRepos] = useAtom(publicGithubReposAtom);
    const [commitsForRepo, setCommitsForRepo] = useAtom(commitsAtom);
    const [selectedRepo, setSelectedRepo] = useState<PublicGithubRepo>({} as PublicGithubRepo);
    const [showCommits, setShowCommits] = useState<boolean>(false);
    const [filterValue, setFilterValue] = useState<string>("");
    const [filteredCommits, setFilteredCommits] = useState<Commit[]>([])

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

    const getCommitsForRepo = async (repo: PublicGithubRepo): Promise<void> => {
        const {owner, repoName} = repo;
        setSelectedRepo(repo);

        const commits = await getCommitsForPublicGithubRepo(owner, repoName);
        setCommitsForRepo(commits);
        setFilteredCommits(commits);

        setShowCommits(true);
    }

    const handleBackAction = (): void => {
        setShowCommits(false);
        setFilterValue("");
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = e.target.value;
        setFilterValue(inputValue);

        const filtered = commitsForRepo.filter(commit => commit.message.toLowerCase().includes(inputValue.toLowerCase()));

        setFilteredCommits(filtered);
    }

    return (<div>
        <h3 className="text-lg text-blue-700 font-bold my-4">Public repositories</h3>
        {!showCommits && publicGithubRepos && (
            <div className="grid grid-cols-6 gap-2 mb-6">
                {publicGithubRepos.map((repo) => (
                    <div key={repo.id} className="border rounded-2xl px-6 py-4 flex flex-col justify-between">
                        <div className="mb-6">
                            <h4 className="text-md font-bold">{repo.repoName}</h4>
                            <span className="text-xs text-violet-400">{repo.owner.toUpperCase()}</span>
                        </div>

                        <div>
                            <button
                                className="border border-sky-600 rounded-full w-full mb-4 px-4 py-1 text-sky-600 hover:bg-sky-600 hover:text-white"
                                onClick={() => getCommitsForRepo(repo)}>
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

        {showCommits && filteredCommits && (
            <div>
                <div className="mb-6 flex justify-between">
                    <div className="border rounded-2xl px-6 py-4">
                        <h4 className="text-md font-bold">{selectedRepo.repoName}</h4>
                        <span className="text-xs text-violet-400">{selectedRepo.owner.toUpperCase()}</span>
                    </div>
                    <div>
                        <button
                            className="border border-sky-600 rounded-full mb-4 px-4 py-1 text-sky-600 hover:bg-sky-600 hover:text-white"
                            onClick={handleBackAction}>
                            Back
                        </button>
                    </div>
                </div>
                <div className="flex justify-between">
                    <h4 className="text-md font-bold mb-2">Commits</h4>
                    <input className="border rounded-full px-6" type="text" value={filterValue}
                           onChange={handleInputChange}
                           placeholder='Enter value'/>
                </div>
                {filteredCommits.map((commit) => (
                    <div key={commit.id} className="mb-2">
                        <div>
                            <p className="-mb-1">{commit.message}</p>
                            <span className="text-xs text-violet-400">{commit.authorName.toUpperCase()}</span>
                        </div>

                    </div>
                ))}
            </div>
        )}
    </div>)
}