import React, { useEffect } from 'react';
import SmartInput from '../molecules/SmartInput';
import { AccessibleButton, SkipLink, useAnnouncements, useKeyboardNavigation } from '../atoms/AccessibilityEnhancements';

interface WelcomeScreenProps {
  onActionClick: (action: string) => void;
  onSendMessage: (message: string) => void;
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
  const { announce } = useAnnouncements();
  const { focusedIndex, setFocusedIndex, isNavigating } = useKeyboardNavigation();
  
  useEffect(() => {
    // Announce welcome screen to screen readers
    announce("Welcome to Aura AI, your intelligent IE Vehicle Concierge. Use tab to navigate quick actions or skip to main content.");
  }, [announce]);
  const quickActions = [
    {
      title: "View Fleet",
      description: "See your current vehicles",
      action: "Show me my vehicle fleet",
      icon: "🚗",
      ariaLabel: "View vehicle fleet - See your current vehicles"
    },
    {
      title: "Book Service",
      description: "Schedule maintenance",
      action: "I need to book a service appointment",
      icon: "🔧",
      ariaLabel: "Book service appointment - Schedule maintenance for your vehicle"
    },
    {
      title: "Test Drive",
      description: "Schedule a test drive",
      action: "I want to schedule a test drive",
      icon: "⚡",
      ariaLabel: "Schedule test drive - Book a test drive for a new vehicle"
    },
    {
      title: "Vehicle Info",
      description: "Get vehicle details",
      action: "Tell me about my vehicles",
      icon: "📋",
      ariaLabel: "Get vehicle information - View details about your vehicles"
    }
  ];

  const handleActionClick = (action: string, title: string) => {
    onActionClick(action);
    announce(`${title} selected. Loading your request.`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((index + 1) % quickActions.length);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((index - 1 + quickActions.length) % quickActions.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocusedIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setFocusedIndex(quickActions.length - 1);
    }
  };

  return (
    <>
      {/* Skip Links */}
      <SkipLink href="#quick-actions">Skip to quick actions</SkipLink>
      <SkipLink href="#main-input">Skip to main input</SkipLink>
      
      <div className={`flex-1 flex flex-col justify-center items-center px-4 py-8 ${className}`}>
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Welcome Message */}
          <header className="mb-12">
            <div 
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
              role="img"
              aria-label="IE Vehicle Concierge logo"
            >
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
          </header>

          {/* Quick Action Cards */}
          <section 
            id="quick-actions" 
            className="mb-12"
            aria-label="Quick actions"
          >
            <h2 className="sr-only">Quick Actions</h2>
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              role="group"
              aria-label="Quick action buttons"
            >
              {quickActions.map((action, index) => (
                <AccessibleButton
                  key={index}
                  onClick={() => handleActionClick(action.action, action.title)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  variant="ghost"
                  className={`p-6 text-left border border-gray-700 rounded-xl hover:border-gray-600 hover:shadow-lg transition-all duration-200 bg-gray-800 ${
                    isNavigating && focusedIndex === index ? 'ring-2 ring-cyan-500' : ''
                  }`}
                  aria-label={action.ariaLabel}
                  tabIndex={0}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl" role="img" aria-label={action.title}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-400">{action.description}</p>
                    </div>
                  </div>
                </AccessibleButton>
              ))}
            </div>
          </section>

          {/* Input Section */}
          <section id="main-input" className="mb-8" aria-label="Message input">
            <h2 className="sr-only">Send Message</h2>
            <SmartInput
              placeholder="Ask me anything about your vehicles..."
              onSend={onSendMessage}
              onVoiceStart={onVoiceStart}
              onVoiceEnd={onVoiceEnd}
              onAttachmentClick={onAttachmentClick}
              showAttachments={true}
              showVoice={true}
              className="w-full"
            />
          </section>

          {/* Help Text */}
          <footer className="text-center">
            <p className="text-sm text-gray-400">
              I can help with fleet management, service bookings, test drives, and vehicle information.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
