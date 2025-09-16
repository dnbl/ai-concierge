import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccessibleButton } from '../../components/atoms/AccessibilityEnhancements';

describe('AccessibleButton', () => {
  it('renders with correct text', () => {
    render(<AccessibleButton>Click me</AccessibleButton>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    render(<AccessibleButton variant="primary">Primary Button</AccessibleButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-cyan-500');
  });

  it('applies correct size classes', () => {
    render(<AccessibleButton size="lg">Large Button</AccessibleButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
  });

  it('shows loading state correctly', () => {
    render(<AccessibleButton loading={true}>Loading Button</AccessibleButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('is disabled when disabled prop is true', () => {
    render(<AccessibleButton disabled={true}>Disabled Button</AccessibleButton>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it('calls onClick when clicked', async () => {
    const mockClick = jest.fn();
    const user = userEvent.setup();
    
    render(<AccessibleButton onClick={mockClick}>Clickable Button</AccessibleButton>);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard interaction', async () => {
    const mockClick = jest.fn();
    const user = userEvent.setup();
    
    render(<AccessibleButton onClick={mockClick}>Keyboard Button</AccessibleButton>);
    
    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{enter}');
    
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('displays icon when provided', () => {
    const testIcon = <span data-testid="test-icon">🔥</span>;
    render(<AccessibleButton icon={testIcon}>Icon Button</AccessibleButton>);
    
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('has proper focus management', () => {
    render(<AccessibleButton>Focus Button</AccessibleButton>);
    const button = screen.getByRole('button');
    
    // Check that focus styles are applied
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
  });
});