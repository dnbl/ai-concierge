import React, { useState } from 'react';
import { Dealer } from '../types';

interface TestDriveBookingFormProps {
    payload?: {
        model?: string;
    };
    dealers: Dealer[];
}

const TestDriveBookingForm: React.FC<TestDriveBookingFormProps> = ({ payload, dealers }) => {
    const [submitted, setSubmitted] = useState(false);
    const [selectedModel, setSelectedModel] = useState(payload?.model || 'IE-Sedan');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
             <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg text-white">
                <h3 className="font-bold mb-2 text-lg">Test Drive Booked!</h3>
                <p className="text-gray-300">Your test drive for the <span className="font-semibold text-cyan-300">{selectedModel}</span> has been confirmed. The dealership will contact you shortly with more details.</p>
            </div>
        )
    }

    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg">
            <h3 className="font-bold mb-4 text-white text-lg">Book a Test Drive</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label htmlFor="model_test_drive" className="block text-sm font-medium text-gray-300 mb-1">Select Model</label>
                    <select
                        id="model_test_drive"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        <option value="IE-Sedan">IE-Sedan</option>
                        <option value="IE-SUV">IE-SUV</option>
                        <option value="IE-Apex">IE-Apex (Concept)</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="dealer_test_drive" className="block text-sm font-medium text-gray-300 mb-1">Preferred Dealer</label>
                    <select
                        id="dealer_test_drive"
                        required
                        className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-100 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        {dealers.map(d => <option key={d.id} value={d.id}>{d.name} - {d.location}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="date_test_drive" className="block text-sm font-medium text-gray-300 mb-1">Preferred Date</label>
                    <input type="date" id="date_test_drive" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-cyan-500 transition duration-200">
                    Book Test Drive
                </button>
            </form>
        </div>
    );
};

export default TestDriveBookingForm;
