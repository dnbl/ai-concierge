import React from 'react';
import { AccessibleButton } from './AccessibilityEnhancements';

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon,
  label,
  description,
  onClick,
  variant = 'secondary',
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const iconSizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <AccessibleButton
      onClick={onClick}
      variant={variant}
      size={size}
      disabled={disabled}
      className={`flex flex-col items-center justify-center text-center transition-all duration-200 hover:scale-105 focus:scale-105 ${sizeClasses[size]} ${className}`}
      aria-label={`${label}${description ? ` - ${description}` : ''}`}
      style={{ backgroundColor: '#374151', color: 'white', border: '1px solid #4b5563', borderRadius: '8px' }}
    >
      <div className={`${iconSizeClasses[size]} mb-2 text-cyan-400`} style={{ color: '#06b6d4' }}>
        {icon}
      </div>
      <div className="space-y-1">
        <div className="font-medium text-white text-sm" style={{ color: 'white', fontWeight: '500', fontSize: '0.875rem' }}>
          {label}
        </div>
        {description && (
          <div className="text-xs text-gray-400 leading-tight" style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
            {description}
          </div>
        )}
      </div>
    </AccessibleButton>
  );
};

export default QuickActionButton;
