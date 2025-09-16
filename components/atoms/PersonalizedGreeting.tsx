import React from 'react';

interface PersonalizedGreetingProps {
  className?: string;
  showTimeBased?: boolean;
  showLastVisit?: boolean;
}

const PersonalizedGreeting: React.FC<PersonalizedGreetingProps> = ({
  className = '',
  showTimeBased = true,
  showLastVisit = false
}) => {
  // For now, use a default user profile since it's not in the store yet
  const userProfile = {
    name: 'Dean',
    context: {
      lastInteraction: null
    }
  };
  
  const getTimeBasedGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getGreeting = (): string => {
    const baseGreeting = showTimeBased ? getTimeBasedGreeting() : 'Hello';
    const name = userProfile?.name || 'there';
    return `${baseGreeting}, ${name}`;
  };

  const getLastVisitText = (): string => {
    if (!showLastVisit || !userProfile?.context?.lastInteraction) return '';
    
    const lastVisit = new Date(userProfile.context.lastInteraction);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Welcome back!';
    if (diffInHours < 24) return `Welcome back! It's been ${diffInHours} hours since your last visit.`;
    if (diffInHours < 168) return `Welcome back! It's been ${Math.floor(diffInHours / 24)} days since your last visit.`;
    return 'Welcome back! It\'s been a while since your last visit.';
  };

  return (
    <div className={`personalized-greeting ${className}`} style={{ color: 'white' }}>
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
        {getGreeting()}
      </h1>
      {showLastVisit && (
        <p className="text-sm text-cyan-400 mb-4" style={{ color: '#06b6d4', fontSize: '0.875rem' }}>
          {getLastVisitText()}
        </p>
      )}
    </div>
  );
};

export default PersonalizedGreeting;
