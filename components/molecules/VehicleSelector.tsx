import React from 'react';
import { Vehicle } from '../../types';
import VehicleCard from '../atoms/VehicleCard';
import EnhancedSelect from '../atoms/EnhancedSelect';
import FormField from '../atoms/FormField';

export interface VehicleSelectorProps {
  vehicles: Vehicle[];
  selectedVehicle?: Vehicle;
  onSelect: (vehicle: Vehicle) => void;
  error?: string;
  className?: string;
  variant?: 'cards' | 'dropdown';
}

const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  vehicles,
  selectedVehicle,
  onSelect,
  error,
  className = '',
  variant = 'cards'
}) => {
  const handleVehicleSelect = (vin: string) => {
    const vehicle = vehicles.find(v => v.vin === vin);
    if (vehicle) {
      onSelect(vehicle);
    }
  };

  if (variant === 'dropdown') {
    return (
      <FormField label="Vehicle" error={error} required>
        <EnhancedSelect
          value={selectedVehicle?.vin || ''}
          onChange={handleVehicleSelect}
          options={vehicles.map(vehicle => ({
            value: vehicle.vin,
            label: `${vehicle.model} - ${vehicle.vin}`,
            metadata: vehicle
          }))}
          placeholder="Choose your vehicle"
          error={!!error}
          aria-label="Select vehicle"
        />
      </FormField>
    );
  }

  return (
    <div className={`vehicle-selector ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Select Your Vehicle</h3>
      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      
      {vehicles.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-2">No vehicles found</p>
          <p className="text-sm text-gray-500">Please add a vehicle to your fleet first</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.vin}
              vehicle={vehicle}
              selected={selectedVehicle?.vin === vehicle.vin}
              onClick={() => onSelect(vehicle)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleSelector;



