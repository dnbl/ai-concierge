import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import AccessibleButton from './AccessibleButton';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Helper functions for common toast types
export const useToastHelpers = () => {
  const { showToast } = useToast();

  return {
    success: (title: string, message?: string, action?: Toast['action']) =>
      showToast({ type: 'success', title, message, action }),
    error: (title: string, message?: string, action?: Toast['action']) =>
      showToast({ type: 'error', title, message, action, duration: 0 }), // Don't auto-hide errors
    warning: (title: string, message?: string, action?: Toast['action']) =>
      showToast({ type: 'warning', title, message, action }),
    info: (title: string, message?: string, action?: Toast['action']) =>
      showToast({ type: 'info', title, message, action }),
  };
};

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  maxToasts = 5 
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000,
      ...toast
    };

    setToasts(prev => {
      // Remove oldest toasts if we exceed the limit
      const updatedToasts = [...prev, newToast];
      return updatedToasts.slice(-maxToasts);
    });

    // Auto-hide toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        hideToast(id);
      }, newToast.duration);
    }
  }, [maxToasts]);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast, clearAllToasts }}>
      {children}
      <ToastContainer toasts={toasts} onHide={hideToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onHide: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onHide }) => {
  return (
    <div 
      className="fixed top-4 right-4 z-50 space-y-2"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onHide={onHide} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onHide: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onHide }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const getToastStyles = (type: Toast['type']) => {
    const isDark = theme === 'dark';
    
    switch (type) {
      case 'success':
        return isDark 
          ? 'bg-green-800 border-green-600 text-green-100' 
          : 'bg-green-500 border-green-400 text-white';
      case 'error':
        return isDark 
          ? 'bg-red-800 border-red-600 text-red-100' 
          : 'bg-red-500 border-red-400 text-white';
      case 'warning':
        return isDark 
          ? 'bg-yellow-800 border-yellow-600 text-yellow-100' 
          : 'bg-yellow-500 border-yellow-400 text-white';
      case 'info':
      default:
        return isDark 
          ? 'bg-blue-800 border-blue-600 text-blue-100' 
          : 'bg-blue-500 border-blue-400 text-white';
    }
  };

  const getIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const handleActionClick = () => {
    if (toast.action) {
      toast.action.onClick();
      onHide(toast.id);
    }
  };

  return (
    <div
      className={`
        max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getToastStyles(toast.type)}
      `}
      role="alert"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
      aria-describedby={toast.message ? `toast-message-${toast.id}` : undefined}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon(toast.type)}
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium">
              {toast.title}
            </p>
            {toast.message && (
              <p 
                id={`toast-message-${toast.id}`}
                className="mt-1 text-sm opacity-90"
              >
                {toast.message}
              </p>
            )}
            {toast.action && (
              <div className="mt-3">
                <AccessibleButton
                  size="sm"
                  variant="ghost"
                  onClick={handleActionClick}
                  className="text-current hover:bg-white/10 border border-current"
                >
                  {toast.action.label}
                </AccessibleButton>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="
                bg-white/10 rounded-md inline-flex p-1.5 
                hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
                transition-colors duration-200
              "
              onClick={() => onHide(toast.id)}
              aria-label={`Dismiss ${toast.type} notification`}
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastItem;



