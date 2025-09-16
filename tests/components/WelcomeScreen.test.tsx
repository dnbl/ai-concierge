import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WelcomeScreen from '../../components/organisms/WelcomeScreen';

// Mock the hooks
jest.mock('../../hooks/usePerformanceOptimization', () => ({
  usePerformanceMonitoring: jest.fn(() => ({ renderCount: 1 }))
}));

describe('WelcomeScreen', () => {
  const mockOnActionClick = jest.fn();
  const mockOnSendMessage = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders welcome message correctly', () => {
    render(
      <WelcomeScreen
        onActionClick={mockOnActionClick}
        onSendMessage={mockOnSendMessage}
      />
    );
    
    expect(screen.getByText('Welcome to Aura AI')).toBeInTheDocument();
    expect(screen.getByText('Your intelligent IE Vehicle Concierge')).toBeInTheDocument();
    expect(screen.getByText('How can I help you today?')).toBeInTheDocument();
  });

  it('renders all quick action buttons', () => {
    render(
      <WelcomeScreen
        onActionClick={mockOnActionClick}
        onSendMessage={mockOnSendMessage}
      />
    );
    
    expect(screen.getByText('View Fleet')).toBeInTheDocument();
    expect(screen.getByText('Book Service')).toBeInTheDocument();
    expect(screen.getByText('Test Drive')).toBeInTheDocument();
    expect(screen.getByText('Vehicle Info')).toBeInTheDocument();
  });

  it('calls onActionClick when quick action is clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <WelcomeScreen
        onActionClick={mockOnActionClick}
        onSendMessage={mockOnSendMessage}
      />
    );
    
    const viewFleetButton = screen.getByText('View Fleet');
    await user.click(viewFleetButton);
    
    expect(mockOnActionClick).toHaveBeenCalledWith('Show me my vehicle fleet');
  });

  it('has proper accessibility attributes', () => {
    render(
      <WelcomeScreen
        onActionClick={mockOnActionClick}
        onSendMessage={mockOnSendMessage}
      />
    );
    
    // Check for skip links
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
    expect(screen.getByText('Skip to quick actions')).toBeInTheDocument();
    
    // Check for proper ARIA labels
    const viewFleetButton = screen.getByLabelText(/View Fleet: See your current vehicles/);
    expect(viewFleetButton).toBeInTheDocument();
  });

  it('renders SmartInput component', () => {
    render(
      <WelcomeScreen
        onActionClick={mockOnActionClick}
        onSendMessage={mockOnSendMessage}
      />
    );
    
    expect(screen.getByPlaceholderText('Ask me anything about your vehicles...')).toBeInTheDocument();
  });

  it('shows help text', () => {
    render(
      <WelcomeScreen
        onActionClick={mockOnActionClick}
        onSendMessage={mockOnSendMessage}
      />
    );
    
    expect(screen.getByText(/I can help with fleet management/)).toBeInTheDocument();
    expect(screen.getByText(/You can also attach files/)).toBeInTheDocument();
  });

  it('has proper main content structure', () => {
    render(
      <WelcomeScreen
        onActionClick={mockOnActionClick}
        onSendMessage={mockOnSendMessage}
      />
    );
    
    const mainContent = document.getElementById('main-content');
    const quickActions = document.getElementById('quick-actions');
    
    expect(mainContent).toBeInTheDocument();
    expect(quickActions).toBeInTheDocument();
  });
});