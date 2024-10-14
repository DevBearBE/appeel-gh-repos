import { octokit } from "./octokit";
import { commitMapper, githubProfileMapper, publicGithubRepoMapper, publicRepoForProfileMapper } from "../mappers";
import {
    getCommitsForPublicGithubRepo,
    getGithubProfile,
    getPublicGithubRepos,
    getPublicReposForGithubProfile
} from "./helpers";

jest.mock('./octokit', () => ({
    octokit: {
        rest: {
            users: {
                getByUsername: jest.fn(),
            },
            repos: {
                listForUser: jest.fn(),
                listPublic: jest.fn(),
                listCommits: jest.fn(),
            },
        },
    },
}));

jest.mock('../mappers', () => ({
    githubProfileMapper: jest.fn(),
    publicRepoForProfileMapper: jest.fn(),
    publicGithubRepoMapper: jest.fn(),
    commitMapper: jest.fn(),
}));

describe('GitHub API Functions', () => {
    const mockProfileData = {id: 1, login: 'octocat'};
    const mockRepoData = [{id: 1, name: 'repo1'}];
    const mockCommitsData = [{sha: 'commit1'}, {sha: 'commit2'}];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getGithubProfile', () => {
        it('should return mapped GitHub profile', async () => {
            (octokit.rest.users.getByUsername as jest.Mock).mockResolvedValue({data: mockProfileData});
            (githubProfileMapper as jest.Mock).mockReturnValue({id: 1, username: 'octocat'});

            const profile = await getGithubProfile('octocat');
            expect(octokit.rest.users.getByUsername).toHaveBeenCalledWith({username: 'octocat'});
            expect(githubProfileMapper).toHaveBeenCalledWith({data: mockProfileData});
            expect(profile).toEqual({id: 1, username: 'octocat'});
        });

        it('should throw error when no profile found', async () => {
            (octokit.rest.users.getByUsername as jest.Mock).mockResolvedValue(null);

            await expect(getGithubProfile('invalidUser')).rejects.toThrow('No Github user found');
        });
    });

    describe('getPublicReposForGithubProfile', () => {
        it('should return mapped public repos for a user', async () => {
            (octokit.rest.repos.listForUser as jest.Mock).mockResolvedValue({data: mockRepoData});
            (publicRepoForProfileMapper as jest.Mock).mockReturnValue({id: 1, name: 'repo1'});

            const repos = await getPublicReposForGithubProfile('octocat');
            expect(octokit.rest.repos.listForUser).toHaveBeenCalledWith({username: 'octocat'});
            expect(publicRepoForProfileMapper).toHaveBeenCalledWith(mockRepoData[0]);
            expect(repos).toEqual([{id: 1, name: 'repo1'}]);
        });

        it('should throw error when no public repos found', async () => {
            (octokit.rest.repos.listForUser as jest.Mock).mockResolvedValue(null);

            await expect(getPublicReposForGithubProfile('invalidUser')).rejects.toThrow('No public repos found for this Github user');
        });
    });

    describe('getPublicGithubRepos', () => {
        it('should return mapped public repos', async () => {
            (octokit.rest.repos.listPublic as jest.Mock).mockResolvedValue({data: mockRepoData});
            (publicGithubRepoMapper as jest.Mock).mockReturnValue({id: 1, name: 'repo1'});

            const repos = await getPublicGithubRepos();
            expect(octokit.rest.repos.listPublic).toHaveBeenCalled();
            expect(publicGithubRepoMapper).toHaveBeenCalledWith(mockRepoData[0]);
            expect(repos).toEqual([{id: 1, name: 'repo1'}]);
        });

        it('should throw error when no public repos found', async () => {
            (octokit.rest.repos.listPublic as jest.Mock).mockResolvedValue(null);

            await expect(getPublicGithubRepos()).rejects.toThrow('No public repositories found on Github');
        });
    });

    describe('getCommitsForPublicGithubRepo', () => {
        it('should return mapped commits for a repository', async () => {
            (octokit.rest.repos.listCommits as jest.Mock).mockResolvedValue({data: mockCommitsData});
            (commitMapper as jest.Mock).mockImplementation(commit => ({sha: commit.sha}));

            const commits = await getCommitsForPublicGithubRepo('octocat', 'repo1');
            expect(octokit.rest.repos.listCommits).toHaveBeenCalledWith({owner: 'octocat', repo: 'repo1'});
            expect(commitMapper).toHaveBeenCalledWith(mockCommitsData[0]);
            expect(commitMapper).toHaveBeenCalledWith(mockCommitsData[1]);
            expect(commits).toEqual([{sha: 'commit1'}, {sha: 'commit2'}]);
        });

        it('should throw error when no commits found', async () => {
            (octokit.rest.repos.listCommits as jest.Mock).mockResolvedValue(null);

            await expect(getCommitsForPublicGithubRepo('octocat', 'repo1')).rejects.toThrow('No commits found');
        });
    });
});
