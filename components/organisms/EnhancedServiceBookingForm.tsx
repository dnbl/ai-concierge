import React, { useState, useEffect } from 'react';
import { Vehicle, Dealer } from '../../types';
import { 
  ServiceType, 
  TimeSlot, 
  SERVICE_TYPES, 
  generateTimeSlots, 
  getServiceRecommendations 
} from '../../data/serviceTypes';

// Import molecules
import ServiceRecommendations from '../molecules/ServiceRecommendations';
import ServiceTypeSelector from '../molecules/ServiceTypeSelector';
import DealerSelector from '../molecules/DealerSelector';
import TimeSlotSelector from '../molecules/TimeSlotSelector';
import VehicleSelector from '../molecules/VehicleSelector';

// Import atoms
import FormField from '../atoms/FormField';
import EnhancedSelect from '../atoms/EnhancedSelect';
import EnhancedInput from '../atoms/EnhancedInput';

// Import organisms
import GenericFormWrapper, { FormStep } from './GenericFormWrapper';

export interface EnhancedServiceBookingFormProps {
  payload?: {
    vin?: string;
  };
  fleet: Vehicle[];
  dealers: Dealer[];
}

interface FormData {
  selectedVehicle: Vehicle | null;
  selectedServiceType: ServiceType | null;
  selectedDealer: Dealer | null;
  selectedTimeSlot: TimeSlot | null;
  selectedDate: string;
  notes: string;
}

