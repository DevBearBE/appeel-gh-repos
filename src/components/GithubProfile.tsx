import React, { useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { useErrorBoundary } from "react-error-boundary";
import { githubProfileAtom } from "../state/github-profile/github-profile.atom";
import { getGithubProfile } from "../utils/helpers";

export const GithubProfile = () => {
    const {showBoundary} = useErrorBoundary();
    const [githubProfile, setGithubProfile] = useAtom(githubProfileAtom);

    const fetchGithubProfile = useCallback(async () => {
        try {
            const profileData = await getGithubProfile('DevBearBE');
            setGithubProfile(profileData);
        } catch (error: any) {
            showBoundary(error);
        }
    }, []);

    useEffect(() => {
        fetchGithubProfile();
    }, []);

    return (<>
        <h1>Github Profile</h1>
        {githubProfile && (<p><strong>{githubProfile.login}</strong></p>)}
    </>)
}