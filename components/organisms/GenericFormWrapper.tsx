import React from 'react';

export interface FormStep {
  id: string;
  title: string;
  component: React.ReactNode;
  validation?: () => boolean;
}

export interface GenericFormWrapperProps {
  title: string;
  subtitle?: string;
  steps: FormStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onPrevious: () => void;
  onNext: () => void;
  canProceed: boolean;
  isSubmitting?: boolean;
  className?: string;
}

const GenericFormWrapper: React.FC<GenericFormWrapperProps> = ({
  title,
  subtitle,
  steps,
  currentStep,
  onStepChange,
  onSubmit,
  onPrevious,
  onNext,
  canProceed,
  isSubmitting = false,
  className = ''
}) => {
  const stepLabels = steps.map(step => step.title);

  return (
    <div className={`generic-form-wrapper max-w-4xl mx-auto p-6 rounded-2xl bg-gray-700 text-white ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">{title}</h2>
        {subtitle && <p className="text-gray-300">{subtitle}</p>}
      </div>

      {/* Progress Indicator */}
      <div className="form-progress mb-8">
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
            Step {currentStep} of {steps.length}: {stepLabels[currentStep - 1]}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="min-h-[400px]">
        {steps[currentStep - 1]?.component}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrevious}
          disabled={currentStep === 1}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{
            backgroundColor: currentStep === 1 ? '#4b5563' : '#4b5563',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '8px'
          }}
        >
          Previous
        </button>

        {currentStep < steps.length ? (
          <button
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{
              backgroundColor: canProceed ? '#06b6d4' : '#4b5563',
              color: 'white',
              padding: '8px 24px',
              borderRadius: '8px'
            }}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canProceed || isSubmitting}
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center min-w-[120px]"
            style={{
              backgroundColor: canProceed && !isSubmitting ? '#10b981' : '#4b5563',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Confirm Booking'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default GenericFormWrapper;
