import { Vehicle, VehicleDetails, ServiceRecord, Dealer } from '../types';

// Enhanced vehicle data with more realistic information
export const ENHANCED_VEHICLES: Vehicle[] = [
    { 
        id: '1', 
        vin: 'JN8AZ13E35T000123', 
        model: 'IE-Sedan', 
        imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center' 
    },
    { 
        id: '2', 
        vin: 'JN8AZ13E35T000456', 
        model: 'IE-SUV', 
        imageUrl: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop&crop=center' 
    },
    { 
        id: '3', 
        vin: 'JN8AZ13E35T000789', 
        model: 'IE-Apex', 
        imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&crop=center' 
    },
];

// Enhanced vehicle details with comprehensive information
export const ENHANCED_VEHICLE_DETAILS: Record<string, VehicleDetails> = {
    "JN8AZ13E35T000123": {
        id: '1',
        vin: 'JN8AZ13E35T000123',
        model: 'IE-Sedan',
        imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop&crop=center',
        softwareVersion: '2024.12.5',
        range: {
            estimate: 320,
            unit: 'miles',
        },
        battery: {
            health: 98,
            capacity: 82,
            unit: 'kWh',
        },
        warranty: {
            expires: '2028-10-20',
            type: 'Full Vehicle',
        }
    },
    "JN8AZ13E35T000456": {
        id: '2',
        vin: 'JN8AZ13E35T000456',
        model: 'IE-SUV',
        imageUrl: 'https://images.unsplash.com/photo-1549317336-206569e8475c?w=400&h=300&fit=crop&crop=center',
        softwareVersion: '2024.12.2',
        range: {
            estimate: 295,
            unit: 'miles',
        },
        battery: {
            health: 99,
            capacity: 95,
            unit: 'kWh',
        },
        warranty: {
            expires: '2029-01-15',
            type: 'Full Vehicle',
        }
    },
    "JN8AZ13E35T000789": {
        id: '3',
        vin: 'JN8AZ13E35T000789',
        model: 'IE-Apex',
        imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop&crop=center',
        softwareVersion: '2024.12.8',
        range: {
            estimate: 280,
            unit: 'miles',
        },
        battery: {
            health: 100,
            capacity: 100,
            unit: 'kWh',
        },
        warranty: {
            expires: '2029-03-10',
            type: 'Full Vehicle',
        }
    }
};

// Enhanced service history with more detailed records
export const ENHANCED_SERVICE_HISTORY: Record<string, ServiceRecord[]> = {
    "JN8AZ13E35T000123": [
        { 
            id: '1', 
            date: '2023-10-22', 
            service: 'Tire Rotation & Balance', 
            cost: 150, 
            notes: 'Checked tire pressure and tread depth. All normal. Recommended next rotation in 6 months.' 
        },
        { 
            id: '2', 
            date: '2023-04-15', 
            service: 'Cabin Air Filter Replacement', 
            cost: 85, 
            notes: 'Replaced standard cabin air filter. System functioning optimally.' 
        },
        { 
            id: '3', 
            date: '2022-10-20', 
            service: 'Initial Delivery Inspection', 
            cost: 0, 
            notes: 'Vehicle delivered and inspected. All systems checked and functioning properly.' 
        },
    ],
    "JN8AZ13E35T000456": [
        { 
            id: '1', 
            date: '2024-01-05', 
            service: 'Brake Fluid Check & Top-up', 
            cost: 120, 
            notes: 'Fluid level optimal, no leaks detected. Brake pads at 85% remaining.' 
        },
        { 
            id: '2', 
            date: '2023-07-11', 
            service: 'Software Update & Diagnostics', 
            cost: 0, 
            notes: 'Updated to version 2023.44.2. No fault codes detected. Performance optimized.' 
        },
        { 
            id: '3', 
            date: '2023-01-15', 
            service: 'Annual Safety Inspection', 
            cost: 200, 
            notes: 'Complete safety inspection passed. All systems functioning within specifications.' 
        },
    ],
    "JN8AZ13E35T000789": [
        { 
            id: '1', 
            date: '2024-02-10', 
            service: 'Performance Tuning', 
            cost: 300, 
            notes: 'High-performance mode optimization. Track-ready configuration applied.' 
        },
        { 
            id: '2', 
            date: '2023-12-01', 
            service: 'Premium Tire Installation', 
            cost: 800, 
            notes: 'Installed high-performance summer tires. Improved grip and handling.' 
        },
    ]
};

// Enhanced dealer information
export const ENHANCED_DEALERS: Dealer[] = [
    { 
        id: '1', 
        name: 'Infinite Auto SF', 
        location: 'San Francisco, CA',
        distance: '2.3 miles',
        rating: 4.8,
        services: ['Sales', 'Service', 'Parts', 'Body Shop']
    },
    { 
        id: '2', 
        name: 'Infinite Auto Palo Alto', 
        location: 'Palo Alto, CA',
        distance: '8.7 miles',
        rating: 4.9,
        services: ['Sales', 'Service', 'Parts', 'Charging Station']
    },
    { 
        id: '3', 
        name: 'Infinite Auto LA', 
        location: 'Los Angeles, CA',
        distance: '45.2 miles',
        rating: 4.7,
        services: ['Sales', 'Service', 'Parts', 'Body Shop', 'Charging Station']
    },
];

// Service appointment slots
export const SERVICE_SLOTS = [
    { date: '2024-01-15', time: '09:00', available: true },
    { date: '2024-01-15', time: '11:30', available: true },
    { date: '2024-01-15', time: '14:00', available: false },
    { date: '2024-01-15', time: '16:30', available: true },
    { date: '2024-01-16', time: '09:00', available: true },
    { date: '2024-01-16', time: '11:30', available: true },
    { date: '2024-01-16', time: '14:00', available: true },
    { date: '2024-01-16', time: '16:30', available: false },
];

// Test drive availability
export const TEST_DRIVE_SLOTS = [
    { date: '2024-01-15', time: '10:00', model: 'IE-Sedan', available: true },
    { date: '2024-01-15', time: '14:00', model: 'IE-SUV', available: true },
    { date: '2024-01-15', time: '16:00', model: 'IE-Apex', available: false },
    { date: '2024-01-16', time: '10:00', model: 'IE-Sedan', available: true },
    { date: '2024-01-16', time: '14:00', model: 'IE-SUV', available: true },
    { date: '2024-01-16', time: '16:00', model: 'IE-Apex', available: true },
];
