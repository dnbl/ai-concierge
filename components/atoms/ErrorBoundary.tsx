import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AccessibleButton } from './AccessibilityEnhancements';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  showBugReport?: boolean;
  showHomeButton?: boolean;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onBugReport?: (error: Error, errorInfo: ErrorInfo) => void;
  onGoHome?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    this.setState({ errorInfo });
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement error reporting service (Sentry, LogRocket, etc.)
      console.error('Production error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
    }
    
    this.props.onError?.(error, errorInfo);
  }

  handleBugReport = () => {
    if (this.state.error && this.state.errorInfo) {
      if (this.props.onBugReport) {
        this.props.onBugReport(this.state.error, this.state.errorInfo);
      } else {
        // Default bug report behavior
        const bugReportData = {
          error: this.state.error.message,
          stack: this.state.error.stack,
          componentStack: this.state.errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        };
        
        // Copy to clipboard for now (in real app, this would send to bug tracker)
        navigator.clipboard.writeText(JSON.stringify(bugReportData, null, 2))
          .then(() => alert('Error details copied to clipboard'))
          .catch(() => console.log('Failed to copy error details'));
      }
    }
  };

  handleGoHome = () => {
    if (this.props.onGoHome) {
      this.props.onGoHome();
    } else {
      // Default home navigation
      window.location.href = '/';
    }
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 bg-theme-secondary rounded-lg border border-red-500/20 max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-theme-primary mb-2">
            Something went wrong
          </h3>
          <p className="text-theme-secondary text-center mb-6">
            We encountered an unexpected error. Please try one of the options below.
          </p>
          
          <div className="flex flex-col gap-3 w-full">
            <AccessibleButton
              variant="primary"
              onClick={this.handleRetry}
              className="w-full"
            >
              Try Again
            </AccessibleButton>
            
            <AccessibleButton
              variant="secondary"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Refresh Page
            </AccessibleButton>
            
            {this.props.showHomeButton !== false && (
              <AccessibleButton
                variant="ghost"
                onClick={this.handleGoHome}
                className="w-full"
              >
                Go Home
              </AccessibleButton>
            )}
            
            {this.props.showBugReport !== false && (
              <AccessibleButton
                variant="ghost"
                onClick={this.handleBugReport}
                className="w-full text-sm"
              >
                Report Bug
              </AccessibleButton>
            )}
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 w-full">
              <summary className="cursor-pointer text-sm text-theme-tertiary hover:text-theme-secondary">
                Error Details (Dev Mode)
              </summary>
              <pre className="mt-2 p-2 bg-theme-tertiary rounded text-xs text-theme-primary overflow-auto max-h-32">
                {this.state.error?.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
