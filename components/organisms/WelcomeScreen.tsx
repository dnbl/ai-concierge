import React, { useMemo } from 'react';
import SmartInput from '../molecules/SmartInput';
import PersonalizedGreeting from '../atoms/PersonalizedGreeting';
import AccessibleButton from '../atoms/AccessibleButton';
import { usePerformanceMonitoring } from '../../hooks/usePerformanceOptimization';
import { useI18n } from '../../hooks/useI18n';
import { useAppStore } from '../../store/useAppStore';
import { useToast } from '../atoms/Toast';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  action: string;
  icon: string;
  context?: 'fleet' | 'service' | 'booking' | 'general';
}

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
  // Performance monitoring
  usePerformanceMonitoring('WelcomeScreen');
  
  // Internationalization
  const { t } = useI18n();
  
  // Store access
  const { fleet, ui, toggleTheme } = useAppStore();
  
  // Toast notifications
  const { showContextualToast } = useToast();

  const quickActions: QuickAction[] = useMemo(() => [
    {
      id: 'fleet',
      title: t('fleet.title'),
      description: t('fleet.noVehicles'),
      action: "Show me my vehicle fleet",
      icon: "🚗",
      context: 'fleet'
    },
    {
      id: 'service',
      title: t('services.book'),
      description: t('services.title'),
      action: "I need to book a service appointment",
      icon: "🔧",
      context: 'service'
    },
    {
      id: 'testdrive',
      title: t('fleet.testDrive'),
      description: "Schedule a test drive",
      action: "I want to schedule a test drive",
      icon: "⚡",
      context: 'booking'
    },
    {
      id: 'info',
      title: t('fleet.vehicleInfo'),
      description: t('fleet.viewDetails'),
      action: "Tell me about my vehicles",
      icon: "📋",
      context: 'general'
    }
  ], [t]);

  const handleActionClick = (action: QuickAction) => {
    // Show contextual toast
    showContextualToast(
      action.context || 'general',
      'info',
      `${action.title} selected`,
      `Processing your request for ${action.description.toLowerCase()}...`
    );
    
    onActionClick(action.action);
  };

  const fleetContext = useMemo(() => ({
    vehicleCount: fleet.length,
    upcomingServices: 1, // This could come from actual data
    preferredDealer: 'Infinity East'
  }), [fleet.length]);

  return (
    <div 
      className={`flex-1 flex flex-col justify-center items-center px-4 py-8 ${className}`}
      role="main"
      aria-label="Welcome screen"
    >
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Brand Identity */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl" aria-label="IE logo">IE</span>
          </div>
          
          {/* Personalized Greeting */}
          <PersonalizedGreeting
            showTimeBased={true}
            showLastVisit={false}
            context={fleetContext}
            className="mb-4"
          />
          
          <p className="text-xl text-gray-300 mb-2">
            {t('greeting.newUser')}
          </p>
          <p className="text-gray-400">
            How can I help you today?
          </p>
        </div>

        {/* Theme Toggle Button */}
        <div className="mb-8 flex justify-center">
          <AccessibleButton
            onClick={toggleTheme}
            variant="ghost"
            size="sm"
            ariaLabel={`Switch to ${ui.theme === 'dark' ? 'light' : 'dark'} theme`}
            className="flex items-center gap-2"
          >
            {ui.theme === 'dark' ? '☀️' : '🌙'}
            {ui.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </AccessibleButton>
        </div>

        {/* Quick Action Cards */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
          role="group"
          aria-label="Quick actions"
        >
          {quickActions.map((action) => (
            <AccessibleButton
              key={action.id}
              onClick={() => handleActionClick(action)}
              variant="ghost"
              className="p-6 text-left border border-gray-700 rounded-xl hover:border-gray-600 hover:shadow-lg transition-all duration-200 bg-gray-800 h-auto"
              ariaLabel={`${action.title}: ${action.description}`}
              testId={`quick-action-${action.id}`}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="text-2xl" 
                  role="img" 
                  aria-label={action.title}
                >
                  {action.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white mb-1">{action.title}</h3>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </div>
              </div>
            </AccessibleButton>
          ))}
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <SmartInput
            placeholder={t('chat.placeholder')}
            onSend={onSendMessage}
            onVoiceStart={onVoiceStart}
            onVoiceEnd={onVoiceEnd}
            onAttachmentClick={onAttachmentClick}
            showAttachments={true}
            showVoice={true}
            className="w-full"
          />
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            I can help with fleet management, service bookings, test drives, and vehicle information.
          </p>
          
          {/* Skip to main content link for screen readers */}
          <a 
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cyan-600 text-white px-4 py-2 rounded-md z-50"
          >
            Skip to main content
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
