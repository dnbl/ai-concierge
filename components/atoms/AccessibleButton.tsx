import React, { forwardRef } from 'react';

interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
  describedBy?: string;
}

const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  ariaLabel,
  describedBy,
  disabled,
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900
    transition-all duration-200 ease-in-out
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    ghost: 'bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      ref={ref}
      className={combinedClasses}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={describedBy}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

AccessibleButton.displayName = 'AccessibleButton';

export default AccessibleButton;