import React, { Suspense } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ErrorFallback, GithubProfile, PublicGithubRepos } from "./components";
import { ErrorBoundary } from "react-error-boundary";

function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <JotaiProvider>
                <div className="container p-12 mx-auto">
                    <h1 className="text-2xl font-bold text-white text-center p-4 bg-blue-700 rounded-md">
                        Simple Github reader
                    </h1>
                    <Suspense fallback={'Laden..'}>
                        <GithubProfile/>
                    </Suspense>
                    <hr/>
                    <Suspense fallback={'Laden..'}>
                        <PublicGithubRepos/>
                    </Suspense>
                </div>
            </JotaiProvider>
        </ErrorBoundary>
    );
}

export default App;
