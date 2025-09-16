import React from 'react';
import { useHighContrastMode, useReducedMotion, AccessibleButton, ScreenReaderOnly } from './AccessibilityEnhancements';

interface AccessibilityDemoProps {
  className?: string;
}

const AccessibilityDemo: React.FC<AccessibilityDemoProps> = ({ className = '' }) => {
  const isHighContrast = useHighContrastMode();
  const prefersReducedMotion = useReducedMotion();

  const handleDemoAction = (feature: string) => {
    console.log(`${feature} demo activated`);
  };

  return (
    <div className={`accessibility-demo p-6 bg-gray-800 rounded-lg border border-gray-700 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">
        Accessibility Features Demo
      </h3>
      
      {/* High Contrast Mode Indicator */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <div 
            className={`w-4 h-4 rounded-full ${
              isHighContrast ? 'bg-yellow-400' : 'bg-gray-600'
            }`}
            role="img"
            aria-label={isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled'}
          />
          <span className="text-gray-300">
            High Contrast Mode: {isHighContrast ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        <ScreenReaderOnly>
          {isHighContrast ? 
            'High contrast mode is currently enabled for better visibility' : 
            'High contrast mode is currently disabled'
          }
        </ScreenReaderOnly>
      </div>

      {/* Reduced Motion Indicator */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div 
            className={`w-4 h-4 rounded-full ${
              prefersReducedMotion ? 'bg-blue-400' : 'bg-gray-600'
            }`}
            role="img"
            aria-label={prefersReducedMotion ? 'Reduced motion enabled' : 'Reduced motion disabled'}
          />
          <span className="text-gray-300">
            Reduced Motion: {prefersReducedMotion ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        <ScreenReaderOnly>
          {prefersReducedMotion ? 
            'Reduced motion preferences detected - animations will be minimized' : 
            'Normal motion preferences detected'
          }
        </ScreenReaderOnly>
      </div>

      {/* Demo Animation */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-400 mb-2">
          Animation Demo (respects motion preferences)
        </h4>
        <div 
          className={`w-12 h-12 bg-cyan-500 rounded-lg ${
            prefersReducedMotion 
              ? 'transition-none' 
              : 'animate-pulse transition-all duration-1000 hover:animate-spin'
          }`}
          role="img"
          aria-label="Animation demonstration box"
        />
        <p className="text-xs text-gray-500 mt-2">
          {prefersReducedMotion 
            ? 'Animation disabled due to motion preferences' 
            : 'Hover to see animation (disabled if motion reduced)'
          }
        </p>
      </div>

      {/* Accessible Buttons Demo */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-400">
          Accessible Button Examples
        </h4>
        
        <div className="flex flex-wrap gap-3">
          <AccessibleButton
            variant="primary"
            onClick={() => handleDemoAction('Primary Button')}
            aria-describedby="primary-btn-desc"
          >
            Primary Action
          </AccessibleButton>
          <div id="primary-btn-desc" className="sr-only">
            Primary button with full keyboard support and focus management
          </div>

          <AccessibleButton
            variant="secondary"
            onClick={() => handleDemoAction('Secondary Button')}
            aria-describedby="secondary-btn-desc"
          >
            Secondary Action
          </AccessibleButton>
          <div id="secondary-btn-desc" className="sr-only">
            Secondary button with accessibility features
          </div>

          <AccessibleButton
            variant="ghost"
            onClick={() => handleDemoAction('Ghost Button')}
            disabled
            aria-describedby="ghost-btn-desc"
          >
            Disabled Action
          </AccessibleButton>
          <div id="ghost-btn-desc" className="sr-only">
            Disabled button showing proper disabled state handling
          </div>
        </div>
      </div>

      {/* High Contrast Styling */}
      {isHighContrast && (
        <style dangerouslySetInnerHTML={{
          __html: `
            .accessibility-demo {
              border: 2px solid #ffffff !important;
              background: #000000 !important;
              color: #ffffff !important;
            }
            
            .accessibility-demo h3,
            .accessibility-demo h4,
            .accessibility-demo span,
            .accessibility-demo p {
              color: #ffffff !important;
              text-shadow: none !important;
            }
          `
        }} />
      )}
    </div>
  );
};

export default AccessibilityDemo;