import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message, Vehicle, Dealer, VehicleDetails, ServiceRecord } from '../types';

interface UIState {
  isLoading: boolean;
  currentView: string;
  theme: 'dark' | 'light';
  sidebarOpen: boolean;
  notifications: boolean;
}

interface ActiveRequest {
  id: string;
  messageId: string;
  abortController?: AbortController;
  timeoutId?: number;
}

interface AppState {
  // Messages
  messages: Message[];
  currentMessage: string;
  
  // Fleet Management
  fleet: Vehicle[];
  selectedVehicle: Vehicle | null;
  
  // Data
  dealers: Dealer[];
  vehicleDetails: Record<string, VehicleDetails>;
  serviceHistory: Record<string, ServiceRecord[]>;
  
  // UI State
  ui: UIState;
  
  // Active Requests
  activeRequests: ActiveRequest[];
  
  // Actions
  addMessage: (message: Message) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  clearMessages: () => void;
  setCurrentMessage: (message: string) => void;
  
  // Fleet Actions
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  removeVehicle: (id: string) => void;
  selectVehicle: (vehicle: Vehicle | null) => void;
  
  // UI Actions
  setLoading: (loading: boolean) => void;
  setCurrentView: (view: string) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setNotifications: (enabled: boolean) => void;
  
  // Request Management Actions
  addActiveRequest: (request: ActiveRequest) => void;
  removeActiveRequest: (id: string) => void;
  cancelAllRequests: () => void;
  
  // Data Actions
  setDealers: (dealers: Dealer[]) => void;
  setVehicleDetails: (vin: string, details: VehicleDetails) => void;
  setServiceHistory: (vin: string, history: ServiceRecord[]) => void;
  clearAll: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      messages: [],
      currentMessage: '',
      fleet: [],
      selectedVehicle: null,
      dealers: [],
      vehicleDetails: {},
      serviceHistory: {},
      activeRequests: [],
      ui: {
        isLoading: false,
        currentView: 'chat',
        theme: 'dark',
        sidebarOpen: false,
        notifications: true,
      },
      
      // Message Actions
      addMessage: (message: Message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      
      updateMessage: (id: string, updates: Partial<Message>) =>
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, ...updates } : msg
          ),
        })),
      
      clearMessages: () =>
        set({ messages: [] }),
      
      setCurrentMessage: (message: string) =>
        set({ currentMessage: message }),
      
      // Fleet Actions
      addVehicle: (vehicle: Vehicle) =>
        set((state) => ({
          fleet: [...state.fleet, vehicle],
        })),
      
      updateVehicle: (id: string, updates: Partial<Vehicle>) =>
        set((state) => ({
          fleet: state.fleet.map((vehicle) =>
            vehicle.id === id ? { ...vehicle, ...updates } : vehicle
          ),
        })),
      
      removeVehicle: (id: string) =>
        set((state) => ({
          fleet: state.fleet.filter((vehicle) => vehicle.id !== id),
          selectedVehicle: state.selectedVehicle?.id === id ? null : state.selectedVehicle,
        })),
      
      selectVehicle: (vehicle: Vehicle | null) =>
        set({ selectedVehicle: vehicle }),
      
      // UI Actions
      setLoading: (loading: boolean) =>
        set((state) => ({
          ui: { ...state.ui, isLoading: loading },
        })),
      
      setCurrentView: (view: string) =>
        set((state) => ({
          ui: { ...state.ui, currentView: view },
        })),
      
      toggleTheme: () =>
        set((state) => ({
          ui: {
            ...state.ui,
            theme: state.ui.theme === 'dark' ? 'light' : 'dark',
          },
        })),
      
      toggleSidebar: () =>
        set((state) => ({
          ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
        })),
      
      setNotifications: (enabled: boolean) =>
        set((state) => ({
          ui: { ...state.ui, notifications: enabled },
        })),
      
      // Request Management Actions
      addActiveRequest: (request: ActiveRequest) =>
        set((state) => ({
          activeRequests: [...state.activeRequests, request],
        })),
      
      removeActiveRequest: (id: string) =>
        set((state) => ({
          activeRequests: state.activeRequests.filter(req => req.id !== id),
        })),
      
      cancelAllRequests: () => {
        const state = get();
        // Cancel all active requests
        state.activeRequests.forEach(request => {
          if (request.abortController) {
            request.abortController.abort();
          }
          if (request.timeoutId) {
            clearTimeout(request.timeoutId);
          }
        });
        // Clear the activeRequests array and stop loading
        set({ 
          activeRequests: [],
          ui: { ...state.ui, isLoading: false }
        });
      },
      
      // Data Actions
      setDealers: (dealers: Dealer[]) =>
        set({ dealers }),
      
      setVehicleDetails: (vin: string, details: VehicleDetails) =>
        set((state) => ({
          vehicleDetails: { ...state.vehicleDetails, [vin]: details },
        })),
      
      setServiceHistory: (vin: string, history: ServiceRecord[]) =>
        set((state) => ({
          serviceHistory: { ...state.serviceHistory, [vin]: history },
        })),

      // Clear all data (useful for debugging)
      clearAll: () => {
        const state = get();
        // Cancel any active requests first
        state.activeRequests.forEach(request => {
          if (request.abortController) {
            request.abortController.abort();
          }
          if (request.timeoutId) {
            clearTimeout(request.timeoutId);
          }
        });
        set({
          messages: [],
          currentMessage: '',
          selectedVehicle: null,
          activeRequests: [],
          ui: {
            isLoading: false,
            currentView: 'chat',
            theme: 'dark',
            sidebarOpen: false,
            notifications: true,
          },
        });
      },
    }),
    {
      name: 'ie-concierge-storage',
      partialize: (state) => ({
        // Don't persist messages - always start with empty array for welcome screen
        fleet: state.fleet,
        selectedVehicle: state.selectedVehicle,
        ui: {
          theme: state.ui.theme,
          notifications: state.ui.notifications,
        },
      }),
    }
  )
);

// Selectors for better performance
export const useMessages = () => useAppStore((state) => state.messages);
export const useFleet = () => useAppStore((state) => state.fleet);
export const useSelectedVehicle = () => useAppStore((state) => state.selectedVehicle);
export const useUI = () => useAppStore((state) => state.ui);
export const useIsLoading = () => useAppStore((state) => state.ui.isLoading);
export const useTheme = () => useAppStore((state) => state.ui.theme);
export const useActiveRequests = () => useAppStore((state) => state.activeRequests);
export const useHasActiveRequests = () => useAppStore((state) => state.activeRequests.length > 0);
