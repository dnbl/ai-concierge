import React, { useState } from 'react';

interface AddVehicleFormProps {
    onAddVehicle: (data: { model: string; vin: string }) => void;
}

const AddVehicleForm: React.FC<AddVehicleFormProps> = ({ onAddVehicle }) => {
    const [submitted, setSubmitted] = useState(false);
    const [model, setModel] = useState('');
    const [vin, setVin] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddVehicle({ model, vin });
        setSubmitted(true);
    };

    if (submitted) {
        return (
             <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg text-white">
                <h3 className="font-bold mb-2 text-lg">Vehicle Added</h3>
                <p className="text-gray-300">The {model} has been successfully added to your fleet.</p>
            </div>
        )
    }

    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg">
            <h3 className="font-bold mb-4 text-white text-lg">Add a Vehicle to Your Fleet</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-300 mb-1">Vehicle Model</label>
                    <input type="text" id="model" value={model} onChange={e => setModel(e.target.value)} placeholder="e.g., IE-Apex" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                 <div>
                    <label htmlFor="vin_add" className="block text-sm font-medium text-gray-300 mb-1">Vehicle VIN</label>
                    <input type="text" id="vin_add" value={vin} onChange={e => setVin(e.target.value)} placeholder="Enter 17-digit VIN" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-100 font-mono placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-cyan-500 transition duration-200">
                    Add Vehicle
                </button>
            </form>
        </div>
    );
};

export default AddVehicleForm;