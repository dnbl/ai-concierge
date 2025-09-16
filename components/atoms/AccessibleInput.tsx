import React, { forwardRef, useRef, useState, useEffect } from 'react';
import { usePerformanceMonitoring } from '../../hooks/usePerformanceOptimization';

export interface AccessibleInputProps {
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'number' | 'password' | 'search';
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  successMessage?: string;
  helperText?: string;
  className?: string;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaRequired?: boolean;
  ariaInvalid?: boolean;
  testId?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

const AccessibleInput = forwardRef<HTMLInputElement, AccessibleInputProps>(({
  type = 'text',
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  successMessage,
  helperText,
  className = '',
  ariaLabel,
  ariaDescribedBy,
  ariaRequired,
  ariaInvalid,
  testId,
  autoComplete,
  autoFocus = false,
  maxLength,
  minLength,
  pattern,
}, ref) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = ref || internalRef;
  const [isFocused, setIsFocused] = useState(false);
  
  // Performance monitoring
  usePerformanceMonitoring('AccessibleInput');

  // Generate unique IDs for accessibility
  const inputId = useRef(`input-${Math.random().toString(36).substr(2, 9)}`);
  const errorId = useRef(`error-${inputId.current}`);
  const helperId = useRef(`helper-${inputId.current}`);
  const successId = useRef(`success-${inputId.current}`);

  useEffect(() => {
    if (autoFocus && inputRef && 'current' in inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus, inputRef]);

  const baseClasses = "w-full bg-gray-800 border rounded-lg py-3 px-4 text-gray-100 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";
  
  const stateClasses = (() => {
    if (error) return "border-red-500 focus:ring-red-500 focus:border-red-500";
    if (successMessage && !error) return "border-green-500 focus:ring-green-500 focus:border-green-500";
    if (isFocused) return "border-cyan-500 ring-2 ring-cyan-500";
    return "border-gray-600 hover:border-gray-500";
  })();
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Build aria-describedby list
  const describedByIds = [];
  if (ariaDescribedBy) describedByIds.push(ariaDescribedBy);
  if (helperText) describedByIds.push(helperId.current);
  if (errorMessage) describedByIds.push(errorId.current);
  if (successMessage) describedByIds.push(successId.current);

  return (
    <div className="space-y-1">
      <input
        ref={inputRef}
        id={inputId.current}
        type={type}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={classes}
        aria-label={ariaLabel}
        aria-describedby={describedByIds.length > 0 ? describedByIds.join(' ') : undefined}
        aria-required={ariaRequired ?? required}
        aria-invalid={ariaInvalid ?? error}
        data-testid={testId}
        autoComplete={autoComplete}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
      />
      
      {/* Helper Text */}
      {helperText && (
        <p 
          id={helperId.current}
          className="text-sm text-gray-400"
          role="note"
        >
          {helperText}
        </p>
      )}
      
      {/* Error Message */}
      {errorMessage && error && (
        <p 
          id={errorId.current}
          className="text-sm text-red-400 flex items-center gap-1"
          role="alert"
          aria-live="polite"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errorMessage}
        </p>
      )}
      
      {/* Success Message */}
      {successMessage && !error && (
        <p 
          id={successId.current}
          className="text-sm text-green-400 flex items-center gap-1"
          role="status"
          aria-live="polite"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {successMessage}
        </p>
      )}
    </div>
  );
});

AccessibleInput.displayName = 'AccessibleInput';

export default AccessibleInput;