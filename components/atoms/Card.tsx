import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  variant = 'default',
  onClick,
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200';
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const variantClasses = {
    default: 'bg-gray-700/50 border border-gray-600/50',
    elevated: 'bg-gray-700 shadow-lg border border-gray-600/30',
    outlined: 'bg-transparent border-2 border-gray-600',
  };
  
  const interactiveClasses = onClick ? 'cursor-pointer hover:bg-gray-700/70 hover:border-gray-500/50' : '';
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${variantClasses[variant]} ${interactiveClasses} ${className}`;
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;

