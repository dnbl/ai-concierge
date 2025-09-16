import { Message, Vehicle } from '../types';

// User Profile Interface
export interface UserProfile {
  id: string;
  name: string;
  preferences: {
    communicationStyle: 'formal' | 'casual' | 'friendly';
    detailLevel: 'brief' | 'moderate' | 'detailed';
    notificationFrequency: 'low' | 'medium' | 'high';
    preferredServices: string[];
    vehicleInterests: string[];
  };
  behavior: {
    frequentActions: string[];
    timeOfDay: string;
    sessionDuration: number;
    interactionPattern: 'quick' | 'thorough' | 'exploratory';
  };
  context: {
    currentLocation?: string;
    weather?: string;
    timeOfYear?: string;
    recentSearches: string[];
    lastInteraction: Date;
  };
}

// AI Context Interface
export interface AIContext {
  conversationHistory: Message[];
  userProfile: UserProfile;
  currentSession: {
    startTime: Date;
    messagesCount: number;
    topics: string[];
    sentiment: 'positive' | 'neutral' | 'negative';
  };
  systemState: {
    availableServices: string[];
    currentPromotions: string[];
    systemStatus: 'normal' | 'maintenance' | 'busy';
  };
}

// Personalization Engine
export class PersonalizationEngine {
  private userProfile: UserProfile;
  private context: AIContext;

  constructor(userProfile: UserProfile, context: AIContext) {
    this.userProfile = userProfile;
    this.context = context;
  }

  // Analyze user intent and context
  analyzeIntent(prompt: string): {
    intent: string;
    confidence: number;
    suggestedActions: string[];
    personalizationLevel: 'low' | 'medium' | 'high';
  } {
    const lowerPrompt = prompt.toLowerCase();
    
    // Intent classification
    let intent = 'general';
    let confidence = 0.7;
    let suggestedActions: string[] = [];
    let personalizationLevel: 'low' | 'medium' | 'high' = 'low';

    // High-confidence intents
    if (lowerPrompt.includes('fleet') || lowerPrompt.includes('vehicles')) {
      intent = 'fleet_management';
      confidence = 0.9;
      suggestedActions = ['view_fleet', 'add_vehicle', 'vehicle_details'];
      personalizationLevel = 'high';
    } else if (lowerPrompt.includes('service') || lowerPrompt.includes('maintenance')) {
      intent = 'service_booking';
      confidence = 0.9;
      suggestedActions = ['book_service', 'service_history', 'find_dealer'];
      personalizationLevel = 'high';
    } else if (lowerPrompt.includes('test drive')) {
      intent = 'test_drive';
      confidence = 0.9;
      suggestedActions = ['book_test_drive', 'compare_models', 'dealer_info'];
      personalizationLevel = 'medium';
    }

    // Context-aware personalization
    if (this.userProfile.behavior.interactionPattern === 'quick') {
      suggestedActions = suggestedActions.slice(0, 2); // Limit options for quick users
    } else if (this.userProfile.behavior.interactionPattern === 'exploratory') {
      suggestedActions.push('learn_more', 'compare_options', 'view_specifications');
    }

    return { intent, confidence, suggestedActions, personalizationLevel };
  }

  // Generate personalized response
  generatePersonalizedResponse(
    baseResponse: string,
    intent: string,
    personalizationLevel: string
  ): string {
    let personalizedResponse = baseResponse;

    // Adjust communication style
    if (this.userProfile.preferences.communicationStyle === 'casual') {
      personalizedResponse = this.makeResponseCasual(personalizedResponse);
    } else if (this.userProfile.preferences.communicationStyle === 'formal') {
      personalizedResponse = this.makeResponseFormal(personalizedResponse);
    }

    // Adjust detail level
    if (this.userProfile.preferences.detailLevel === 'brief') {
      personalizedResponse = this.makeResponseBrief(personalizedResponse);
    } else if (this.userProfile.preferences.detailLevel === 'detailed') {
      personalizedResponse = this.addMoreDetails(personalizedResponse, intent);
    }

    // Add contextual information
    if (personalizationLevel === 'high') {
      personalizedResponse = this.addContextualInfo(personalizedResponse);
    }

    return personalizedResponse;
  }

