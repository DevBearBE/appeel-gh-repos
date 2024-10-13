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

    return (<>
        <h1>My Github Profile</h1>
        {githubProfile && (<h3>Github user: {githubProfile.login}</h3>)}
        {publicReposForProfile && publicReposForProfile.map(repo => (
            <div key={repo.id}>
                <h4>{repo.repoName}</h4>
                <span>{repo.language.toUpperCase()}</span>

                <div>
                    <p>Git:</p>
                    <p>{repo.gitUrl}</p>
                </div>
                <div>
                    <p>SSH:</p>
                    <p>{repo.sshUrl}</p>
                </div>
                <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
                    <button>To github</button>
                </a>

            </div>
        ))}
    </>)
}