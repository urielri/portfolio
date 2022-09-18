import { Component, FC, ReactNode } from 'react'
interface Props {
    error: any;
    resetErrorBoundary: Function;
}
const ErrorFallback: FC<Props> = ({ error, resetErrorBoundary }): JSX.Element => {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={() => resetErrorBoundary()}>Try again</button>
        </div>
    );
}

interface PropsBoundary {
    children: ReactNode | JSX.Element | FC;
    fallback: ReactNode | JSX.Element | FC;

}
class ErrorBoundary extends Component< any,{hasError: boolean, error: any}> {
    constructor(props: PropsBoundary) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    //  state = { hasError: false, error: null };
    static getDerivedStateFromError(error: any) {
        return {
            hasError: true,
            error
        };
    }
    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}
export { ErrorFallback, ErrorBoundary };