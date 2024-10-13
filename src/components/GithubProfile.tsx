import React, { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { useErrorBoundary } from "react-error-boundary";
import { githubProfileAtom, publicReposForProfileAtom } from "../state";
import { getGithubProfile, getPublicReposForGithubProfile } from "../utils/helpers";

export const GithubProfile = () => {
    const {showBoundary} = useErrorBoundary();
    const [githubProfile, setGithubProfile] = useAtom(githubProfileAtom);
    const [publicReposForProfile, setPublicReposForProfile] = useAtom(publicReposForProfileAtom)

    const fetchGithubProfile = useCallback(async () => {
        try {
            const profileData = await getGithubProfile('DevBearBE');
            setGithubProfile(profileData);

            const publicRepos = await getPublicReposForGithubProfile('DevBearBE');
            setPublicReposForProfile(publicRepos)
        } catch (error: any) {
            showBoundary(error);
        }
    }, []);

    useEffect(() => {
        fetchGithubProfile();
    }, []);

    return (<div className="mb-6">
        {githubProfile && (
            <h3 className="text-lg text-blue-700 font-bold my-4">Github user: {githubProfile.login}</h3>)}
        {publicReposForProfile && (
            <div className="grid grid-cols-3 gap-2 mb-1">
                {publicReposForProfile.map(repo => (
                    <div key={repo.id} className="border rounded-2xl px-6 py-4">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h4 className="text-md font-bold">{repo.repoName}</h4>
                                <span className="text-xs text-violet-400">{repo.language.toUpperCase()}</span>
                            </div>
                            <div>
                                <a
                                    href={repo.htmlUrl}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <button
                                        className="border border-blue-700 rounded-full px-4 py-2 text-blue-700 hover:bg-blue-700 hover:text-white">To
                                        github
                                    </button>
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center justify-evenly">
                            <p>Git:</p>
                            <p>{repo.gitUrl}</p>
                        </div>
                        <div className="flex items-center justify-evenly">
                            <p>SSH:</p>
                            <p>{repo.sshUrl}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>)
}