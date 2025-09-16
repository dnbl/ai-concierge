import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast, useToastHelpers } from '../../components/atoms/Toast';
import { ThemeProvider } from '../../components/providers/ThemeProvider';
import AccessibleButton from '../../components/atoms/AccessibleButton';

// Demo component to trigger toasts
const ToastDemo = () => {
  const toastHelpers = useToastHelpers();

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-lg font-semibold text-primary">Toast Notifications Demo</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <AccessibleButton
          variant="primary"
          onClick={() => toastHelpers.success('Success!', 'Your action was completed successfully.')}
        >
          Show Success
        </AccessibleButton>
        
        <AccessibleButton
          variant="danger"
          onClick={() => toastHelpers.error('Error!', 'Something went wrong. Please try again.')}
        >
          Show Error
        </AccessibleButton>
        
        <AccessibleButton
          variant="secondary"
          onClick={() => toastHelpers.warning('Warning!', 'Please review your settings before continuing.')}
        >
          Show Warning
        </AccessibleButton>
        
        <AccessibleButton
          variant="ghost"
          onClick={() => toastHelpers.info('Info', 'Here is some helpful information for you.')}
        >
          Show Info
        </AccessibleButton>
      </div>

      <div className="mt-4">
        <AccessibleButton
          onClick={() => 
            toastHelpers.success('With Action', 'This toast has an action button.', {
              label: 'Undo',
              onClick: () => toastHelpers.info('Undone!', 'Action was undone.')
            })
          }
        >
          Toast with Action
        </AccessibleButton>
      </div>

      <div className="mt-4">
        <AccessibleButton
          variant="secondary"
          onClick={() => {
            // Show multiple toasts
            setTimeout(() => toastHelpers.info('First', 'This is the first toast'), 0);
            setTimeout(() => toastHelpers.success('Second', 'This is the second toast'), 500);
            setTimeout(() => toastHelpers.warning('Third', 'This is the third toast'), 1000);
          }}
        >
          Multiple Toasts
        </AccessibleButton>
      </div>
    </div>
  );
};

const meta: Meta<typeof ToastDemo> = {
  title: 'Atoms/Toast',
  component: ToastDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive toast notification system with multiple types, themes, and accessibility features. Supports action buttons and automatic stacking.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <ToastProvider>
          <div className="min-h-screen bg-surface p-8">
            <Story />
          </div>
        </ToastProvider>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {};

export const LightTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="light">
        <ToastProvider>
          <div className="min-h-screen bg-surface p-8">
            <Story />
          </div>
        </ToastProvider>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: { default: 'light' },
  },
};

export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark">
        <ToastProvider>
          <div className="min-h-screen bg-surface p-8">
            <Story />
          </div>
        </ToastProvider>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Static toast examples for documentation
const StaticToastExamples = () => (
  <div className="space-y-4 p-4">
    <div className="space-y-2">
      <h4 className="font-medium text-primary">Toast Types:</h4>
      <div className="space-y-2 max-w-sm">
        {/* These would be rendered as static examples */}
        <div className="bg-green-800 border-green-600 text-green-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">✓</div>
            <div className="ml-3">
              <p className="text-sm font-medium">Success Toast</p>
              <p className="mt-1 text-sm opacity-90">Action completed successfully</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-800 border-red-600 text-red-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">✕</div>
            <div className="ml-3">
              <p className="text-sm font-medium">Error Toast</p>
              <p className="mt-1 text-sm opacity-90">Something went wrong</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-800 border-yellow-600 text-yellow-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">⚠</div>
            <div className="ml-3">
              <p className="text-sm font-medium">Warning Toast</p>
              <p className="mt-1 text-sm opacity-90">Please review your settings</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-800 border-blue-600 text-blue-100 p-4 rounded-lg shadow-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">ℹ</div>
            <div className="ml-3">
              <p className="text-sm font-medium">Info Toast</p>
              <p className="mt-1 text-sm opacity-90">Here's some helpful information</p>
              <div className="mt-3">
                <button className="text-current hover:bg-white/10 border border-current px-3 py-1 rounded text-sm">
                  Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Examples: Story = {
  render: () => <StaticToastExamples />,
  parameters: {
    docs: {
      description: {
        story: 'Static examples showing all toast types and their appearance.',
      },
    },
  },
};