  // Generate follow-up suggestions
  generateFollowUpSuggestions(intent: string, userHistory: Message[]): string[] {
    const baseSuggestions: Record<string, string[]> = {
      fleet_management: [
        'Show me details for my IE-Sedan',
        'Book a service appointment',
        'Add another vehicle to my fleet'
      ],
      service_booking: [
        'Find nearest service center',
        'Check service history',
        'Schedule maintenance reminder'
      ],
      test_drive: [
        'Compare IE models',
        'Find nearby dealership',
        'Check availability'
      ]
    };

    let suggestions = baseSuggestions[intent] || [
      'How can I help you today?',
      'What would you like to know?',
      'Is there anything else I can assist with?'
    ];

    // Personalize based on user behavior
    if (this.userProfile.behavior.frequentActions.includes('service_booking')) {
      suggestions = suggestions.filter(s => !s.includes('service'));
      suggestions.unshift('Book another service appointment');
    }

    // Add time-based suggestions
    const hour = new Date().getHours();
    if (hour >= 9 && hour <= 17) {
      suggestions.push('Schedule a callback');
    } else {
      suggestions.push('Send me more information');
    }

    return suggestions.slice(0, 3); // Limit to 3 suggestions
  }

  // Update user profile based on interaction
  updateUserProfile(interaction: {
    action: string;
    duration: number;
    satisfaction?: number;
    feedback?: string;
  }): void {
    // Update frequent actions
    if (!this.userProfile.behavior.frequentActions.includes(interaction.action)) {
      this.userProfile.behavior.frequentActions.push(interaction.action);
    }

    // Update interaction pattern
    if (interaction.duration < 30) {
      this.userProfile.behavior.interactionPattern = 'quick';
    } else if (interaction.duration > 120) {
      this.userProfile.behavior.interactionPattern = 'exploratory';
    }

    // Update last interaction
    this.userProfile.context.lastInteraction = new Date();
  }

