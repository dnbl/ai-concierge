import React, { useState } from 'react';
import { Vehicle, Dealer } from '../types';

interface ServiceBookingFormProps {
    payload?: {
        vin?: string;
    };
    fleet: Vehicle[];
    dealers: Dealer[];
}

const ServiceBookingForm: React.FC<ServiceBookingFormProps> = ({ payload, fleet, dealers }) => {
    const [submitted, setSubmitted] = useState(false);
    const [selectedVin, setSelectedVin] = useState(payload?.vin || (fleet.length > 0 ? fleet[0].vin : ''));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg text-white">
                <h3 className="font-bold mb-2 text-lg">Service Booked</h3>
                <p className="text-gray-300">Your service appointment for vehicle <span className="font-mono text-cyan-300">{selectedVin}</span> has been confirmed. We look forward to seeing you.</p>
            </div>
        )
    }

    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg">
            <h3 className="font-bold mb-4 text-white text-lg">Book a Service Appointment</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label htmlFor="vin" className="block text-sm font-medium text-gray-300 mb-1">Select Vehicle</label>
                    <select
                        id="vin"
                        value={selectedVin}
                        onChange={(e) => setSelectedVin(e.target.value)}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        {fleet.map(v => <option key={v.vin} value={v.vin}>{v.model} - {v.vin}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="dealer" className="block text-sm font-medium text-gray-300 mb-1">Preferred Dealer</label>
                    <select
                        id="dealer"
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        {dealers.map(d => <option key={d.id} value={d.id}>{d.name} - {d.location}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Preferred Date</label>
                    <input type="date" id="date" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-cyan-500 transition duration-200">
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default ServiceBookingForm;
