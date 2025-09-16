import React from 'react';
import { ServiceRecord } from '../types';

interface ServiceHistoryViewProps {
    history: ServiceRecord[];
    vin: string;
}

const ServiceHistoryView: React.FC<ServiceHistoryViewProps> = ({ history, vin }) => {
    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg">
            <h3 className="font-bold mb-1 text-white text-lg">Service History</h3>
            <p className="text-xs text-gray-400 font-mono mb-4">VIN: {vin}</p>
            <div className="space-y-3">
                {history.map(record => (
                    <div key={record.id} className="bg-gray-800/70 p-3 rounded-lg text-sm">
                        <div className="flex justify-between items-center mb-1">
                            <p className="font-bold text-white">{record.service}</p>
                            <p className="font-mono text-gray-300">${record.cost.toFixed(2)}</p>
                        </div>
                        <p className="text-xs text-gray-400 mb-2">{new Date(record.date).toLocaleDateString()}</p>
                        <p className="text-gray-300 text-xs italic">Notes: "{record.notes}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceHistoryView;
