import React from 'react';
import { Vehicle } from '../../types';

interface FleetResponseProps {
  fleet: Vehicle[];
  onVehicleClick: (vehicle: Vehicle) => void;
  onBookService: (vehicle: Vehicle) => void;
}

const FleetResponse: React.FC<FleetResponseProps> = ({ 
  fleet, 
  onVehicleClick, 
  onBookService 
}) => {
  const getVehicleType = (model: string) => {
    if (model.includes('Sedan')) return 'Sedan';
    if (model.includes('SUV')) return 'SUV';
    if (model.includes('Apex')) return 'Sports Car';
    return 'Vehicle';
  };

  const getVehicleDescription = (model: string) => {
    if (model.includes('Sedan')) return 'Premium electric sedan with 320-mile range';
    if (model.includes('SUV')) return 'Versatile electric SUV with towing capability';
    if (model.includes('Apex')) return 'High-performance electric sports car';
    return 'Electric vehicle with advanced technology';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Your Vehicle Fleet</h2>
        <p className="text-gray-400">
          You have <span className="font-semibold text-blue-400">{fleet.length}</span> vehicle{fleet.length !== 1 ? 's' : ''} in your fleet
        </p>
      </div>

      {/* Fleet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fleet.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-gray-600 hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => onVehicleClick(vehicle)}
          >
            {/* Vehicle Image */}
            <div className="relative mb-4">
              <img
                src={vehicle.imageUrl}
                alt={vehicle.model}
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center';
                }}
              />
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Active
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="space-y-2">
              <h3 className="font-semibold text-white text-lg">{vehicle.model}</h3>
              <p className="text-sm text-gray-400">{getVehicleType(vehicle.model)}</p>
              <p className="text-xs text-gray-500">{vehicle.vin}</p>
              <p className="text-sm text-gray-300">{getVehicleDescription(vehicle.model)}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onVehicleClick(vehicle);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors"
              >
                View Details
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBookService(vehicle);
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm py-2 px-3 rounded-lg transition-colors"
              >
                Book Service
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="text-center pt-4">
        <p className="text-gray-400 text-sm mb-4">What would you like to do next?</p>
        <div className="flex flex-wrap justify-center gap-2">
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Add Vehicle
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Fleet Analytics
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Service History
          </button>
        </div>
      </div>
    </div>
  );
};

export default FleetResponse;



