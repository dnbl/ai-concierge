import React from 'react';
import { Vehicle } from '../../types';

export interface VehicleCardProps {
  vehicle: Vehicle;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
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
      {/* Vehicle Image */}
      <div className="w-full h-24 mb-3 rounded-lg overflow-hidden bg-gray-700">
        <img 
          src={vehicle.imageUrl} 
          alt={vehicle.model}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden w-full h-full flex items-center justify-center text-gray-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="text-center">
        <h3 className="font-semibold text-white mb-1">{vehicle.model}</h3>
        <p className="text-xs text-gray-400 font-mono">{vehicle.vin}</p>
      </div>

      {/* Selection Indicator */}
      {selected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;



