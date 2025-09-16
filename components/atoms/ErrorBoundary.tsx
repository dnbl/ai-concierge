import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ThemeProvider } from '../providers/ThemeProvider';
import AccessibleButton from './AccessibleButton';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showErrorDetails?: boolean;
  onReportBug?: (error: Error, errorInfo: ErrorInfo) => void;
  onGoHome?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  isReporting: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      isReporting: false 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
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
        url: window.location.href,
      });
    }
    
    this.props.onError?.(error, errorInfo);
  }

  handleReportBug = async () => {
    if (!this.state.error || !this.state.errorInfo) return;
    
    this.setState({ isReporting: true });
    
    try {
      if (this.props.onReportBug) {
        await this.props.onReportBug(this.state.error, this.state.errorInfo);
      } else {
        // Default implementation - could open an issue on GitHub or send to error service
        const errorReport = {
          message: this.state.error.message,
          stack: this.state.error.stack,
          componentStack: this.state.errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        };
        
        console.log('Error report:', errorReport);
        
        // In a real app, this would send to an error reporting service
        setTimeout(() => {
          alert('Error report submitted. Thank you for helping us improve!');
        }, 1000);
      }
    } catch (reportError) {
      console.error('Failed to report error:', reportError);
    } finally {
      this.setState({ isReporting: false });
    }
  };

  handleGoHome = () => {
    if (this.props.onGoHome) {
      this.props.onGoHome();
    } else {
      // Default: navigate to home
      window.location.href = '/';
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo } = this.state;
      const showDetails = this.props.showErrorDetails || process.env.NODE_ENV === 'development';

      return (
        <ThemeProvider>
          <div className="min-h-screen bg-surface flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-surface-elevated border border-themed rounded-lg p-8 shadow-lg">
              {/* Error Icon */}
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              {/* Error Message */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-primary mb-2">
                  Oops! Something went wrong
                </h1>
                <p className="text-secondary">
                  We encountered an unexpected error. This is likely a temporary issue.
                </p>
              </div>

              {/* Error Details (Development/Debug Mode) */}
              {showDetails && error && (
                <details className="mb-6 p-4 bg-surface border border-themed rounded">
                  <summary className="cursor-pointer text-sm font-medium text-secondary hover:text-primary">
                    Error Details
                  </summary>
                  <div className="mt-2 text-xs text-muted font-mono">
                    <div className="mb-2">
                      <strong>Error:</strong> {error.message}
                    </div>
                    {error.stack && (
                      <div className="mb-2">
                        <strong>Stack:</strong>
                        <pre className="mt-1 whitespace-pre-wrap text-xs">{error.stack}</pre>
                      </div>
                    )}
                    {errorInfo?.componentStack && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="mt-1 whitespace-pre-wrap text-xs">{errorInfo.componentStack}</pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <AccessibleButton
                    onClick={this.handleRetry}
                    variant="primary"
                    className="w-full"
                    ariaLabel="Try again to recover from the error"
                  >
                    Try Again
                  </AccessibleButton>
                  
                  <AccessibleButton
                    onClick={this.handleReload}
                    variant="secondary"
                    className="w-full"
                    ariaLabel="Reload the page to start fresh"
                  >
                    Reload Page
                  </AccessibleButton>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <AccessibleButton
                    onClick={this.handleGoHome}
                    variant="ghost"
                    className="w-full"
                    ariaLabel="Go back to the home page"
                  >
                    Go Home
                  </AccessibleButton>
                  
                  <AccessibleButton
                    onClick={this.handleReportBug}
                    variant="ghost"
                    loading={this.state.isReporting}
                    className="w-full"
                    ariaLabel="Report this error to help us fix it"
                  >
                    {this.state.isReporting ? 'Reporting...' : 'Report Bug'}
                  </AccessibleButton>
                </div>
              </div>

              {/* Additional Help */}
              <div className="mt-6 pt-6 border-t border-themed text-center">
                <p className="text-sm text-muted">
                  If this problem persists, please contact support with the error details above.
                </p>
              </div>
            </div>
          </div>
        </ThemeProvider>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
