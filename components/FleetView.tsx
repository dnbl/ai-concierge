import React from 'react';
import { Vehicle } from '../types';

interface FleetViewProps {
    vehicles: Vehicle[];
}

const FleetView: React.FC<FleetViewProps> = ({ vehicles }) => {
    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg">
            <h3 className="font-bold mb-4 text-white text-lg">Your Current Fleet</h3>
            <div className="space-y-3">
                {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="bg-gray-800/70 p-3 rounded-lg flex items-center gap-4">
                        <img src={vehicle.imageUrl} alt={vehicle.model} className="w-20 h-20 object-cover rounded-md bg-gray-600" />
                        <div>
                            <p className="font-bold text-white">{vehicle.model}</p>
                            <p className="text-xs text-gray-400 font-mono tracking-wider">{vehicle.vin}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FleetView;