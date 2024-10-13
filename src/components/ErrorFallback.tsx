type ErrorFallbackProps = {
    error: Error,
}

export const ErrorFallback = ({error}: ErrorFallbackProps) => (
    <>
        <div>Oeps! Er is iets misgegaan..</div>
        <div>{error.message}</div>
    </>
)