import React from 'react';
import PersonalizedGreeting from '../atoms/PersonalizedGreeting';
import QuickActionGrid from './QuickActionGrid';

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

interface WelcomeHeroProps {
  className?: string;
  showQuickActions?: boolean;
  quickActions?: QuickAction[];
  onActionClick?: (actionId: string) => void;
  variant?: 'default' | 'minimal' | 'featured';
}

const WelcomeHero: React.FC<WelcomeHeroProps> = ({
  className = '',
  showQuickActions = true,
  quickActions = [],
  onActionClick,
  variant = 'default'
}) => {
  const defaultActions: QuickAction[] = [
    {
      id: 'fleet',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0M15 17a2 2 0 104 0" />
        </svg>
      ),
      label: 'Fleet',
      description: 'View your vehicles',
      onClick: () => onActionClick?.('View my vehicle fleet')
    },
    {
      id: 'service',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Service',
      description: 'Book maintenance',
      onClick: () => onActionClick?.('Book a service appointment')
    },
    {
      id: 'test-drive',
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: 'Test Drive',
      description: 'Schedule a test drive',
      onClick: () => onActionClick?.('Schedule a test drive')
    }
  ];

  const actions = quickActions.length > 0 ? quickActions : defaultActions;

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'text-center py-8';
      case 'featured':
        return 'text-center py-12 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl p-8';
      default:
        return 'text-center py-8';
    }
  };

  return (
    <div className={`welcome-hero ${getVariantClasses()} ${className}`}>
      <PersonalizedGreeting 
        showTimeBased={true}
        showLastVisit={true}
        className="mb-8"
      />
      
      {showQuickActions && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white mb-2">
              How can I help you today?
            </h2>
            <p className="text-sm text-gray-400">
              Choose an option below or ask me anything
            </p>
          </div>
          
          <QuickActionGrid
            actions={actions}
            columns={3}
            variant="grid"
            className="max-w-2xl mx-auto"
          />
        </div>
      )}
    </div>
  );
};

export default WelcomeHero;
