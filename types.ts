export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  tool?: {
    name:string;
    payload?: any & { suggestedFollowUps?: string[] };
  };
  imageUrl?: string;
  error?: string;
  timestamp?: string;
}

export interface Vehicle {
  id: string;
  vin: string;
  model: string;
  imageUrl: string;
}

export interface Dealer {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating?: number;
  services?: string[];
}

export interface ServiceRecord {
  id: string;
  date: string;
  service: string;
  cost: number;
  notes: string;
}

export interface VehicleDetails extends Vehicle {
    softwareVersion: string;
    range: {
        estimate: number;
        unit: 'miles' | 'km';
    };
    battery: {
        health: number;
        capacity: number;
        unit: 'kWh';
    };
    warranty: {
        expires: string;
        type: string;
    }
}
