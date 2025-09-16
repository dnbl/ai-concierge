import React, { useState, useEffect } from 'react';
import { Message, Vehicle } from './types';
import { sendMessageToGemini } from './services/geminiService';
import { toBase64 } from './utils/fileUtils';
import ChatWindow from './components/ChatWindow';
import SmartInput from './components/molecules/SmartInput';
import ImageViewerModal from './components/ImageViewerModal';
import { ENHANCED_VEHICLE_DETAILS, ENHANCED_SERVICE_HISTORY, ENHANCED_DEALERS } from './data/enhancedMockData';
import { SpinnerLoader } from './components/atoms/LoadingStates';
import { useAppStore } from './store/useAppStore';
import { ToastProvider, useToastHelpers } from './components/atoms/Toast';
import { ThemeProvider } from './components/providers/ThemeProvider';
import ErrorBoundary from './components/atoms/ErrorBoundary';
import WelcomeScreen from './components/organisms/WelcomeScreen';
import SkipLinks from './components/atoms/SkipLinks';
import ThemeToggle from './components/atoms/ThemeToggle';
import { performanceMonitor } from './utils/performanceMonitoring';

const MOCK_FLEET: Vehicle[] = [
    { id: '1', vin: 'JN8AZ13E35T000123', model: 'IE-Sedan', imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center' },
    { id: '2', vin: 'JN8AZ13E35T000456', model: 'IE-SUV', imageUrl: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop&crop=center' },
    { id: '3', vin: 'JN8AZ13E35T000789', model: 'IE-Apex', imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&crop=center' },
];

const AppContent: React.FC = () => {
    const toastHelpers = useToastHelpers();
    
    // Zustand store
    const {
        messages,
        fleet,
        dealers,
        vehicleDetails,
        serviceHistory,
        ui,
        addMessage,
        updateMessage,
        addVehicle,
        setDealers,
        setVehicleDetails,
        setServiceHistory,
        setLoading,
        clearMessages,
        clearAll
    } = useAppStore();

    // Local state for UI interactions
    const [attachment, setAttachment] = useState<File | null>(null);
    const [imageViewerUrl, setImageViewerUrl] = useState<string | null>(null);

    // Initialize performance monitoring in development
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            const unsubscribe = performanceMonitor.onMetric((metric) => {
                if (metric.rating === 'poor') {
                    toastHelpers.warning(
                        'Performance Warning',
                        `${metric.name} is performing poorly: ${metric.value.toFixed(2)}ms`
                    );
                }
            });
            
            return unsubscribe;
        }
        // Return empty function if not in development
        return () => {};
    }, [toastHelpers]);
    useEffect(() => {
        // Only clear messages, not fleet data
        if (messages.length > 0) {
            clearMessages();
        }
        
        if (fleet.length === 0) {
            MOCK_FLEET.forEach(vehicle => addVehicle(vehicle));
        }
        if (dealers.length === 0) {
            setDealers(ENHANCED_DEALERS);
        }
        if (Object.keys(vehicleDetails).length === 0) {
            Object.entries(ENHANCED_VEHICLE_DETAILS).forEach(([vin, details]) => {
                setVehicleDetails(vin, details);
            });
        }
        if (Object.keys(serviceHistory).length === 0) {
            Object.entries(ENHANCED_SERVICE_HISTORY).forEach(([vin, history]) => {
                setServiceHistory(vin, history);
            });
        }
    }, []);
    
    const [lastUserMessage, setLastUserMessage] = useState<{prompt: string, attachment: File | null} | null>(null);

    const handleSend = async (prompt: string, file: File | null = null) => {
        if (ui.isLoading) return;

        setLoading(true);
        setLastUserMessage({ prompt, attachment: file });
        
        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: prompt,
        };

        const agentMessageId = (Date.now() + 1).toString();
        const loadingMessage: Message = { id: agentMessageId, sender: 'agent', text: '' };
        
        addMessage(userMessage);
        addMessage(loadingMessage);

        let attachmentData: { data: string; mimeType: string } | undefined;
        if (file) {
            const base64 = await toBase64(file) as string;
            attachmentData = {
                data: base64.split(',')[1],
                mimeType: file.type,
            };
            
            // Show toast for file upload
            toastHelpers.info('File Attached', `${file.name} has been uploaded and will be analyzed.`);
        }
        
        const historyForAPI = [...messages, userMessage];
        
        try {
            const response = await sendMessageToGemini(prompt, historyForAPI, attachmentData);
            
            // Update the loading message with the actual response
            updateMessage(agentMessageId, response);
            
        } catch (error) {
            console.error('Error sending message:', error);
            updateMessage(agentMessageId, { 
                text: 'I apologize, but I encountered an error while processing your request. Please try again.' 
            });
            
            // Show error toast
            toastHelpers.error(
                'Message Failed', 
                'Unable to send your message. Please check your connection and try again.',
                {
                    label: 'Retry',
                    onClick: () => handleRetry()
                }
            );
        }
        
        setLoading(false);
        setAttachment(null);
    };

    const handleRetry = () => {
      if (lastUserMessage) {
        // Remove the last two messages (user message and loading message)
        // This is handled by the store's updateMessage function
        handleSend(lastUserMessage.prompt, lastUserMessage.attachment);
      }
    };
    
    const handleAddVehicle = (data: { model: string; vin: string }) => {
        const newVehicle: Vehicle = {
            id: (fleet.length + 1).toString(),
            vin: data.vin,
            model: data.model,
            imageUrl: data.model.toLowerCase().includes('suv') ? 
                'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop&crop=center' : 
                'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center'
        };
        addVehicle(newVehicle);
        
        // Show success toast
        toastHelpers.success('Vehicle Added', `${data.model} (${data.vin}) has been added to your fleet.`);
    };
    
    return (
        <div className="h-screen bg-surface flex flex-col">
            <SkipLinks />
            
            {/* Header - with theme support */}
            <header className="border-b border-themed bg-surface px-4 py-3" id="navigation">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">IE</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-primary">Aura AI Assistant</h1>
                            <p className="text-sm text-secondary">Your IE Vehicle Concierge</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button 
                            onClick={() => {
                                clearAll();
                                toastHelpers.info('New Chat', 'Chat history has been cleared.');
                            }}
                            className="text-sm text-secondary hover:text-primary px-3 py-1 rounded-md hover:bg-surface-elevated transition-colors"
                        >
                            New Chat
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full" id="main-content">
                {messages.length === 0 ? (
                    <WelcomeScreen
                        onActionClick={(action) => handleSend(action)}
                        onSendMessage={(message, file) => handleSend(message, file)}
                        onAttachmentClick={() => setAttachment(null)}
                        className="flex-1"
                        userProfile={{
                            name: "Sarah", // Mock user name
                            recentActions: ["service", "fleet"],
                            preferredServices: ["maintenance", "diagnostics"]
                        }}
                    />
                ) : (
                    <>
                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto">
                            <ChatWindow
                                messages={messages}
                                fleet={fleet}
                                dealers={dealers}
                                vehicleDetails={vehicleDetails}
                                serviceHistory={serviceHistory}
                                onAddVehicle={handleAddVehicle}
                                onImageClick={setImageViewerUrl}
                                onRetry={handleRetry}
                                onSuggestionClick={(prompt) => handleSend(prompt)}
                            />
                        </div>
                        
                        {/* Input Area - Fixed at bottom */}
                        <div className="border-t border-themed bg-surface p-4" id="chat-input">
                            <SmartInput
                                placeholder="Message Aura AI..."
                                onSend={(message, file) => handleSend(message, file)}
                                onAttachmentClick={() => setAttachment(null)}
                                showAttachments={true}
                                showVoice={true}
                                disabled={ui.isLoading}
                                className="w-full"
                                acceptedFileTypes="image/*,.pdf,.doc,.docx,.txt"
                                maxFileSize={10}
                            />
                        </div>
                    </>
                )}
            </main>
            
            {imageViewerUrl && (
                <ImageViewerModal imageUrl={imageViewerUrl} onClose={() => setImageViewerUrl(null)} />
            )}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <ToastProvider>
                    <AppContent />
                </ToastProvider>
            </ThemeProvider>
        </ErrorBoundary>
    );
};

export default App;