import React, { useState, useRef } from 'react';
import { AccessibleInput } from '../atoms/AccessibilityEnhancements';

interface SmartInputProps {
  placeholder?: string;
  onSend: (message: string, file?: File | null) => void;
  onVoiceStart?: () => void;
  onVoiceEnd?: (transcript: string) => void;
  onAttachmentClick?: () => void;
  showAttachments?: boolean;
  showVoice?: boolean;
  disabled?: boolean;
  className?: string;
  acceptedFileTypes?: string;
  maxFileSize?: number; // in MB
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
  className = '',
  acceptedFileTypes = "image/*,.pdf,.doc,.docx,.txt",
  maxFileSize = 10 // 10MB default
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((inputValue.trim() || attachedFile) && !disabled) {
      onSend(inputValue.trim() || 'File uploaded', attachedFile);
      setInputValue('');
      setAttachedFile(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size
      if (file.size > maxFileSize * 1024 * 1024) {
        alert(`File size must be less than ${maxFileSize}MB`);
        return;
      }
      setAttachedFile(file);
    }
  };

  const handleAttachmentClick = () => {
    if (onAttachmentClick) {
      onAttachmentClick();
    } else {
      fileInputRef.current?.click();
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleVoiceClick = () => {
    if (isVoiceActive) {
      // Stop voice recording
      setIsVoiceActive(false);
      onVoiceEnd?.('');
    } else {
      // Start voice recording
      setIsVoiceActive(true);
      onVoiceStart?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`smart-input ${className}`}>
      {/* File Input (hidden) */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes}
        onChange={handleFileSelect}
        className="hidden"
        aria-label="File upload input"
      />
      
      {/* Attached File Display */}
      {attachedFile && (
        <div className="mb-2 p-2 bg-gray-700 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            <span className="text-sm text-gray-300 truncate max-w-xs">{attachedFile.name}</span>
            <span className="text-xs text-gray-400">({(attachedFile.size / 1024 / 1024).toFixed(1)} MB)</span>
          </div>
          <button
            type="button"
            onClick={removeAttachment}
            className="text-gray-400 hover:text-red-400 transition-colors"
            aria-label="Remove attachment"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-gray-800 border border-gray-600 rounded-2xl shadow-sm focus-within:border-gray-500 focus-within:shadow-md transition-all duration-200">
          {/* Attachment Button */}
          {showAttachments && (
            <button
              type="button"
              onClick={handleAttachmentClick}
              disabled={disabled}
              className={`p-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                attachedFile ? 'text-blue-400 hover:text-blue-300' : 'text-gray-400 hover:text-gray-300'
              }`}
              aria-label="Add attachment"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
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
            aria-label="Message input"
          />

          {/* Voice Button */}
          {showVoice && (
            <button
              type="button"
              onClick={handleVoiceClick}
              disabled={disabled}
              className={`p-3 transition-colors ${
                isVoiceActive 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-gray-400 hover:text-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={isVoiceActive ? "Stop voice recording" : "Start voice recording"}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          )}

          {/* Send Button */}
          <button
            type="submit"
            disabled={disabled || (!inputValue.trim() && !attachedFile)}
            className={`p-3 transition-colors ${
              (inputValue.trim() || attachedFile) && !disabled
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-gray-500'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Send message"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        {/* Voice Recording Indicator */}
        {isVoiceActive && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Recording...</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default SmartInput;
