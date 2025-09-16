import React from 'react';
import { ServiceType } from '../../data/serviceTypes';
import ServiceTypeCard from '../atoms/ServiceTypeCard';

export interface ServiceTypeSelectorProps {
  serviceTypes: ServiceType[];
  selectedServiceType?: ServiceType;
  onSelect: (serviceType: ServiceType) => void;
  className?: string;
}

const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({
  serviceTypes,
  selectedServiceType,
  onSelect,
  className = ''
}) => {
  return (
    <div className={`service-type-selector ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Select Service Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {serviceTypes.map((serviceType) => (
          <ServiceTypeCard
            key={serviceType.id}
            serviceType={serviceType}
            selected={selectedServiceType?.id === serviceType.id}
            onClick={() => onSelect(serviceType)}
            disabled={!serviceType.available}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceTypeSelector;



