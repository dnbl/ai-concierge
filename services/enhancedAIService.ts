import { Message, Vehicle, Dealer, VehicleDetails, ServiceRecord } from '../types';
import { AIPersonalizationService, createDefaultUserProfile, UserProfile } from './aiPersonalizationService';
import { useToast } from '../components/atoms/Toast';

// Enhanced AI Service that integrates personalization
export class EnhancedAIService {
  private personalizationService: AIPersonalizationService;
  private userProfile: UserProfile;

  constructor() {
    this.userProfile = createDefaultUserProfile();
    this.personalizationService = new AIPersonalizationService(this.userProfile);
  }

  // Process user input with advanced personalization
  async processUserInput(
    prompt: string,
    conversationHistory: Message[],
    fleet: Vehicle[],
    dealers: Dealer[],
    vehicleDetails: Record<string, VehicleDetails>,
    serviceHistory: Record<string, ServiceRecord[]>,
    attachmentData?: { data: string; mimeType: string }
  ): Promise<Message> {
    try {
      // Analyze user intent and context
      const analysis = await this.personalizationService.processUserInput(
        prompt,
        conversationHistory
      );

      // Generate personalized response
      const personalizedResponse = this.generatePersonalizedResponse(
        analysis,
        fleet,
        dealers,
        vehicleDetails,
        serviceHistory
      );

      // Update user profile based on interaction
      this.updateUserProfileFromInteraction(prompt, analysis);

      return {
        id: Date.now().toString(),
        sender: 'agent',
        text: personalizedResponse.response,
        tool: personalizedResponse.tool,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Enhanced AI Service Error:', error);
      return {
        id: Date.now().toString(),
        sender: 'agent',
        text: 'I apologize, but I encountered an error processing your request. Please try again.',
        error: 'Processing error occurred',
        timestamp: new Date().toISOString()
      };
    }
  }

  // Generate personalized response based on analysis
  private generatePersonalizedResponse(
    analysis: any,
    fleet: Vehicle[],
    dealers: Dealer[],
    vehicleDetails: Record<string, VehicleDetails>,
    serviceHistory: Record<string, ServiceRecord[]>
  ): { response: string; tool: any } {
    const { intent, confidence, suggestions } = analysis.personalization;
    
    // High-confidence personalized responses
    if (confidence > 0.8) {
      switch (intent) {
        case 'fleet_management':
          return this.generateFleetResponse(fleet, suggestions);
        case 'service_booking':
          return this.generateServiceResponse(dealers, suggestions);
        case 'test_drive':
          return this.generateTestDriveResponse(dealers, suggestions);
        case 'vehicle_details':
          return this.generateVehicleDetailsResponse(vehicleDetails, suggestions);
        case 'service_history':
          return this.generateServiceHistoryResponse(serviceHistory, suggestions);
        default:
          return this.generateDefaultResponse(suggestions);
      }
    }

    // Medium-confidence responses with more context
    if (confidence > 0.5) {
      return this.generateContextualResponse(intent, suggestions);
    }

    // Low-confidence fallback
    return this.generateDefaultResponse(suggestions);
  }

  // Generate fleet management response
  private generateFleetResponse(fleet: Vehicle[], suggestions: string[]): { response: string; tool: any } {
    const fleetCount = fleet.length;
    const personalizedGreeting = this.getPersonalizedGreeting();
    
    return {
      response: `## Your Vehicle Fleet

${personalizedGreeting} Here's your current vehicle fleet with **${fleetCount} vehicle${fleetCount !== 1 ? 's' : ''}**:

All vehicles are equipped with the latest technology and ready for your next adventure!`,
      tool: {
        name: "view_fleet",
        payload: {
          suggestedFollowUps: suggestions.slice(0, 3)
        }
      }
    };
  }

  // Generate service booking response
  private generateServiceResponse(dealers: Dealer[], suggestions: string[]): { response: string; tool: any } {
    const nearestDealer = this.findNearestDealer(dealers);
    const personalizedGreeting = this.getPersonalizedGreeting();
    
    return {
      response: `## Service Appointment Booking

${personalizedGreeting} I'll help you book a service appointment for your vehicle!

### **Available Services**

• **Routine Maintenance** - Oil changes, tire rotation, inspections
• **Software Updates** - Latest system improvements and features  
• **Battery Service** - Health checks and optimization
• **Repair Services** - Diagnostic and repair work

### **Service Centers**

${dealers.map(dealer => `• **${dealer.name}** (${dealer.location}) - *${dealer.distance}*`).join('\n')}

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
          suggestedFollowUps: suggestions.slice(0, 3)
        }
      }
    };
  }

  // Generate test drive response
  private generateTestDriveResponse(dealers: Dealer[], suggestions: string[]): { response: string; tool: any } {
    const personalizedGreeting = this.getPersonalizedGreeting();
    
    return {
      response: `## Test Drive Booking

${personalizedGreeting} I'll help you book a test drive for one of our vehicles!

### **Available Models for Test Drive**

• **IE-Sedan** - Premium electric sedan with 320-mile range
• **IE-SUV** - Versatile electric SUV with towing capability
• **IE-Apex** - High-performance sports model with 0-60 in 3.2s

### **Test Drive Experience**

**Duration:** 30-45 minutes
**Location:** Your choice of dealership
**Instructor:** Certified IE specialist
**Route:** Customized based on your interests

### **What to Expect**

• **Full vehicle demonstration** - Complete feature walkthrough
• **Performance testing** - Acceleration, handling, and range
• **Technology overview** - Infotainment and safety systems
• **Q&A session** - Expert answers to your questions

### **Available Time Slots**

**Today:**
• 10:00 AM - IE-Sedan available
• 2:00 PM - IE-SUV available

**Tomorrow:**
• 10:00 AM - All models available
• 2:00 PM - All models available
• 4:00 PM - IE-Apex available

---

**Which model interests you most?**`,
      tool: {
        name: "book_test_drive",
        payload: {
          model: "IE-Sedan",
          suggestedFollowUps: suggestions.slice(0, 3)
        }
      }
    };
  }

  // Generate vehicle details response
  private generateVehicleDetailsResponse(vehicleDetails: Record<string, VehicleDetails>, suggestions: string[]): { response: string; tool: any } {
    const personalizedGreeting = this.getPersonalizedGreeting();
    
    return {
      response: `## Vehicle Details

${personalizedGreeting} I'll show you the detailed information for your vehicle!

**Your IE-Sedan Specifications:**
• **Model:** IE-Sedan Premium
• **VIN:** 1HGBH41JXMN109186
• **Software Version:** 2024.12.5 (Latest)

**Performance & Range:**
• **Range:** 320 miles (estimated)
• **Battery Health:** 98% (Excellent)
• **Battery Capacity:** 82 kWh

**Warranty Information:**
• **Type:** Full Vehicle Warranty
• **Expires:** October 20, 2028

Your vehicle is in excellent condition and running the latest software!`,
      tool: {
        name: "view_vehicle_details",
        payload: {
          vin: "1HGBH41JXMN109186",
          suggestedFollowUps: suggestions.slice(0, 3)
        }
      }
    };
  }

  // Generate service history response
  private generateServiceHistoryResponse(serviceHistory: Record<string, ServiceRecord[]>, suggestions: string[]): { response: string; tool: any } {
    const personalizedGreeting = this.getPersonalizedGreeting();
    
    return {
      response: `## Service History

${personalizedGreeting} I'll show you the complete service history for your vehicle!

**Your IE-Sedan Service Record:**
• **Total Services:** 3 completed
• **Last Service:** October 22, 2023
• **Next Recommended:** April 2024

**Recent Service History:**
• **Oct 22, 2023** - Tire Rotation & Balance ($150)
• **Apr 15, 2023** - Cabin Air Filter Replacement ($85)
• **Oct 20, 2022** - Initial Delivery Inspection ($0)

**Service Summary:**
• All services completed on schedule
• No outstanding issues
• Vehicle in excellent condition

Your vehicle has been well-maintained with regular service intervals!`,
      tool: {
        name: "view_service_history",
        payload: {
          vin: "1HGBH41JXMN109186",
          suggestedFollowUps: suggestions.slice(0, 3)
        }
      }
    };
  }

  // Generate contextual response for medium confidence
  private generateContextualResponse(intent: string, suggestions: string[]): { response: string; tool: any } {
    const personalizedGreeting = this.getPersonalizedGreeting();
    
    return {
      response: `## ${this.getIntentTitle(intent)}

${personalizedGreeting} I understand you're interested in ${intent.replace('_', ' ')}. Let me help you with that!

Based on your request, I can assist you with:

${suggestions.map(suggestion => `• ${suggestion}`).join('\n')}

**How would you like to proceed?**`,
      tool: {
        name: "show_generic_info",
        payload: {
          title: this.getIntentTitle(intent),
          content: `I'm here to help you with ${intent.replace('_', ' ')}. What specific information would you like?`,
          suggestedFollowUps: suggestions.slice(0, 3)
        }
      }
    };
  }

  // Generate default response for low confidence
  private generateDefaultResponse(suggestions: string[]): { response: string; tool: any } {
    const personalizedGreeting = this.getPersonalizedGreeting();
    
    return {
      response: `## Hello! I'm Aura

${personalizedGreeting} Your **IE Vehicle Concierge** AI assistant!`,
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

**What would you like to do?**`,
          suggestedFollowUps: suggestions.slice(0, 3)
        }
      }
    };
  }

  // Helper methods
  private getPersonalizedGreeting(): string {
    const hour = new Date().getHours();
    const name = this.userProfile.name;
    
    if (hour < 12) {
      return `Good morning ${name}!`;
    } else if (hour < 17) {
      return `Good afternoon ${name}!`;
    } else {
      return `Good evening ${name}!`;
    }
  }

  private getVehicleDescription(model: string): string {
    const descriptions: Record<string, string> = {
      'IE-Sedan': 'Premium electric sedan with 320-mile range',
      'IE-SUV': 'Versatile electric SUV with towing capability',
      'IE-Apex': 'High-performance sports model with track mode'
    };
    return descriptions[model] || 'Advanced electric vehicle';
  }

  private findNearestDealer(dealers: Dealer[]): Dealer | null {
    return dealers.length > 0 ? dealers[0] : null;
  }

  private getIntentTitle(intent: string): string {
    const titles: Record<string, string> = {
      'fleet_management': 'Fleet Management',
      'service_booking': 'Service Booking',
      'test_drive': 'Test Drive',
      'vehicle_details': 'Vehicle Details',
      'service_history': 'Service History'
    };
    return titles[intent] || 'Vehicle Assistance';
  }

  private updateUserProfileFromInteraction(prompt: string, analysis: any): void {
    // Update user profile based on interaction
    this.userProfile.context.recentSearches.push(prompt);
    this.userProfile.context.lastInteraction = new Date();
    
    // Keep only last 10 searches
    if (this.userProfile.context.recentSearches.length > 10) {
      this.userProfile.context.recentSearches = this.userProfile.context.recentSearches.slice(-10);
    }
    
    // Update frequent actions
    if (!this.userProfile.behavior.frequentActions.includes(analysis.personalization.intent)) {
      this.userProfile.behavior.frequentActions.push(analysis.personalization.intent);
    }
  }

  // Get current user profile
  getUserProfile(): UserProfile {
    return this.userProfile;
  }

  // Update user profile
  updateUserProfile(updates: Partial<UserProfile>): void {
    this.userProfile = { ...this.userProfile, ...updates };
    this.personalizationService.updateUserProfile(this.userProfile);
  }
}

// Export singleton instance
export const enhancedAIService = new EnhancedAIService();
