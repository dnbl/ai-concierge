import React from 'react';
import { ServiceType } from '../../data/serviceTypes';

export interface ServiceTypeCardProps {
  serviceType: ServiceType;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const ServiceTypeCard: React.FC<ServiceTypeCardProps> = ({
  serviceType,
  selected = false,
  onClick,
  disabled = false,
  className = ''
}) => {
  const baseClasses = "relative p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500";
  const selectedClasses = selected ? "border-cyan-500 bg-cyan-500/10" : "border-gray-600 bg-gray-800 hover:border-gray-500";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${selectedClasses} ${disabledClasses} ${className}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled}
      style={{
        backgroundColor: selected ? 'rgba(6, 182, 212, 0.1)' : '#1f2937',
        border: selected ? '1px solid #06b6d4' : '1px solid #4b5563',
        borderRadius: '8px',
        padding: '16px'
      }}
    >
      {/* Recommended Badge */}
      {serviceType.recommended && (
        <div className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          Recommended
        </div>
      )}

      {/* Service Icon */}
      <div className="text-2xl mb-3">{serviceType.icon}</div>

      {/* Service Name */}
      <h3 className="font-semibold text-white mb-2">{serviceType.name}</h3>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-3">{serviceType.description}</p>

      {/* Duration and Cost */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>⏱️ {serviceType.duration} min</span>
        <span>
          {serviceType.estimatedCost.min === 0 && serviceType.estimatedCost.max === 0 
            ? 'Free' 
            : `$${serviceType.estimatedCost.min}-${serviceType.estimatedCost.max}`
          }
        </span>
      </div>

      {/* Next Due Date */}
      {serviceType.nextDue && (
        <div className="mt-2 text-xs text-cyan-400">
          Due: {new Date(serviceType.nextDue).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default ServiceTypeCard;



