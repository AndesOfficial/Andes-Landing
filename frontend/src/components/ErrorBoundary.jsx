import React from 'react';
import Button from './common/Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
                    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center border border-red-100">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
                        <p className="text-gray-600 mb-6">
                            We're sorry, but an unexpected error occurred. Please try reloading the page.
                        </p>
                        <Button onClick={() => window.location.reload()}>
                            Reload Page
                        </Button>
                        {process.env.NODE_ENV === 'development' && (
                            <pre className="mt-8 text-left text-xs bg-gray-100 p-4 rounded overflow-auto max-h-48">
                                {this.state.error && this.state.error.toString()}
                            </pre>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
