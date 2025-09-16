import React from 'react';
import SmartInput from '../molecules/SmartInput';

interface WelcomeScreenProps {
  onActionClick: (action: string) => void;
  onSendMessage: (message: string, file?: File | null) => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  onAttachmentClick?: () => void;
  className?: string;
  userProfile?: {
    name?: string;
    recentActions?: string[];
    preferredServices?: string[];
  };
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onActionClick,
  onSendMessage,
  onVoiceStart,
  onVoiceEnd,
  onAttachmentClick,
  className = '',
  userProfile
}) => {
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Dynamic quick actions based on user profile and recent usage
  const getPersonalizedActions = () => {
    const baseActions = [
      {
        title: "View Fleet",
        description: "See your current vehicles",
        action: "Show me my vehicle fleet",
        icon: "🚗",
        category: "fleet"
      },
      {
        title: "Book Service",
        description: "Schedule maintenance",
        action: "I need to book a service appointment",
        icon: "🔧",
        category: "service"
      },
      {
        title: "Test Drive",
        description: "Schedule a test drive",
        action: "I want to schedule a test drive",
        icon: "⚡",
        category: "testdrive"
      },
      {
        title: "Vehicle Info",
        description: "Get vehicle details",
        action: "Tell me about my vehicles",
        icon: "📋",
        category: "info"
      }
    ];

    // Add personalized actions based on user profile
    const personalizedActions = [...baseActions];

    if (userProfile?.recentActions?.includes('service')) {
      personalizedActions.unshift({
        title: "Recent Service",
        description: "Check your last service",
        action: "Show me my recent service history",
        icon: "🔄",
        category: "recent"
      });
    }

    if (userProfile?.preferredServices?.includes('maintenance')) {
      personalizedActions.push({
        title: "Maintenance Schedule",
        description: "View upcoming maintenance",
        action: "When is my next maintenance due?",
        icon: "📅",
        category: "maintenance"
      });
    }

    // Return top 4 most relevant actions
    return personalizedActions.slice(0, 4);
  };

  const quickActions = getPersonalizedActions();

  return (
    <div className={`flex-1 flex flex-col justify-center items-center px-4 py-8 ${className}`}>
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Welcome Message */}
        <div className="mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">IE</span>
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">
            {getGreeting()}{userProfile?.name ? `, ${userProfile.name}` : ''}!
          </h1>
          <p className="text-xl text-secondary mb-2">
            Welcome to Aura AI
          </p>
          <p className="text-muted">
            Your intelligent IE Vehicle Concierge
          </p>
          {userProfile?.recentActions && userProfile.recentActions.length > 0 && (
            <p className="text-sm text-muted mt-2">
              I see you've been working with{' '}
              {userProfile.recentActions.slice(0, 2).join(' and ')}.
              How can I help you today?
            </p>
          )}
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => onActionClick(action.action)}
              className="p-6 text-left border border-themed rounded-xl hover:border-gray-600 hover:shadow-lg transition-all duration-200 bg-surface-elevated group"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {action.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1 group-hover:text-accent transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-secondary">{action.description}</p>
                  {action.category === 'recent' && (
                    <span className="inline-block mt-2 px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      Recently used
                    </span>
                  )}
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
          <p className="text-sm text-muted">
            I can help with fleet management, service bookings, test drives, and vehicle information.
          </p>
          {userProfile?.preferredServices && userProfile.preferredServices.length > 0 && (
            <p className="text-xs text-muted mt-2">
              Based on your preferences: {userProfile.preferredServices.join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
