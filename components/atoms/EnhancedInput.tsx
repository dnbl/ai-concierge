import React from 'react';

export interface EnhancedInputProps {
  type?: 'text' | 'email' | 'tel' | 'date' | 'time' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

const EnhancedInput: React.FC<EnhancedInputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy
}) => {
  const baseClasses = "w-full bg-gray-800 border rounded-lg py-3 px-4 text-gray-100 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-600";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "hover:border-gray-500";

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      style={{ 
        backgroundColor: '#1f2937', 
        border: error ? '1px solid #ef4444' : '1px solid #4b5563',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px'
      }}
    />
  );
};

export default EnhancedInput;