  // Private helper methods
  private makeResponseCasual(response: string): string {
    return response
      .replace(/I'll/g, "I'll")
      .replace(/I'm/g, "I'm")
      .replace(/I can/g, "I can")
      .replace(/Please/g, "Sure thing!")
      .replace(/Thank you/g, "Thanks!");
  }

  private makeResponseFormal(response: string): string {
    return response
      .replace(/I'll/g, "I shall")
      .replace(/I'm/g, "I am")
      .replace(/I can/g, "I am able to")
      .replace(/Sure thing!/g, "Certainly")
      .replace(/Thanks!/g, "Thank you");
  }

  private makeResponseBrief(response: string): string {
    // Remove extra details and keep only essential information
    const lines = response.split('\n');
    const essentialLines = lines.filter(line => 
      line.includes('##') || 
      line.includes('**') || 
      line.includes('•') ||
      line.length < 100
    );
    return essentialLines.join('\n');
  }

  private addMoreDetails(response: string, intent: string): string {
    const detailSections: Record<string, string> = {
      fleet_management: '\n\n**Additional Information:**\n• All vehicles include comprehensive warranty coverage\n• 24/7 roadside assistance available\n• Mobile app integration for remote monitoring',
      service_booking: '\n\n**Service Benefits:**\n• Certified technicians with IE training\n• Genuine parts and components\n• Service history tracking\n• Warranty protection maintained',
      test_drive: '\n\n**Test Drive Experience:**\n• Personalized route based on your interests\n• Full feature demonstration\n• Expert consultation available\n• No pressure sales environment'
    };

    return response + (detailSections[intent] || '');
  }

  private addContextualInfo(response: string): string {
    let contextualInfo = '';

    // Add location-based info
    if (this.userProfile.context.currentLocation) {
      contextualInfo += `\n\n*Based on your location in ${this.userProfile.context.currentLocation}, `;
    }

    // Add time-based info
    const hour = new Date().getHours();
    if (hour >= 9 && hour <= 17) {
      contextualInfo += 'our service centers are currently open and ready to assist you.*';
    } else {
      contextualInfo += 'our service centers are currently closed, but you can schedule appointments for tomorrow.*';
    }

    return response + contextualInfo;
  }
}

// AI Personalization Service
export class AIPersonalizationService {
  private personalizationEngine: PersonalizationEngine;
  private userProfile: UserProfile;

  constructor(userProfile: UserProfile) {
    this.userProfile = userProfile;
    this.personalizationEngine = new PersonalizationEngine(userProfile, {
      conversationHistory: [],
      userProfile,
      currentSession: {
        startTime: new Date(),
        messagesCount: 0,
        topics: [],
        sentiment: 'neutral'
      },
      systemState: {
        availableServices: ['fleet_management', 'service_booking', 'test_drive', 'support'],
        currentPromotions: [],
        systemStatus: 'normal'
      }
    });
  }

  // Process user input with personalization
  async processUserInput(
    prompt: string,
    conversationHistory: Message[]
  ): Promise<{
    response: string;
    tool: { name: string; payload: any } | null;
    personalization: {
      intent: string;
      confidence: number;
      suggestions: string[];
    };
  }> {
    // Analyze intent
    const intentAnalysis = this.personalizationEngine.analyzeIntent(prompt);
    
    // Generate base response (using existing mock service logic)
    const baseResponse = this.generateBaseResponse(prompt, intentAnalysis.intent);
    
    // Personalize response
    const personalizedResponse = this.personalizationEngine.generatePersonalizedResponse(
      baseResponse.response,
      intentAnalysis.intent,
      intentAnalysis.personalizationLevel
    );

    // Generate follow-up suggestions
    const suggestions = this.personalizationEngine.generateFollowUpSuggestions(
      intentAnalysis.intent,
      conversationHistory
    );

    // Update user profile
    this.personalizationEngine.updateUserProfile({
      action: intentAnalysis.intent,
      duration: 0, // This would be calculated based on actual interaction time
      satisfaction: 0.8 // This would be based on user feedback
    });

    return {
      response: personalizedResponse,
      tool: baseResponse.tool,
      personalization: {
        intent: intentAnalysis.intent,
        confidence: intentAnalysis.confidence,
        suggestions
      }
    };
  }

  // Generate base response (simplified version of existing mock service)
  private generateBaseResponse(prompt: string, intent: string): {
    response: string;
    tool: { name: string; payload: any } | null;
  } {
    const lowerPrompt = prompt.toLowerCase();

    // Fleet management
    if (intent === 'fleet_management') {
      return {
        response: `## Your Vehicle Fleet

You currently have **2 vehicles** registered:

### **Vehicle Overview**

• **IE-Sedan** - Premium electric sedan with 320-mile range
• **IE-SUV** - Versatile electric SUV with towing capability

### **Fleet Status**

Each vehicle is equipped with our latest technology and is ready for your next adventure!

**Key Features:**
• All vehicles running latest software
• Battery health at optimal levels
• Service schedules up to date
• Warranty coverage active

---

**What would you like to do next?**`,
        tool: {
          name: "view_fleet",
          payload: {
            suggestedFollowUps: [
              "Show me details for my IE-Sedan",
              "Book a service appointment for my SUV",
              "Add another vehicle to my fleet"
            ]
          }
        }
      };
    }

    // Service booking
    if (intent === 'service_booking') {
      return {
        response: `## Service Appointment Booking

I'll help you book a service appointment for your vehicle!

### **Available Services**

• **Routine Maintenance** - Oil changes, tire rotation, inspections
• **Software Updates** - Latest system improvements and features  
• **Battery Service** - Health checks and optimization
• **Repair Services** - Diagnostic and repair work

### **Service Centers**

• **Infinite Auto SF** (San Francisco, CA) - *2.3 miles away*
• **Infinite Auto Palo Alto** (Palo Alto, CA) - *8.7 miles away*
• **Infinite Auto LA** (Los Angeles, CA) - *45.2 miles away*

### **Next Available Slots**

**Today:**
• 2:00 PM - Available
• 4:30 PM - Available

**Tomorrow:**
• 9:00 AM - Available
• 11:30 AM - Available
• 3:00 PM - Available

---

**Which service center works best for you?**`,
        tool: {
          name: "book_service",
          payload: {
            vin: "1HGBH41JXMN109186",
            urgency: "routine",
            suggestedFollowUps: [
              "Find nearest service center",
              "Check service history",
              "Schedule maintenance reminder"
            ]
          }
        }
      };
    }

    // Default response
    return {
      response: `## Hello! I'm Aura

Your **IE Vehicle Concierge** AI assistant!`,
      tool: {
        name: "show_generic_info",
        payload: {
          title: "Welcome to IE Vehicle Concierge",
          content: `## How Can I Help You Today?

I'm here to assist you with all your IE vehicle needs. Whether you need help with your fleet, want to book a service appointment, or have any questions about your vehicles, I'm ready to help!

**Popular actions:**
• View your vehicle fleet
• Book a service appointment
• Schedule a test drive
• Get vehicle information

**What would you like to do?**`
        }
      }
    };
  }

  // Get user profile
  getUserProfile(): UserProfile {
    return this.userProfile;
  }

  // Update user profile
  updateUserProfile(updates: Partial<UserProfile>): void {
    this.userProfile = { ...this.userProfile, ...updates };
  }
}

// Default user profile
export const createDefaultUserProfile = (): UserProfile => ({
  id: 'user-001',
  name: 'Dean',
  preferences: {
    communicationStyle: 'friendly',
    detailLevel: 'moderate',
    notificationFrequency: 'medium',
    preferredServices: ['fleet_management', 'service_booking'],
    vehicleInterests: ['IE-Sedan', 'IE-SUV']
  },
  behavior: {
    frequentActions: [],
    timeOfDay: new Date().toLocaleTimeString(),
    sessionDuration: 0,
    interactionPattern: 'thorough'
  },
  context: {
    recentSearches: [],
    lastInteraction: new Date()
  }
});



