import React, { useMemo } from 'react';
import { usePerformanceMonitoring } from '../../hooks/usePerformanceOptimization';

interface PersonalizedGreetingProps {
  className?: string;
  showTimeBased?: boolean;
  showLastVisit?: boolean;
  userName?: string;
  lastVisit?: Date;
  context?: {
    vehicleCount?: number;
    upcomingServices?: number;
    preferredDealer?: string;
  };
}

const PersonalizedGreeting: React.FC<PersonalizedGreetingProps> = ({
  className = '',
  showTimeBased = true,
  showLastVisit = false,
  userName,
  lastVisit,
  context
}) => {
  // Performance monitoring
  usePerformanceMonitoring('PersonalizedGreeting');

  // Default user profile for demo purposes
  const defaultUserProfile = {
    name: 'Dean',
    context: {
      lastInteraction: null,
      vehicleCount: 3,
      upcomingServices: 1,
      preferredDealer: 'Infinity East'
    }
  };
  
  const userProfile = {
    name: userName || defaultUserProfile.name,
    context: {
      ...defaultUserProfile.context,
      ...context,
      lastInteraction: lastVisit?.toISOString() || defaultUserProfile.context.lastInteraction
    }
  };
  
  const timeBasedGreeting = useMemo((): string => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const greeting = useMemo((): string => {
    const baseGreeting = showTimeBased ? timeBasedGreeting : 'Hello';
    const name = userProfile?.name || 'there';
    return `${baseGreeting}, ${name}`;
  }, [showTimeBased, timeBasedGreeting, userProfile?.name]);

  const lastVisitText = useMemo((): string => {
    if (!showLastVisit || !userProfile?.context?.lastInteraction) return '';
    
    const lastVisitDate = new Date(userProfile.context.lastInteraction);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Welcome back!';
    if (diffInHours < 24) return `Welcome back! It's been ${diffInHours} hours since your last visit.`;
    if (diffInHours < 168) return `Welcome back! It's been ${Math.floor(diffInHours / 24)} days since your last visit.`;
    return 'Welcome back! It\'s been a while since your last visit.';
  }, [showLastVisit, userProfile?.context?.lastInteraction]);

  const contextualInfo = useMemo((): string[] => {
    const info: string[] = [];
    if (context?.vehicleCount) {
      info.push(`You have ${context.vehicleCount} vehicles in your fleet`);
    }
    if (context?.upcomingServices) {
      info.push(`${context.upcomingServices} upcoming service appointment${context.upcomingServices === 1 ? '' : 's'}`);
    }
    if (context?.preferredDealer) {
      info.push(`Your preferred dealer: ${context.preferredDealer}`);
    }
    return info;
  }, [context]);

  return (
    <div 
      className={`personalized-greeting ${className}`}
      role="banner"
      aria-label="Personalized greeting section"
    >
      <h1 
        className="text-2xl md:text-3xl font-bold text-white mb-2"
        aria-level={1}
      >
        {greeting}
      </h1>
      
      {showLastVisit && lastVisitText && (
        <p 
          className="text-sm text-cyan-400 mb-4"
          role="status"
          aria-live="polite"
        >
          {lastVisitText}
        </p>
      )}
      
      {contextualInfo.length > 0 && (
        <div className="space-y-1 mb-4">
          {contextualInfo.map((info, index) => (
            <p 
              key={index}
              className="text-sm text-gray-300"
              role="note"
            >
              {info}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalizedGreeting;
