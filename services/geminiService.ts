import { Message } from "../types";
import { MANUAL_DATA } from "../data/manualData";

// Mock AI service - no external API required

// Available tools for the mock AI
const availableTools = [
  "view_fleet",
  "add_vehicle", 
  "book_service",
  "book_test_drive",
  "request_call",
  "view_vehicle_details",
  "view_service_history",
  "show_generic_info"
];

// Mock AI responses based on user input with continuous follow-up questions
const getMockResponse = (prompt: string): { text?: string; tool?: { name: string; payload: any } } => {
    const lowerPrompt = prompt.toLowerCase();
    
    // Fleet-related responses
    if (lowerPrompt.includes('fleet') || lowerPrompt.includes('vehicles') || lowerPrompt.includes('cars')) {
        return {
            text: `## 🚗 Your Vehicle Fleet

I'll show you your current vehicle fleet. You currently have **2 vehicles** registered:

• **IE-Sedan** - Premium electric sedan
• **IE-SUV** - Versatile electric SUV

Each vehicle is equipped with our latest technology and is ready for your next adventure!`,
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
    
    // Add vehicle responses
    if (lowerPrompt.includes('add') && (lowerPrompt.includes('vehicle') || lowerPrompt.includes('car'))) {
        return {
            text: `## Add New Vehicle

I'll help you add a new vehicle to your fleet! 

### **Required Information**

**To get started, I'll need:**
• Vehicle model (e.g., IE-Sedan, IE-SUV, IE-Apex)
• 17-digit VIN number

### **Available Models**

• **IE-Sedan** - Premium electric sedan with 320-mile range
• **IE-SUV** - Versatile electric SUV with towing capability
• **IE-Apex** - High-performance sports model with track mode

### **What Happens Next**

Once added, you'll be able to:
• Manage service appointments
• View detailed specifications
• Track maintenance history
• Monitor battery health
• Access warranty information

---

**Ready to add your vehicle?**`,
            tool: { 
                name: "add_vehicle", 
                payload: { 
                    model: "IE-Sedan", 
                    vin: "1HGBH41JXMN109186",
                    suggestedFollowUps: [
                        "View my updated fleet",
                        "Set up service for this new vehicle",
                        "Schedule a test drive for another model"
                    ]
                }
            }
        };
    }
    
    // Service booking responses
    if (lowerPrompt.includes('service') || lowerPrompt.includes('maintenance') || lowerPrompt.includes('repair')) {
        return {
            text: `I'll help you book a service appointment for your vehicle. Let me set up the booking form for you.`,
            tool: { 
        name: "book_service",
                payload: { 
                    vin: "1HGBH41JXMN109186",
                    suggestedFollowUps: [
                        "Check my service history",
                        "View my vehicle details",
                        "Request a callback from service team"
                    ]
                }
            }
        };
    }
    
    // Test drive responses
    if (lowerPrompt.includes('test drive') || lowerPrompt.includes('testdrive')) {
        return {
            text: `## Test Drive Booking

I'll help you book a test drive for one of our vehicles!

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
                    suggestedFollowUps: [
                        "Compare different models",
                        "Learn about financing options",
                        "Schedule a virtual consultation"
                    ]
                }
            }
        };
    }
    
    // Call request responses
    if (lowerPrompt.includes('call') || lowerPrompt.includes('contact') || lowerPrompt.includes('speak')) {
        return {
            text: `## Request a Callback

I'll help you request a callback from our expert team!

**Our Specialists Can Help With:**
• **Sales Questions** - Model comparisons, pricing, financing
• **Service Support** - Maintenance, repairs, warranty
• **Technical Assistance** - Software updates, troubleshooting
• **General Inquiries** - Any questions about IE vehicles

**Callback Details:**
• **Response Time:** Within 2 hours during business hours
• **Duration:** 15-30 minutes based on your needs
• **Expert:** Matched to your specific inquiry type

**What would you like to discuss?**
Please let me know your topic so I can connect you with the right specialist.`,
            tool: { 
        name: "request_call",
                payload: { 
                    topic: "General inquiry",
                    suggestedFollowUps: [
                        "Book a service appointment",
                        "Schedule a test drive",
                        "Learn about vehicle features"
                    ]
                }
            }
        };
    }
    
    // Vehicle details responses
    if (lowerPrompt.includes('details') || lowerPrompt.includes('specifications') || lowerPrompt.includes('specs')) {
        return {
            text: `## Vehicle Details

I'll show you the detailed information for your vehicle!

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
                    suggestedFollowUps: [
                        "Check my service history",
                        "Book a maintenance appointment",
                        "Learn about software updates"
                    ]
                }
            }
        };
    }
    
    // Service history responses
    if (lowerPrompt.includes('history') || lowerPrompt.includes('service history') || lowerPrompt.includes('maintenance history')) {
        return {
            text: `## Service History

I'll show you the complete service history for your vehicle!

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
                    suggestedFollowUps: [
                        "Schedule my next service",
                        "View vehicle details",
                        "Get maintenance reminders"
                    ]
                }
            }
        };
    }
    
    // Generic information responses
    if (lowerPrompt.includes('help') || lowerPrompt.includes('information') || lowerPrompt.includes('about')) {
        return {
            text: `## Welcome to IE Vehicle Concierge

I'm **Aura**, your AI assistant for IE electric vehicles!`,
            tool: { 
                name: "show_generic_info", 
                payload: { 
                    title: "How Can I Help You Today?",
                    content: `## 🚗 IE Vehicle Concierge Services

I'm here to assist you with all your IE vehicle needs. Here's what I can help you with:

### **Fleet Management**
• View your current vehicle fleet
• Add new vehicles to your account
• Manage vehicle information and details

### **Service & Maintenance**
• Book service appointments
• View service history and records
• Schedule routine maintenance
• Get maintenance reminders

### **Test Drives & Sales**
• Schedule test drives for new models
• Compare different vehicle options
• Learn about financing and pricing
• Connect with sales specialists

### **Vehicle Information**
• View detailed specifications
• Check software versions and updates
• Monitor battery health and range
• Access warranty information

### **Support & Assistance**
• Request callbacks from our team
• Get technical support
• Troubleshoot issues
• General inquiries

**What would you like to do today?**`,
                    suggestedFollowUps: [
                        "Show me my vehicle fleet",
                        "Book a service appointment", 
                        "Schedule a test drive"
                    ]
                }
            }
        };
    }
    
    // Default response
        return {
            text: `## Hello! I'm Aura

Your **IE Vehicle Concierge** AI assistant!`,
        tool: { 
            name: "show_generic_info", 
            payload: { 
                title: "Welcome to IE Vehicle Concierge",
                content: `## 🚗 How Can I Help You Today?

I'm here to assist you with all your IE vehicle needs. Here are some popular options:

### **Quick Actions**
• **View Fleet** - See your current vehicles
• **Book Service** - Schedule maintenance appointments  
• **Test Drive** - Try out new IE models
• **Get Support** - Connect with our team

### **Vehicle Management**
• Add new vehicles to your fleet
• View detailed specifications
• Check service history
• Monitor battery health

### **Services Available**
• Routine maintenance scheduling
• Software update assistance
• Warranty information
• Technical support

**What would you like to do first?**`,
                suggestedFollowUps: [
                    "View my vehicle fleet",
                    "Book a service appointment",
                    "Schedule a test drive"
                ]
            }
        }
    };
};

