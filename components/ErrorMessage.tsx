import React from 'react';

interface ErrorMessageProps {
    message: string;
    onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl p-4 rounded-2xl bg-red-900/50 border border-red-700 rounded-bl-lg text-white">
            <h3 className="font-bold mb-2 text-red-300">An Error Occurred</h3>
            <p className="text-red-200 text-sm mb-4">{message}</p>
            <button
                onClick={onRetry}
                className="w-full bg-red-500/80 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-900/50 focus:ring-red-400 transition duration-200"
            >
                Retry Last Message
            </button>
        </div>
    );
};

export default ErrorMessage;