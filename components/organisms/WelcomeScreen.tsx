import React from 'react';
import SmartInput from '../molecules/SmartInput';

interface WelcomeScreenProps {
  onActionClick: (action: string) => void;
  onSendMessage: (message: string, file?: File | null) => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  onAttachmentClick?: () => void;
  className?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onActionClick,
  onSendMessage,
  onVoiceStart,
  onVoiceEnd,
  onAttachmentClick,
  className = ''
}) => {
  const quickActions = [
    {
      title: "View Fleet",
      description: "See your current vehicles",
      action: "Show me my vehicle fleet",
      icon: "🚗"
    },
    {
      title: "Book Service",
      description: "Schedule maintenance",
      action: "I need to book a service appointment",
      icon: "🔧"
    },
    {
      title: "Test Drive",
      description: "Schedule a test drive",
      action: "I want to schedule a test drive",
      icon: "⚡"
    },
    {
      title: "Vehicle Info",
      description: "Get vehicle details",
      action: "Tell me about my vehicles",
      icon: "📋"
    }
  ];

  return (
    <div className={`flex-1 flex flex-col justify-center items-center px-4 py-8 ${className}`}>
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Welcome Message */}
        <div className="mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">IE</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Aura AI
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Your intelligent IE Vehicle Concierge
          </p>
          <p className="text-gray-400">
            How can I help you today?
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => onActionClick(action.action)}
              className="p-6 text-left border border-gray-700 rounded-xl hover:border-gray-600 hover:shadow-lg transition-all duration-200 bg-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl">{action.icon}</div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <SmartInput
            placeholder="Ask me anything about your vehicles..."
            onSend={onSendMessage}
            onVoiceStart={onVoiceStart}
            onVoiceEnd={onVoiceEnd}
            onAttachmentClick={onAttachmentClick}
            showAttachments={true}
            showVoice={true}
            className="w-full"
            acceptedFileTypes="image/*,.pdf,.doc,.docx,.txt"
            maxFileSize={10}
          />
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            I can help with fleet management, service bookings, test drives, and vehicle information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
