import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: {
    language: string;
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  recentActions: Array<{
    id: string;
    action: string;
    timestamp: number;
    category: 'fleet' | 'service' | 'testdrive' | 'info';
  }>;
  quickActionUsage: Record<string, number>;
  favoriteActions: string[];
}

interface UserProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  
  // Actions
  setProfile: (profile: UserProfile) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addRecentAction: (action: string, category: UserProfile['recentActions'][0]['category']) => void;
  incrementActionUsage: (action: string) => void;
  toggleFavoriteAction: (action: string) => void;
  clearProfile: () => void;
}

// Mock user profile for demonstration
const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  preferences: {
    language: 'en',
    theme: 'dark',
    notifications: true
  },
  recentActions: [
    {
      id: 'action-1',
      action: 'Show me my vehicle fleet',
      timestamp: Date.now() - 86400000, // 1 day ago
      category: 'fleet'
    },
    {
      id: 'action-2', 
      action: 'I need to book a service appointment',
      timestamp: Date.now() - 172800000, // 2 days ago
      category: 'service'
    },
    {
      id: 'action-3',
      action: 'Tell me about my vehicles',
      timestamp: Date.now() - 259200000, // 3 days ago
      category: 'info'
    }
  ],
  quickActionUsage: {
    'Show me my vehicle fleet': 15,
    'I need to book a service appointment': 8,
    'Tell me about my vehicles': 12,
    'I want to schedule a test drive': 3
  },
  favoriteActions: [
    'Show me my vehicle fleet',
    'I need to book a service appointment'
  ]
};

export const useUserProfile = create<UserProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      
      setProfile: (profile: UserProfile) =>
        set({ profile }),
      
      updateProfile: (updates: Partial<UserProfile>) =>
        set((state) => ({
          profile: state.profile ? { ...state.profile, ...updates } : null
        })),
      
      addRecentAction: (action: string, category: UserProfile['recentActions'][0]['category']) =>
        set((state) => {
          if (!state.profile) return state;
          
          const newAction = {
            id: `action-${Date.now()}`,
            action,
            timestamp: Date.now(),
            category
          };
          
          const recentActions = [newAction, ...state.profile.recentActions]
            .slice(0, 10); // Keep only last 10 actions
          
          return {
            profile: {
              ...state.profile,
              recentActions
            }
          };
        }),
      
      incrementActionUsage: (action: string) =>
        set((state) => {
          if (!state.profile) return state;
          
          const quickActionUsage = {
            ...state.profile.quickActionUsage,
            [action]: (state.profile.quickActionUsage[action] || 0) + 1
          };
          
          return {
            profile: {
              ...state.profile,
              quickActionUsage
            }
          };
        }),
      
      toggleFavoriteAction: (action: string) =>
        set((state) => {
          if (!state.profile) return state;
          
          const favoriteActions = state.profile.favoriteActions.includes(action)
            ? state.profile.favoriteActions.filter(a => a !== action)
            : [...state.profile.favoriteActions, action];
          
          return {
            profile: {
              ...state.profile,
              favoriteActions
            }
          };
        }),
      
      clearProfile: () =>
        set({ profile: null })
    }),
    {
      name: 'user-profile-storage',
      partialize: (state) => ({ profile: state.profile })
    }
  )
);

// Initialize with mock data (in real app, this would come from API)
export const initializeUserProfile = () => {
  const { profile, setProfile } = useUserProfile.getState();
  if (!profile) {
    setProfile(MOCK_USER_PROFILE);
  }
};