const EnhancedServiceBookingForm: React.FC<EnhancedServiceBookingFormProps> = ({ 
  payload, 
  fleet, 
  dealers 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    selectedVehicle: null,
    selectedServiceType: null,
    selectedDealer: null,
    selectedTimeSlot: null,
    selectedDate: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [recommendations, setRecommendations] = useState<ServiceType[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handler functions
  const handleVehicleSelect = (vehicle: Vehicle) => {
    setFormData(prev => ({ ...prev, selectedVehicle: vehicle }));
  };

  const handleServiceTypeSelect = (serviceType: ServiceType) => {
    setFormData(prev => ({ ...prev, selectedServiceType: serviceType }));
  };

  const handleDealerSelect = (dealerId: string) => {
    const dealer = dealers.find(d => d.id === dealerId);
    if (dealer) {
      setFormData(prev => ({ ...prev, selectedDealer: dealer }));
    }
  };

  const handleTimeSlotSelect = (timeSlot: TimeSlot) => {
    setFormData(prev => ({ ...prev, selectedTimeSlot: timeSlot }));
  };

  // Define form steps
  const formSteps: FormStep[] = [
    {
      id: 'vehicle',
      title: 'Vehicle',
      component: (
        <VehicleSelector
          vehicles={fleet}
          selectedVehicle={formData.selectedVehicle || undefined}
          onSelect={handleVehicleSelect}
          variant="cards"
        />
      ),
      validation: () => formData.selectedVehicle !== null
    },
    {
      id: 'service',
      title: 'Service',
      component: (
        <div>
          {/* Service Recommendations */}
          {recommendations.length > 0 && (
            <ServiceRecommendations
              recommendations={recommendations.map(rec => ({
                serviceType: rec,
                reason: 'Based on your vehicle maintenance schedule',
                urgency: 'medium' as const
              }))}
              onSelectRecommendation={(rec) => handleServiceTypeSelect(rec.serviceType)}
              className="mb-6"
            />
          )}

          <ServiceTypeSelector
            serviceTypes={SERVICE_TYPES}
            selectedServiceType={formData.selectedServiceType || undefined}
            onSelect={handleServiceTypeSelect}
          />
        </div>
      ),
      validation: () => formData.selectedServiceType !== null
    },
    {
      id: 'dealer',
      title: 'Dealer',
      component: (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Choose Service Location</h3>
          <DealerSelector
            dealers={dealers}
            selectedDealerId={formData.selectedDealer?.id}
            onSelect={handleDealerSelect}
          />
        </div>
      ),
      validation: () => formData.selectedDealer !== null
    },
    {
      id: 'time',
      title: 'Time',
      component: (
        <div>
          <div className="mb-6">
            <FormField label="Preferred Date" required>
              <EnhancedInput
                type="date"
                value={formData.selectedDate}
                onChange={(date) => setFormData(prev => ({ ...prev, selectedDate: date }))}
                aria-label="Select preferred date"
              />
            </FormField>
          </div>
          <TimeSlotSelector
            timeSlots={availableTimeSlots}
            selectedTimeSlot={formData.selectedTimeSlot || undefined}
            onSelect={handleTimeSlotSelect}
          />
        </div>
      ),
      validation: () => formData.selectedTimeSlot !== null
    },
    {
      id: 'confirm',
      title: 'Confirm',
      component: (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Confirm Your Appointment</h3>
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h4 className="font-semibold mb-4">Appointment Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Vehicle:</span>
                <span className="text-white">{formData.selectedVehicle?.model} ({formData.selectedVehicle?.vin})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Service:</span>
                <span className="text-white">{formData.selectedServiceType?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location:</span>
                <span className="text-white">{formData.selectedDealer?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Date & Time:</span>
                <span className="text-white">{formData.selectedTimeSlot?.date} at {formData.selectedTimeSlot?.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white">{formData.selectedServiceType?.duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Cost:</span>
                <span className="text-white">
                  {formData.selectedServiceType?.estimatedCost.min === 0 && formData.selectedServiceType?.estimatedCost.max === 0 
                    ? 'Free' 
                    : `$${formData.selectedServiceType?.estimatedCost.min}-${formData.selectedServiceType?.estimatedCost.max}`
                  }
                </span>
              </div>
            </div>
          </div>

          <FormField label="Additional Notes (Optional)">
            <EnhancedInput
              type="text"
              value={formData.notes}
              onChange={(notes) => setFormData(prev => ({ ...prev, notes }))}
              placeholder="Any special requests or notes for the service team"
              aria-label="Additional notes"
            />
          </FormField>
        </div>
      ),
      validation: () => true
    }
  ];

  // Initialize form with smart defaults
  useEffect(() => {
    if (fleet.length > 0) {
      const defaultVehicle = payload?.vin 
        ? fleet.find(v => v.vin === payload.vin) || fleet[0]
        : fleet[0];
      
      setFormData(prev => ({ ...prev, selectedVehicle: defaultVehicle }));
      
      // Get service recommendations for the selected vehicle
      if (defaultVehicle) {
        const serviceRecs = getServiceRecommendations(defaultVehicle.vin);
        setRecommendations(serviceRecs.map(rec => rec.serviceType));
      }
    }

    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setFormData(prev => ({ 
      ...prev, 
      selectedDate: tomorrow.toISOString().split('T')[0] 
    }));

    // Auto-select nearest dealer if available
    if (dealers.length > 0) {
      const nearestDealer = dealers.reduce((closest, dealer) => {
        const closestDistance = parseFloat(closest.distance.replace(' miles', ''));
        const currentDistance = parseFloat(dealer.distance.replace(' miles', ''));
        return currentDistance < closestDistance ? dealer : closest;
      });
      setFormData(prev => ({ ...prev, selectedDealer: nearestDealer }));
    }
  }, [fleet, dealers, payload?.vin]);

  // Update time slots when dealer or date changes
  useEffect(() => {
    if (formData.selectedDealer && formData.selectedDate) {
      const slots = generateTimeSlots(formData.selectedDealer.id, formData.selectedDate);
      setAvailableTimeSlots(slots);
    }
  }, [formData.selectedDealer, formData.selectedDate]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const canProceedToNextStep = () => {
    const currentStepData = formSteps[currentStep - 1];
    return currentStepData?.validation ? currentStepData.validation() : true;
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleNext = () => {
    if (canProceedToNextStep() && currentStep < formSteps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gray-700 text-white">
        <div className="text-center">
          {/* Success Animation */}
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 className="text-2xl font-bold mb-3 text-green-400">Appointment Confirmed!</h3>
          <p className="text-gray-300 mb-6 text-lg">
            Your {formData.selectedServiceType?.name} appointment has been successfully scheduled.
          </p>
          
          {/* Appointment Summary Card */}
          <div className="bg-gray-800 rounded-xl p-6 text-left border border-gray-600">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">{formData.selectedServiceType?.icon}</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg">{formData.selectedServiceType?.name}</h4>
                <p className="text-sm text-gray-400">{formData.selectedVehicle?.model}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Date & Time:</span>
                  <span className="text-white font-medium">{formData.selectedTimeSlot?.date} at {formData.selectedTimeSlot?.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{formData.selectedServiceType?.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white">{formData.selectedDealer?.name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle:</span>
                  <span className="text-white font-mono text-xs">{formData.selectedVehicle?.vin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Estimated Cost:</span>
                  <span className="text-white font-semibold">
                    {formData.selectedServiceType?.estimatedCost.min === 0 && formData.selectedServiceType?.estimatedCost.max === 0 
                      ? 'Free' 
                      : `$${formData.selectedServiceType?.estimatedCost.min}-${formData.selectedServiceType?.estimatedCost.max}`
                    }
                  </span>
                </div>
              </div>
            </div>
            
            {formData.notes && (
              <div className="mt-4 pt-4 border-t border-gray-600">
                <span className="text-gray-400 text-sm">Notes: </span>
                <span className="text-white text-sm">{formData.notes}</span>
              </div>
            )}
          </div>
          
          {/* Next Steps */}
          <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <h5 className="font-semibold text-cyan-400 mb-2">What's Next?</h5>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• You'll receive a confirmation email shortly</li>
              <li>• The service center will contact you 24 hours before your appointment</li>
              <li>• Please arrive 15 minutes early for check-in</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <GenericFormWrapper
      title="Service Appointment Booking"
      subtitle="I'll help you book a service appointment for your vehicle!"
      steps={formSteps}
      currentStep={currentStep}
      onStepChange={handleStepChange}
      onSubmit={handleSubmit}
      onPrevious={handlePrevious}
      onNext={handleNext}
      canProceed={canProceedToNextStep()}
      isSubmitting={isSubmitting}
    />
  );
};

export default EnhancedServiceBookingForm;
