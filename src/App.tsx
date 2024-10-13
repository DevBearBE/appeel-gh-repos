import React, { Suspense } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { ErrorFallback, GithubProfile } from "./components";
import { ErrorBoundary } from "react-error-boundary";

function App() {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <JotaiProvider>
                <div className="App">
                    <Suspense fallback={'Laden..'}>
                        <GithubProfile/>
                    </Suspense>
                </div>
            </JotaiProvider>
        </ErrorBoundary>
    );
}

export default App;
