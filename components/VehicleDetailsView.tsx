import React from 'react';
import { VehicleDetails } from '../types';

interface VehicleDetailsViewProps {
    details: VehicleDetails;
}

const DetailItem: React.FC<{label: string; value: string | number; unit?: string}> = ({label, value, unit}) => (
    <div className="bg-gray-800/70 p-3 rounded-md">
        <p className="text-xs text-cyan-300">{label}</p>
        <p className="text-lg font-semibold text-white">
            {value}
            {unit && <span className="text-sm font-normal text-gray-400 ml-1">{unit}</span>}
        </p>
    </div>
);


const VehicleDetailsView: React.FC<VehicleDetailsViewProps> = ({ details }) => {
    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg">
            <div className="flex items-center gap-4 mb-4">
                <img src={details.imageUrl} alt={details.model} className="w-24 h-24 object-cover rounded-lg bg-gray-600" />
                <div>
                    <h3 className="font-bold text-white text-xl">{details.model}</h3>
                    <p className="text-xs text-gray-400 font-mono tracking-wider">{details.vin}</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <DetailItem label="Software Version" value={details.softwareVersion} />
                <DetailItem label="Est. Range" value={details.range.estimate} unit={details.range.unit} />
                <DetailItem label="Battery Health" value={`${details.battery.health}%`} />
                <DetailItem label="Warranty Expires" value={new Date(details.warranty.expires).toLocaleDateString()} />
            </div>
        </div>
    );
};

export default VehicleDetailsView;
