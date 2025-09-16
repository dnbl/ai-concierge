import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SmartInput from '../../components/molecules/SmartInput';

describe('SmartInput', () => {
  const mockOnSend = jest.fn();
  const mockOnAttachmentSelect = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with placeholder text', () => {
    render(
      <SmartInput 
        placeholder="Test placeholder" 
        onSend={mockOnSend} 
      />
    );
    
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('sends message when form is submitted', async () => {
    const user = userEvent.setup();
    
    render(
      <SmartInput 
        placeholder="Type message" 
        onSend={mockOnSend} 
      />
    );
    
    const input = screen.getByPlaceholderText('Type message');
    const sendButton = screen.getByLabelText('Send message');
    
    await user.type(input, 'Hello world');
    await user.click(sendButton);
    
    expect(mockOnSend).toHaveBeenCalledWith('Hello world', null);
  });

  it('sends message with Enter key', async () => {
    const user = userEvent.setup();
    
    render(
      <SmartInput 
        placeholder="Type message" 
        onSend={mockOnSend} 
      />
    );
    
    const input = screen.getByPlaceholderText('Type message');
    
    await user.type(input, 'Hello world{enter}');
    
    expect(mockOnSend).toHaveBeenCalledWith('Hello world', null);
  });

  it('shows attachment preview when file is selected', async () => {
    const user = userEvent.setup();
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    
    render(
      <SmartInput 
        placeholder="Type message" 
        onSend={mockOnSend}
        onAttachmentSelect={mockOnAttachmentSelect}
        showAttachments={true}
      />
    );
    
    const attachButton = screen.getByLabelText('Add attachment');
    await user.click(attachButton);
    
    const fileInput = screen.getByLabelText('File attachment');
    await user.upload(fileInput, file);
    
    expect(mockOnAttachmentSelect).toHaveBeenCalledWith(file);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <SmartInput 
        placeholder="Type message" 
        onSend={mockOnSend}
        disabled={true}
      />
    );
    
    const input = screen.getByPlaceholderText('Type message');
    const sendButton = screen.getByLabelText('Send message');
    
    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });

  it('does not show attachment button when showAttachments is false', () => {
    render(
      <SmartInput 
        placeholder="Type message" 
        onSend={mockOnSend}
        showAttachments={false}
      />
    );
    
    expect(screen.queryByLabelText('Add attachment')).not.toBeInTheDocument();
  });

  it('does not show voice button when showVoice is false', () => {
    render(
      <SmartInput 
        placeholder="Type message" 
        onSend={mockOnSend}
        showVoice={false}
      />
    );
    
    expect(screen.queryByLabelText(/voice recording/i)).not.toBeInTheDocument();
  });
});