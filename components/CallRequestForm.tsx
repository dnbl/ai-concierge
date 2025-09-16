import React, { useState } from 'react';

interface CallRequestFormProps {
    payload?: {
        topic?: string;
    }
}

const CallRequestForm: React.FC<CallRequestFormProps> = ({ payload }) => {
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
             <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg text-white">
                <h3 className="font-bold mb-2 text-lg">Call Request Submitted</h3>
                <p className="text-gray-300">Thank you. An IE representative will call you shortly to discuss your request.</p>
            </div>
        )
    }

    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-gray-700 rounded-bl-lg">
            <h3 className="font-bold mb-4 text-white text-lg">Request a Call</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
                 <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">Topic of Discussion</label>
                    <input type="text" id="topic" defaultValue={payload?.topic || ''} required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <input type="tel" id="phone" placeholder="(555) 123-4567" required className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500" />
                </div>
                <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-2.5 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-700 focus:ring-cyan-500 transition duration-200">
                    Request Call
                </button>
            </form>
        </div>
    );
};

export default CallRequestForm;