import React, { useState, useRef } from 'react';
import { AccessibleButton, useAnnouncements } from '../atoms/AccessibilityEnhancements';

interface SmartInputProps {
  placeholder?: string;
  onSend: (message: string) => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  onAttachmentClick?: () => void;
  showAttachments?: boolean;
  showVoice?: boolean;
  disabled?: boolean;
  className?: string;
}

const SmartInput: React.FC<SmartInputProps> = ({
  placeholder = "Ask anything",
  onSend,
  onVoiceStart,
  onVoiceEnd,
  onAttachmentClick,
  showAttachments = true,
  showVoice = true,
  disabled = false,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { announce } = useAnnouncements();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSend(inputValue.trim());
      setInputValue('');
      announce(`Message sent: ${inputValue.trim()}`);
    }
  };

  const handleVoiceClick = () => {
    if (isVoiceActive) {
      // Stop voice recording
      setIsVoiceActive(false);
      onVoiceEnd?.('');
      announce('Voice recording stopped');
    } else {
      // Start voice recording
      setIsVoiceActive(true);
      onVoiceStart?.();
      announce('Voice recording started');
    }
  };

  const handleAttachmentClick = () => {
    onAttachmentClick?.();
    announce('Attachment dialog opened');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`smart-input ${className}`} role="search" aria-label="Message input form">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-gray-800 border border-gray-600 rounded-2xl shadow-sm focus-within:border-gray-500 focus-within:shadow-md transition-all duration-200">
          {/* Attachment Button */}
          {showAttachments && (
            <AccessibleButton
              onClick={handleAttachmentClick}
              disabled={disabled}
              variant="ghost"
              size="sm"
              className="p-3 text-gray-400 hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Add attachment to message"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </AccessibleButton>
          )}

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 focus:outline-none disabled:opacity-50"
            aria-label="Type your message here"
            aria-describedby="input-help"
          />

          {/* Voice Button */}
          {showVoice && (
            <AccessibleButton
              onClick={handleVoiceClick}
              disabled={disabled}
              variant="ghost"
              size="sm"
              className={`p-3 transition-colors ${
                isVoiceActive 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-gray-400 hover:text-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={isVoiceActive ? "Stop voice recording" : "Start voice recording"}
              aria-pressed={isVoiceActive}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </AccessibleButton>
          )}

          {/* Send Button */}
          <AccessibleButton
            type="submit"
            disabled={disabled || !inputValue.trim()}
            variant="ghost"
            size="sm"
            className={`p-3 transition-colors ${
              inputValue.trim() && !disabled
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-gray-500'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Send message"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </AccessibleButton>
        </div>

        {/* Voice Recording Indicator */}
        {isVoiceActive && (
          <div 
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2 shadow-lg"
            role="status"
            aria-live="polite"
            aria-label="Recording in progress"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" aria-hidden="true"></div>
            <span>Recording...</span>
          </div>
        )}

        {/* Screen reader help text */}
        <div id="input-help" className="sr-only">
          Use voice recording or type your message. Press Enter to send, or use the send button.
        </div>
      </form>
    </div>
  );
};

export default SmartInput;
