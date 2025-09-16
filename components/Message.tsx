import React from 'react';
import { Message as MessageType, Vehicle, Dealer, VehicleDetails, ServiceRecord } from '../types';
import TypographyRichText from './atoms/TypographyRichText';
import AddVehicleForm from './AddVehicleForm';
import ServiceBookingForm from './ServiceBookingForm';
import EnhancedServiceBookingForm from './organisms/EnhancedServiceBookingForm';
import TestDriveBookingForm from './TestDriveBookingForm';
import CallRequestForm from './CallRequestForm';
import FleetView from './FleetView';
import FleetResponse from './organisms/FleetResponse';
import GenericInfoForm from './GenericInfoForm';
import ErrorMessage from './ErrorMessage';
import VehicleDetailsView from './VehicleDetailsView';
import ServiceHistoryView from './ServiceHistoryView';
import SuggestionChips from './SuggestionChips';
import { MessageLoading, SkeletonLoader } from './atoms/LoadingStates';

interface MessageProps {
  message: MessageType;
  isLoading: boolean;
  fleet: Vehicle[];
  dealers: Dealer[];
  vehicleDetails: Record<string, VehicleDetails>;
  serviceHistory: Record<string, ServiceRecord[]>;
  onAddVehicle: (data: { model: string; vin:string }) => void;
  onImageClick: (url: string) => void;
  onRetry: () => void;
  onSuggestionClick: (prompt: string) => void;
}

const LoadingIndicator: React.FC = () => (
    <MessageLoading />
);

const UserAvatar: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0 flex items-center justify-center">
        <span className="text-white font-medium text-sm">U</span>
    </div>
);
const AgentAvatar: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
        <span className="text-white font-bold text-sm">IE</span>
    </div>
);

const Message: React.FC<MessageProps> = ({ message, isLoading, fleet, dealers, onAddVehicle, onImageClick, onRetry, onSuggestionClick, vehicleDetails, serviceHistory }) => {
    const isUser = message.sender === 'user';

    const renderTool = () => {
        if (!message.tool) return null;

        const { name, payload } = message.tool;

        switch (name) {
            case 'view_fleet':
                return (
                    <FleetResponse 
                        fleet={fleet} 
                        onVehicleClick={(vehicle) => {
                            // Handle vehicle click - could open details or navigate
                            console.log('Vehicle clicked:', vehicle);
                        }}
                        onBookService={(vehicle) => {
                            // Handle service booking
                            console.log('Book service for:', vehicle);
                        }}
                    />
                );
            case 'add_vehicle':
                return <AddVehicleForm onAddVehicle={onAddVehicle} />;
            case 'book_service':
                return <EnhancedServiceBookingForm payload={payload} fleet={fleet} dealers={dealers} />;
            case 'book_test_drive':
                 return <TestDriveBookingForm payload={payload} dealers={dealers} />;
            case 'request_call':
                return <CallRequestForm payload={payload} />;
            case 'show_generic_info':
                return <GenericInfoForm payload={payload} />;
            case 'view_vehicle_details':
                const details = vehicleDetails[payload?.vin];
                return details ? <VehicleDetailsView details={details} /> : null;
            case 'view_service_history':
                const history = serviceHistory[payload?.vin];
                return history ? <ServiceHistoryView history={history} vin={payload.vin} /> : <p>Service history not found for VIN: {payload?.vin}</p>;
            default:
                return (
                    <div className="text-red-400 text-xs p-2 bg-red-900/50 rounded-md">
                        Error: Unknown tool "{name}"
                    </div>
                );
        }
    }
    
    if (message.error) {
        return (
             <div className="flex items-start gap-3">
                <AgentAvatar />
                <ErrorMessage message={message.error} onRetry={onRetry} />
            </div>
        )
    }

    const hasFollowUps = message.tool?.payload?.suggestedFollowUps?.length > 0;

    return (
        <div className="flex flex-col">
            <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                {isUser ? <UserAvatar /> : <AgentAvatar />}
                <div className={`flex-1 max-w-2xl ${isUser ? 'flex justify-end' : ''}`}>
                    <div className={`inline-block max-w-full ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 border border-gray-700 text-white'} rounded-2xl px-4 py-3 shadow-sm`}>
                        {isLoading ? (
                            <LoadingIndicator />
                        ) : (
                            <>
                                {message.text && (
                                    <div className={`prose prose-sm max-w-none ${isUser ? 'prose-invert' : 'prose-gray'}`}>
                                        <TypographyRichText 
                                            content={message.text}
                                            variant={isUser ? "compact" : "default"}
                                        />
                                    </div>
                                )}
                                {message.imageUrl && (
                                    <img src={message.imageUrl} alt="Generated content" className="mt-2 rounded-lg cursor-pointer max-w-full" onClick={() => onImageClick(message.imageUrl!)} />
                                )}
                                {message.tool && (
                                    <div className={message.text ? 'mt-4' : ''}>
                                        {renderTool()}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            {!isUser && hasFollowUps && !isLoading && (
                <div className="ml-11 mt-3">
                    <SuggestionChips suggestions={message.tool?.payload?.suggestedFollowUps || []} onSelect={onSuggestionClick} />
                </div>
            )}
        </div>
    );
};

export default Message;
