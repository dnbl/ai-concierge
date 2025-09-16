import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  metadata?: Record<string, any>;
}

export interface EnhancedSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  'aria-label'?: string;
}

const EnhancedSelect: React.FC<EnhancedSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  className = '',
  'aria-label': ariaLabel
}) => {
  const baseClasses = "w-full bg-gray-800 border rounded-lg py-3 px-4 text-gray-100 outline-none transition-all duration-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";
  const errorClasses = error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-600";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-500";

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`${baseClasses} ${errorClasses} ${disabledClasses} ${className}`}
      aria-label={ariaLabel}
      style={{ 
        backgroundColor: '#1f2937', 
        border: error ? '1px solid #ef4444' : '1px solid #4b5563',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px'
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option 
          key={option.value} 
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default EnhancedSelect;



