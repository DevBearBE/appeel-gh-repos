import React, { Suspense } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ErrorFallback, GithubProfile } from "./components";
import { ErrorBoundary } from "react-error-boundary";

function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <JotaiProvider>
                <div className="container p-12 mx-auto my-24">
                    <Suspense fallback={'Laden..'}>
                        <GithubProfile/>
                    </Suspense>
                    <hr/>
                </div>
            </JotaiProvider>
        </ErrorBoundary>
    );
}

export default App;
