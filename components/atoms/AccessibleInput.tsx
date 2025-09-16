import React, { forwardRef } from 'react';

interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'default' | 'dark';
  fullWidth?: boolean;
  showLabel?: boolean;
}

const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(({
  label,
  error,
  helpText,
  variant = 'default',
  fullWidth = false,
  showLabel = true,
  className = '',
  id,
  ...props
}, ref) => {
  // Generate unique id if not provided
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helpId = helpText ? `${inputId}-help` : undefined;

  const baseClasses = `
    px-3 py-2 border rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    default: `
      bg-white border-gray-300 text-gray-900
      focus:border-blue-500 focus:ring-blue-500 focus:ring-offset-white
      placeholder-gray-400
    `,
    dark: `
      bg-gray-800 border-gray-600 text-white
      focus:border-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900
      placeholder-gray-400
    `
  };

  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';
  
  const widthClasses = fullWidth ? 'w-full' : '';

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${errorClasses}
    ${widthClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && showLabel && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium mb-1 ${
            variant === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={inputId}
        className={combinedClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={[errorId, helpId].filter(Boolean).join(' ') || undefined}
        {...props}
      />
      
      {helpText && (
        <p 
          id={helpId}
          className={`mt-1 text-sm ${
            variant === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {helpText}
        </p>
      )}
      
      {error && (
        <p 
          id={errorId}
          role="alert"
          className="mt-1 text-sm text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
});

AccessibleInput.displayName = 'AccessibleInput';

export default AccessibleInput;