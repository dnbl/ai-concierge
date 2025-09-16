import { Message } from "./types";

// Application Configuration
export const APP_CONFIG = {
  name: 'IE AI Concierge',
  version: '1.0.0',
  description: 'AI-powered vehicle concierge service',
  author: 'IE Team',
  supportEmail: 'support@ie-vehicles.com',
  website: 'https://ie-vehicles.com',
} as const;

// API Configuration
export const API_CONFIG = {
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  baseURL: (import.meta as any).env?.VITE_API_BASE_URL || 'https://api.ie-vehicles.com',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  enableAnalytics: (import.meta as any).env?.VITE_ENABLE_ANALYTICS === 'true',
  enableErrorReporting: (import.meta as any).env?.VITE_ENABLE_ERROR_REPORTING === 'true',
  enablePerformanceMonitoring: (import.meta as any).env?.VITE_ENABLE_PERFORMANCE_MONITORING === 'true',
  enableDebugMode: (import.meta as any).env?.VITE_DEBUG_MODE === 'true',
} as const;

// UI Constants
export const UI_CONFIG = {
  animationDuration: 300,
  debounceDelay: 500,
  throttleDelay: 100,
  maxRetries: 3,
  loadingTimeout: 10000,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  userPreferences: 'ie-concierge-preferences',
  chatHistory: 'ie-concierge-chat-history',
  fleetData: 'ie-concierge-fleet-data',
  serviceHistory: 'ie-concierge-service-history',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  networkError: 'Network connection error. Please check your internet connection.',
  serverError: 'Server error. Please try again later.',
  validationError: 'Please check your input and try again.',
  unauthorizedError: 'You are not authorized to perform this action.',
  notFoundError: 'The requested resource was not found.',
  timeoutError: 'Request timed out. Please try again.',
  unknownError: 'An unexpected error occurred. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  serviceBooked: 'Service appointment booked successfully!',
  vehicleAdded: 'Vehicle added to your fleet successfully!',
  testDriveScheduled: 'Test drive scheduled successfully!',
  dataUpdated: 'Data updated successfully!',
} as const;

// Initial Suggestions
export const INITIAL_SUGGESTIONS: string[] = [
    "Show me my vehicle fleet",
    "Book a service appointment", 
    "Schedule a test drive",
    "View my vehicle details"
];

// Welcome Message
export const WELCOME_MESSAGE: Message = {
    id: 'initial-welcome',
    sender: 'agent',
    text: `## Welcome to IE Concierge

Hi Dean, welcome to IE Concierge. How can I help?

I'm **Aura**, your AI assistant for IE electric vehicles. I'm here to help you with:

### **Quick Actions**

• **Fleet Management** - View and manage your vehicles
• **Service Booking** - Schedule maintenance and repairs  
• **Test Drives** - Book test drives for new models
• **Vehicle Information** - Get detailed specs and history

### **What I Can Help With**

• **Add new vehicles** to your fleet
• **Check service history** and schedule appointments
• **Compare different IE models** and features
• **Connect you with our expert team** for support
• **Provide technical support** and troubleshooting

### **Getting Started**

**Popular first steps:**
• View your current vehicle fleet
• Book a service appointment
• Schedule a test drive
• Learn about vehicle features

---

**How can I assist you today?**`,
};

// Performance Thresholds
export const PERFORMANCE_THRESHOLDS = {
  slowRender: 16, // ms
  slowNetwork: 3000, // ms
  memoryWarning: 50 * 1024 * 1024, // 50MB
  memoryCritical: 100 * 1024 * 1024, // 100MB
} as const;

// Accessibility Constants
export const A11Y_CONFIG = {
  focusVisibleClass: 'focus-visible',
  skipLinkText: 'Skip to main content',
  loadingText: 'Loading...',
  errorText: 'Error occurred',
} as const;