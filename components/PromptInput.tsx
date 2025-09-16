import React, { useState, useRef, useEffect } from 'react';

interface PromptInputProps {
  onSend: (prompt: string) => void;
  isLoading: boolean;
  onFileChange: (file: File | null) => void;
  attachment: File | null;
  onRemoveAttachment: () => void;
}

const SendIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const AttachmentIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.5 10.5a.75.75 0 001.06 1.06l10.5-10.5a.75.75 0 011.06 0l3.182 3.182a.75.75 0 010 1.06l-10.5 10.5a.75.75 0 00-1.06 1.06l10.5-10.5a2.25 2.25 0 000-3.182z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M8.625 11.168a.75.75 0 01.033 1.058l-3.358 3.358a2.25 2.25 0 01-3.182-3.182l7.14-7.14a2.25 2.25 0 013.182 0l3.357 3.357a.75.75 0 01-1.06 1.06l-3.357-3.357a.75.75 0 00-1.06 0l-7.14 7.14a.75.75 0 001.06 1.06l3.358-3.358a.75.75 0 011.025-.033z" clipRule="evenodd" />
    </svg>
);

const CloseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
    </svg>
);

const PromptInput: React.FC<PromptInputProps> = ({ onSend, isLoading, onFileChange, attachment, onRemoveAttachment }) => {
  const [prompt, setPrompt] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (attachment) {
      const url = URL.createObjectURL(attachment);
      setAttachmentUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setAttachmentUrl(null);
    return undefined;
  }, [attachment]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() || attachment) {
      onSend(prompt || 'Please see attached file.');
      setPrompt('');
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onFileChange(file || null);
    e.target.value = '';
  };


  return (
    <div className="mt-4">
        {attachmentUrl && (
            <div className="relative inline-block mb-2 bg-gray-700 p-1 rounded-lg">
                <img src={attachmentUrl} alt="attachment preview" className="h-20 w-auto rounded" />
                <button 
                    onClick={onRemoveAttachment} 
                    className="absolute top-0 right-0 -mt-2 -mr-2 bg-gray-800 rounded-full p-0.5 text-white hover:bg-red-500 transition-colors"
                    aria-label="Remove attachment"
                >
                    <CloseIcon className="h-4 w-4" />
                </button>
            </div>
        )}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelected}
              className="hidden"
              accept="image/*,video/*"
          />
          <button
              type="button"
              onClick={handleFileClick}
              disabled={isLoading}
              className="text-gray-400 hover:text-cyan-400 disabled:opacity-50 p-3 rounded-full hover:bg-gray-700 transition-colors"
              aria-label="Attach file"
          >
              <AttachmentIcon className="h-6 w-6" />
          </button>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Aura anything..."
            disabled={isLoading}
            className="flex-1 w-full bg-gray-700 border border-gray-600 rounded-full py-3 px-5 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition duration-200 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || (!prompt.trim() && !attachment)}
            className="bg-cyan-500 text-white rounded-full p-3 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <SendIcon className="h-6 w-6" />
          </button>
        </form>
    </div>
  );
};

export default PromptInput;