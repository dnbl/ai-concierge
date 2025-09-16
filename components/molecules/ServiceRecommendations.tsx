import React from 'react';
import { ServiceRecommendation } from '../../data/serviceTypes';

export interface ServiceRecommendationsProps {
  recommendations: ServiceRecommendation[];
  onSelectRecommendation: (recommendation: ServiceRecommendation) => void;
  className?: string;
}

const ServiceRecommendations: React.FC<ServiceRecommendationsProps> = ({
  recommendations,
  onSelectRecommendation,
  className = ''
}) => {
  if (recommendations.length === 0) {
    return null;
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-red-400 bg-red-900/20';
      case 'high': return 'text-orange-400 bg-orange-900/20';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '📋';
      case 'low': return '💡';
      default: return 'ℹ️';
    }
  };

  return (
    <div className={`service-recommendations ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-4">Recommended Services</h3>
      <div className="space-y-3">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="p-4 border border-gray-600 rounded-lg bg-gray-800 hover:border-gray-500 cursor-pointer transition-all duration-200"
            onClick={() => onSelectRecommendation(recommendation)}
            style={{
              backgroundColor: '#1f2937',
              border: '1px solid #4b5563',
              borderRadius: '8px',
              padding: '16px'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{recommendation.serviceType.icon}</span>
                  <h4 className="font-medium text-white">{recommendation.serviceType.name}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(recommendation.urgency)}`}
                    style={{
                      backgroundColor: recommendation.urgency === 'critical' ? 'rgba(239, 68, 68, 0.2)' :
                                      recommendation.urgency === 'high' ? 'rgba(251, 146, 60, 0.2)' :
                                      recommendation.urgency === 'medium' ? 'rgba(250, 204, 21, 0.2)' :
                                      'rgba(34, 197, 94, 0.2)',
                      color: recommendation.urgency === 'critical' ? '#f87171' :
                             recommendation.urgency === 'high' ? '#fb923c' :
                             recommendation.urgency === 'medium' ? '#facc15' :
                             '#4ade80'
                    }}
                  >
                    {getUrgencyIcon(recommendation.urgency)} {recommendation.urgency}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-2">{recommendation.reason}</p>
                {recommendation.nextDue && (
                  <p className="text-xs text-cyan-400">
                    Next due: {new Date(recommendation.nextDue).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="ml-4">
                <button
                  className="px-3 py-1 bg-cyan-500 text-white text-sm rounded-md hover:bg-cyan-600 transition-colors"
                  style={{
                    backgroundColor: '#06b6d4',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.875rem'
                  }}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceRecommendations;



