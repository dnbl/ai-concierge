import { VehicleDetails } from "../types";

export const MOCK_VEHICLE_DETAILS: Record<string, VehicleDetails> = {
    "JN8AZ13E35T000123": {
        id: '1',
        vin: 'JN8AZ13E35T000123',
        model: 'IE-Sedan',
        imageUrl: '/sedan.png',
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
        imageUrl: '/suv.png',
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
    }
}
