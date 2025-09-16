import React from 'react';
import { TimeSlot } from '../../data/serviceTypes';
import TimeSlotCard from '../atoms/TimeSlotCard';

export interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot?: TimeSlot;
  onSelect: (timeSlot: TimeSlot) => void;
  className?: string;
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  timeSlots,
  selectedTimeSlot,
  onSelect,
  className = ''
}) => {
  // Group time slots by date
  const groupedSlots = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className={`time-slot-selector ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Available Time Slots</h3>
      
      {Object.entries(groupedSlots).map(([date, slots]) => (
        <div key={date} className="mb-6">
          <h4 className="text-md font-medium text-gray-300 mb-3">
            {formatDate(date)}
          </h4>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {slots.map((slot) => (
              <TimeSlotCard
                key={slot.id}
                timeSlot={slot}
                selected={selectedTimeSlot?.id === slot.id}
                onClick={() => onSelect(slot)}
              />
            ))}
          </div>
        </div>
      ))}

      {timeSlots.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No available time slots found</p>
          <p className="text-sm text-gray-500 mt-1">Please try selecting a different date or dealer</p>
        </div>
      )}
    </div>
  );
};

export default TimeSlotSelector;