// Enhanced context awareness for more sophisticated responses
const getContextualResponse = (prompt: string, history: Message[]): { text?: string; tool?: { name: string; payload: any } } => {
    const lowerPrompt = prompt.toLowerCase();
    const recentMessages = history.slice(-3).map(m => m.text.toLowerCase()).join(' ');
    
    // Check for conversation context
    const isFollowUp = history.length > 1;
    const lastTool = history[history.length - 1]?.tool?.name;
    
    // Enhanced responses based on context
    if (lowerPrompt.includes('fleet') || lowerPrompt.includes('vehicles') || lowerPrompt.includes('cars')) {
        const fleetCount = recentMessages.includes('add') ? '3' : '2';
        return {
            text: `## Your Vehicle Fleet

I'll show you your current vehicle fleet. You currently have **${fleetCount} vehicles** registered:

### **Vehicle Overview**

• **IE-Sedan** - Premium electric sedan with 320-mile range
• **IE-SUV** - Versatile electric SUV with towing capability${fleetCount === '3' ? '\n• **IE-Apex** - High-performance sports model' : ''}

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
    
    // Context-aware service responses
    if (lowerPrompt.includes('service') || lowerPrompt.includes('maintenance') || lowerPrompt.includes('repair')) {
        const urgency = lowerPrompt.includes('urgent') || lowerPrompt.includes('emergency') ? 'urgent' : 'routine';
        const vehicleType = recentMessages.includes('sedan') ? 'IE-Sedan' : recentMessages.includes('suv') ? 'IE-SUV' : 'your vehicle';
        
        return {
            text: `I'll help you book a **${urgency}** service appointment for ${vehicleType}. Let me set up the booking form for you.`,
            tool: { 
                name: "book_service", 
                payload: { 
                    vin: "1HGBH41JXMN109186",
                    urgency: urgency,
                    suggestedFollowUps: [
                        "Check my service history",
                        "View my vehicle details",
                        "Request a callback from service team"
                    ]
                }
            }
        };
    }
    
    // Return the original response if no context match
    return getMockResponse(prompt);
};

// Simulate API delay with realistic variation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sendMessageToGemini = async (prompt: string, history: Message[], attachment?: { data: string; mimeType: string }): Promise<Message> => {
    try {
        // Simulate realistic API call delay (500ms - 2s)
        const delayTime = 500 + Math.random() * 1500;
        await delay(delayTime);
        
        // Use contextual response for more sophisticated AI behavior
        const response = getContextualResponse(prompt, history);
        
        if (response.tool) {
            return {
                id: Date.now().toString(),
                sender: 'agent',
                text: response.text || `Aura is using the ${response.tool.name} tool...`,
                tool: response.tool
            };
        }
        
        return {
            id: Date.now().toString(),
            sender: 'agent',
            text: response.text || 'Hello! How can I help you with your IE vehicle today?',
        };
    } catch (e) {
        console.error(e);
        const error = e as Error;
        return {
            id: Date.now().toString(),
            sender: 'agent',
            text: '',
            error: error.message || 'An unknown error occurred while processing your request.',
        };
    }
}