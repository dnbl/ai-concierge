import React, { useState } from 'react';
import SmartInput from '../molecules/SmartInput';
import { AccessibleButton, SkipLink } from '../atoms/AccessibilityEnhancements';
import { usePerformanceMonitoring } from '../../hooks/usePerformanceOptimization';
import { useUserProfile } from '../../store/useUserProfile';

interface WelcomeScreenProps {
  onActionClick: (action: string) => void;
  onSendMessage: (message: string, file?: File | null) => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  className?: string;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onActionClick,
  onSendMessage,
  onVoiceStart,
  onVoiceEnd,
  className = ''
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { profile, addRecentAction, incrementActionUsage } = useUserProfile();
  
  // Performance monitoring
  usePerformanceMonitoring('WelcomeScreen');

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleSendMessage = (message: string, file?: File | null) => {
    onSendMessage(message, file);
    setSelectedFile(null);
    
    // Track user action
    addRecentAction(message, 'info');
  };

  const handleActionClick = (action: string, category: 'fleet' | 'service' | 'testdrive' | 'info') => {
    onActionClick(action);
    addRecentAction(action, category);
    incrementActionUsage(action);
  };

  // Get personalized quick actions based on usage and favorites
  const getPersonalizedActions = () => {
    const defaultActions = [
      {
        title: "View Fleet",
        description: "See your current vehicles",
        action: "Show me my vehicle fleet",
        icon: "🚗",
        category: 'fleet' as const
      },
      {
        title: "Book Service",
        description: "Schedule maintenance",
        action: "I need to book a service appointment",
        icon: "🔧",
        category: 'service' as const
      },
      {
        title: "Test Drive",
        description: "Schedule a test drive",
        action: "I want to schedule a test drive",
        icon: "⚡",
        category: 'testdrive' as const
      },
      {
        title: "Vehicle Info",
        description: "Get vehicle details",
        action: "Tell me about my vehicles",
        icon: "📋",
        category: 'info' as const
      }
    ];

    if (!profile) return defaultActions;

    // Sort by usage frequency and favorites
    return defaultActions.sort((a, b) => {
      const aIsFavorite = profile.favoriteActions.includes(a.action);
      const bIsFavorite = profile.favoriteActions.includes(b.action);
      const aUsage = profile.quickActionUsage[a.action] || 0;
      const bUsage = profile.quickActionUsage[b.action] || 0;

      // Favorites first, then by usage count
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      return bUsage - aUsage;
    });
  };

  const personalizedActions = getPersonalizedActions();

  return (
    <div className={`flex-1 flex flex-col justify-center items-center px-4 py-8 ${className}`}>
      {/* Skip Links for Accessibility */}
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <SkipLink href="#quick-actions">Skip to quick actions</SkipLink>
      
      <div className="w-full max-w-2xl mx-auto text-center" id="main-content">
        {/* Welcome Message */}
        <div className="mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">IE</span>
          </div>
          <h1 className="text-4xl font-bold text-theme-primary mb-4">
            {profile ? `Welcome back, ${profile.name}!` : 'Welcome to Aura AI'}
          </h1>
          <p className="text-xl text-theme-secondary mb-2">
            Your intelligent IE Vehicle Concierge
          </p>
          <p className="text-theme-tertiary">
            How can I help you today?
          </p>
        </div>

        {/* Quick Action Cards */}
        <div id="quick-actions" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {personalizedActions.map((action, index) => {
            const isFavorite = profile?.favoriteActions.includes(action.action);
            const usageCount = profile?.quickActionUsage[action.action] || 0;
            
            return (
              <AccessibleButton
                key={index}
                variant="ghost"
                onClick={() => handleActionClick(action.action, action.category)}
                className="p-6 text-left border border-theme-primary rounded-xl hover:border-theme-accent hover:shadow-lg transition-all duration-200 bg-theme-secondary w-full relative"
                aria-label={`${action.title}: ${action.description}`}
              >
                {/* Favorite indicator */}
                {isFavorite && (
                  <div className="absolute top-2 right-2">
                    <span className="text-yellow-400 text-sm" role="img" aria-label="Favorite">⭐</span>
                  </div>
                )}
                
                {/* Usage count indicator */}
                {usageCount > 0 && (
                  <div className="absolute top-2 left-2">
                    <span className="text-xs text-theme-tertiary bg-theme-tertiary/20 px-2 py-1 rounded-full">
                      {usageCount}x
                    </span>
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="text-2xl" role="img" aria-label={action.title}>
                    {action.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-theme-primary mb-1">{action.title}</h3>
                    <p className="text-sm text-theme-tertiary">{action.description}</p>
                  </div>
                </div>
              </AccessibleButton>
            );
          })}
        </div>
        {/* Input Section */}
        <div className="mb-8">
          <SmartInput
            placeholder="Ask me anything about your vehicles..."
            onSend={handleSendMessage}
            onVoiceStart={onVoiceStart}
            onVoiceEnd={onVoiceEnd}
            onAttachmentSelect={handleFileSelect}
            attachment={selectedFile}
            showAttachments={true}
            showVoice={true}
            className="w-full"
          />
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-sm text-theme-tertiary">
            I can help with fleet management, service bookings, test drives, and vehicle information.
            You can also attach files to share documents or images.
          </p>
          {profile && profile.recentActions.length > 0 && (
            <p className="text-xs text-theme-tertiary mt-2">
              Recent: {profile.recentActions[0].action}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
