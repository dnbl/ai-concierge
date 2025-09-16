import type { Meta, StoryObj } from '@storybook/react';
import SmartInput from '../../components/molecules/SmartInput';
import { ThemeProvider } from '../../components/providers/ThemeProvider';

const meta: Meta<typeof SmartInput> = {
  title: 'Molecules/SmartInput',
  component: SmartInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An intelligent input component with file attachment support, voice recording, and accessibility features. Used for chat interfaces and message composition.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="w-96 p-4 bg-surface border border-themed rounded-lg">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
    showAttachments: {
      control: 'boolean',
      description: 'Shows the attachment button',
    },
    showVoice: {
      control: 'boolean',
      description: 'Shows the voice recording button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input and all actions',
    },
    acceptedFileTypes: {
      control: 'text',
      description: 'Accepted file types for attachments',
    },
    maxFileSize: {
      control: 'number',
      description: 'Maximum file size in MB',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message...',
    onSend: (message, file) => {
      console.log('Message sent:', message);
      if (file) console.log('File attached:', file.name);
    },
  },
};

export const WithAttachments: Story = {
  args: {
    placeholder: 'Ask me anything...',
    showAttachments: true,
    showVoice: false,
    onSend: (message, file) => {
      console.log('Message:', message);
      console.log('File:', file);
    },
  },
};

export const WithVoice: Story = {
  args: {
    placeholder: 'Speak or type your message...',
    showAttachments: false,
    showVoice: true,
    onSend: (message) => console.log('Message:', message),
    onVoiceStart: () => console.log('Voice recording started'),
    onVoiceEnd: (transcript) => console.log('Voice transcript:', transcript),
  },
};

export const FullFeatures: Story = {
  args: {
    placeholder: 'Message with all features...',
    showAttachments: true,
    showVoice: true,
    onSend: (message, file) => {
      console.log('Message:', message);
      if (file) console.log('File:', file.name);
    },
    onVoiceStart: () => console.log('Voice recording started'),
    onVoiceEnd: (transcript) => console.log('Voice transcript:', transcript),
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Input is disabled...',
    disabled: true,
    showAttachments: true,
    showVoice: true,
    onSend: (message) => console.log('Message:', message),
  },
};

export const ChatInterface: Story = {
  render: () => {
    const handleSend = (message: string, file?: File | null) => {
      console.log('Chat message:', message);
      if (file) console.log('Attached file:', file.name);
    };

    return (
      <div className="w-full max-w-2xl">
        <div className="bg-surface border border-themed rounded-t-lg p-4 h-64 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                Hello! How can I help you today?
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs">
                I need help with my vehicle service booking.
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-themed bg-surface p-4 rounded-b-lg">
          <SmartInput
            placeholder="Type your message..."
            onSend={handleSend}
            showAttachments={true}
            showVoice={true}
            acceptedFileTypes="image/*,.pdf,.doc,.docx,.txt"
            maxFileSize={10}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'SmartInput integrated into a chat interface layout.',
      },
    },
  },
};

export const FileHandling: Story = {
  render: () => {
    const handleSend = (message: string, file?: File | null) => {
      if (file) {
        alert(`File attached: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      }
      console.log('Message:', message, 'File:', file);
    };

    return (
      <div className="space-y-4">
        <div className="text-sm text-secondary">
          Try attaching a file (max 10MB) - images, PDFs, docs, or text files
        </div>
        <SmartInput
          placeholder="Attach a file and send a message..."
          onSend={handleSend}
          showAttachments={true}
          acceptedFileTypes="image/*,.pdf,.doc,.docx,.txt"
          maxFileSize={10}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates file attachment functionality with size and type validation.',
      },
    },
  },
};