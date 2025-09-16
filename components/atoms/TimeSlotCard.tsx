import React from 'react';
import { TimeSlot } from '../../data/serviceTypes';

export interface TimeSlotCardProps {
  timeSlot: TimeSlot;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({
  timeSlot,
  selected = false,
  onClick,
  disabled = false,
  className = ''
}) => {
  const baseClasses = "relative p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500";
  const selectedClasses = selected ? "border-cyan-500 bg-cyan-500/10" : "border-gray-600 bg-gray-800 hover:border-gray-500";
  const disabledClasses = disabled || !timeSlot.available ? "opacity-50 cursor-not-allowed" : "";

  return (
    <div
      onClick={disabled || !timeSlot.available ? undefined : onClick}
      className={`${baseClasses} ${selectedClasses} ${disabledClasses} ${className}`}
      role="button"
      tabIndex={disabled || !timeSlot.available ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled || !timeSlot.available}
      style={{
        backgroundColor: selected ? 'rgba(6, 182, 212, 0.1)' : '#1f2937',
        border: selected ? '1px solid #06b6d4' : '1px solid #4b5563',
        borderRadius: '8px',
        padding: '12px'
      }}
    >
      {/* Time */}
      <div className="text-center">
        <div className="text-lg font-semibold text-white">{timeSlot.time}</div>
        <div className="text-xs text-gray-400">
          {timeSlot.available ? 'Available' : 'Unavailable'}
        </div>
      </div>

      {/* Unavailable Overlay */}
      {!timeSlot.available && (
        <div className="absolute inset-0 bg-gray-900/50 rounded-lg flex items-center justify-center">
          <span className="text-xs text-gray-500">Unavailable</span>
        </div>
      )}
    </div>
  );
};

export default TimeSlotCard;



