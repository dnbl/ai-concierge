import React from 'react';

// Skeleton Loader Component
export const SkeletonLoader: React.FC<{ className?: string; lines?: number }> = ({ 
  className = '', 
  lines = 1 
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-700 rounded mb-2 last:mb-0"
          style={{
            width: `${Math.random() * 40 + 60}%`,
            animationDelay: `${index * 100}ms`
          }}
        />
      ))}
    </div>
  );
};

// Spinner Loader Component
export const SpinnerLoader: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${className}`}>
      <svg
        className="w-full h-full text-cyan-500"
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
    </div>
  );
};

// Progress Loader Component
export const ProgressLoader: React.FC<{ 
  progress: number; 
  className?: string;
  showPercentage?: boolean;
}> = ({ progress, className = '', showPercentage = false }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Loading...</span>
        {showPercentage && (
          <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-cyan-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

// Shimmer Loader Component
export const ShimmerLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
    </div>
  );
};

// Message Loading Component
export const MessageLoading: React.FC = () => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
      <div className="flex-1 space-y-2">
        <SkeletonLoader lines={2} className="w-3/4" />
        <SkeletonLoader lines={1} className="w-1/2" />
      </div>
    </div>
  );
};

// Card Loading Component
export const CardLoading: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-gray-700 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-600 rounded animate-pulse" />
        <div className="flex-1">
          <SkeletonLoader lines={1} className="w-1/3" />
        </div>
      </div>
      <SkeletonLoader lines={3} />
    </div>
  );
};

// Button Loading Component
export const ButtonLoading: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <SpinnerLoader size="sm" />
      <span className="text-sm">Loading...</span>
    </div>
  );
};

export default {
  SkeletonLoader,
  SpinnerLoader,
  ProgressLoader,
  ShimmerLoader,
  MessageLoading,
  CardLoading,
  ButtonLoading
};



