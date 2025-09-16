export interface ServiceType {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: number; // in minutes
  estimatedCost: {
    min: number;
    max: number;
  };
  recommended: boolean;
  nextDue?: string;
  available: boolean;
  category: 'maintenance' | 'software' | 'battery' | 'repair' | 'inspection';
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  duration: number;
  date: string;
  dealerId: string;
}

export interface ServiceRecommendation {
  serviceType: ServiceType;
  reason: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  nextDue?: string;
}

export const SERVICE_TYPES: ServiceType[] = [
  {
    id: 'routine-maintenance',
    name: 'Routine Maintenance',
    description: 'Oil changes, tire rotation, inspections',
    icon: '🔧',
    duration: 120,
    estimatedCost: { min: 150, max: 300 },
    recommended: true,
    nextDue: '2024-02-15',
    available: true,
    category: 'maintenance'
  },
  {
    id: 'software-update',
    name: 'Software Update',
    description: 'Latest system improvements and features',
    icon: '💻',
    duration: 60,
    estimatedCost: { min: 0, max: 0 },
    recommended: false,
    available: true,
    category: 'software'
  },
  {
    id: 'battery-service',
    name: 'Battery Health Check',
    description: 'Health checks and optimization',
    icon: '🔋',
    duration: 90,
    estimatedCost: { min: 100, max: 200 },
    recommended: true,
    nextDue: '2024-01-20',
    available: true,
    category: 'battery'
  },
  {
    id: 'repair-service',
    name: 'Repair Services',
    description: 'Diagnostic and repair work',
    icon: '🛠️',
    duration: 180,
    estimatedCost: { min: 200, max: 800 },
    recommended: false,
    available: true,
    category: 'repair'
  },
  {
    id: 'safety-inspection',
    name: 'Safety Inspection',
    description: 'Comprehensive safety and compliance check',
    icon: '✅',
    duration: 60,
    estimatedCost: { min: 80, max: 150 },
    recommended: false,
    available: true,
    category: 'inspection'
  }
];

export const generateTimeSlots = (dealerId: string, date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 17;
  const slotDuration = 30; // 30-minute slots
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += slotDuration) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push({
        id: `${dealerId}-${date}-${timeString}`,
        time: timeString,
        available: Math.random() > 0.3, // 70% availability for demo
        duration: slotDuration,
        date,
        dealerId
      });
    }
  }
  
  return slots;
};

export const getServiceRecommendations = (vin: string): ServiceRecommendation[] => {
  return [
    {
      serviceType: SERVICE_TYPES[0], // Routine Maintenance
      reason: 'Based on your mileage and last service date',
      urgency: 'medium',
      nextDue: '2024-02-15'
    },
    {
      serviceType: SERVICE_TYPES[2], // Battery Service
      reason: 'Battery health is at 85% - recommended for optimal performance',
      urgency: 'low',
      nextDue: '2024-01-20'
    }
  ];
};



