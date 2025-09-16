
import React from 'react';

interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ suggestions, onSelect }) => {
  return (
    <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2 -mb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="flex-shrink-0 px-4 py-2 bg-gray-700/80 border border-gray-600 text-cyan-300 rounded-full text-sm hover:bg-gray-600 hover:text-cyan-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
