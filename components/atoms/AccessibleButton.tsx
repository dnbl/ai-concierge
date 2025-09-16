import React, { forwardRef, useRef } from 'react';
import { usePerformanceMonitoring } from '../../hooks/usePerformanceOptimization';

export interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
  tabIndex?: number;
  role?: string;
  testId?: string;
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  ariaLabel,
  ariaDescribedBy,
  ariaExpanded,
  ariaPressed,
  tabIndex,
  role,
  testId,
}, ref) => {
  const internalRef = useRef<HTMLButtonElement>(null);
  const buttonRef = ref || internalRef;
  
  // Performance monitoring
  usePerformanceMonitoring('AccessibleButton');

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed relative';
  
  const variantClasses = {
    primary: 'bg-cyan-600 hover:bg-cyan-700 text-white focus:ring-cyan-500 active:bg-cyan-800',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500 active:bg-gray-800',
    outline: 'border border-cyan-600 text-cyan-400 hover:bg-cyan-600 hover:text-white focus:ring-cyan-500 active:bg-cyan-700',
    ghost: 'text-cyan-400 hover:bg-cyan-600/20 hover:text-cyan-300 focus:ring-cyan-500 active:bg-cyan-600/30',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 active:bg-red-800',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-sm min-h-[40px]',
    lg: 'px-6 py-3 text-base min-h-[48px]',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    // Enhanced keyboard support
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled || loading}
      className={classes}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      tabIndex={tabIndex}
      role={role}
      data-testid={testId}
    >
      {loading && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
});

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;