import React, { useRef, useEffect } from 'react';
import { Message as MessageType, Vehicle, Dealer, VehicleDetails, ServiceRecord } from '../types';
import Message from './Message';

interface ChatWindowProps {
  messages: MessageType[];
  fleet: Vehicle[];
  dealers: Dealer[];
  vehicleDetails: Record<string, VehicleDetails>;
  serviceHistory: Record<string, ServiceRecord[]>;
  onAddVehicle: (data: { model: string; vin:string }) => void;
  onImageClick: (url: string) => void;
  onRetry: () => void;
  onSuggestionClick: (prompt: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = (props) => {
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [props.messages]);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-0" role="log" aria-live="polite">
          {props.messages.map((msg, index) => (
            <div key={msg.id} className={`${msg.sender === 'user' ? 'bg-gray-800' : 'bg-gray-900'}`}>
              <div className="max-w-3xl mx-auto px-4 py-6">
                <Message 
                  message={msg}
                  isLoading={index === props.messages.length - 1 && msg.sender === 'agent' && msg.text.length === 0 && !msg.error}
                  {...props}
                />
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
