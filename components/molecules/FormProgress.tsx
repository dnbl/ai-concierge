import React from 'react';

export interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  className?: string;
}

const FormProgress: React.FC<FormProgressProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
  className = ''
}) => {
  return (
    <div className={`form-progress ${className}`}>
      <div className="flex items-center justify-between mb-4">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex items-center">
              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  isCompleted
                    ? 'bg-cyan-500 text-white'
                    : isCurrent
                    ? 'bg-cyan-500 text-white ring-2 ring-cyan-500 ring-offset-2 ring-offset-gray-800'
                    : 'bg-gray-700 text-gray-400'
                }`}
                style={{
                  backgroundColor: isCompleted || isCurrent ? '#06b6d4' : '#374151',
                  color: isCompleted || isCurrent ? 'white' : '#9ca3af'
                }}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>

              {/* Step Label */}
              <div className="ml-2 hidden sm:block">
                <div
                  className={`text-sm font-medium ${
                    isCurrent ? 'text-white' : isCompleted ? 'text-cyan-400' : 'text-gray-400'
                  }`}
                  style={{
                    color: isCurrent ? 'white' : isCompleted ? '#06b6d4' : '#9ca3af'
                  }}
                >
                  {label}
                </div>
              </div>

              {/* Connector Line */}
              {index < stepLabels.length - 1 && (
                <div
                  className={`w-8 h-0.5 mx-2 ${
                    isCompleted ? 'bg-cyan-500' : 'bg-gray-700'
                  }`}
                  style={{
                    backgroundColor: isCompleted ? '#06b6d4' : '#374151'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step Label (Mobile) */}
      <div className="sm:hidden text-center">
        <div className="text-sm font-medium text-white">
          Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
        </div>
      </div>
    </div>
  );
};

export default FormProgress;



