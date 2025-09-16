import { ServiceRecord } from "../types";

export const MOCK_SERVICE_HISTORY: Record<string, ServiceRecord[]> = {
    "JN8AZ13E35T000123": [
        { id: '1', date: '2023-10-22', service: 'Tire Rotation & Balance', cost: 150, notes: 'Checked tire pressure and tread depth. All normal.' },
        { id: '2', date: '2023-04-15', service: 'Cabin Air Filter Replacement', cost: 85, notes: 'Replaced standard cabin air filter.' },
        { id: '3', date: '2022-10-20', service: 'Initial Delivery Inspection', cost: 0, notes: 'Vehicle delivered and inspected.' },
    ],
    "JN8AZ13E35T000456": [
        { id: '1', date: '2024-01-05', service: 'Brake Fluid Check & Top-up', cost: 120, notes: 'Fluid level optimal, no leaks detected.' },
        { id: '2', date: '2023-07-11', service: 'Software Update & Diagnostics', cost: 0, notes: 'Updated to version 2023.44.2. No fault codes.' },
    ]
}
