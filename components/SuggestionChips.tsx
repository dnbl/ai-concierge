
import React from 'react';
import { AccessibleButton } from './atoms/AccessibilityEnhancements';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ suggestions, onSelect }) => {
  return (
    <div 
      className="flex items-center gap-2 mb-3 overflow-x-auto pb-2 -mb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      role="group"
      aria-label="Suggested responses"
    >
      {suggestions.map((suggestion, index) => (
        <AccessibleButton
          key={index}
          onClick={() => onSelect(suggestion)}
          variant="ghost"
          size="sm"
          className="flex-shrink-0 px-4 py-2 bg-gray-700/80 border border-gray-600 text-cyan-300 rounded-full text-sm hover:bg-gray-600 hover:text-cyan-200 transition-all duration-200"
          aria-label={`Select suggestion: ${suggestion}`}
        >
          {suggestion}
        </AccessibleButton>
      ))}
    </div>
  );
};

export default SuggestionChips;
