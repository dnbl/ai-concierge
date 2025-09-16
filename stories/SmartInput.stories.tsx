import type { Meta, StoryObj } from '@storybook/react';
import SmartInput from '../components/molecules/SmartInput';

const meta: Meta<typeof SmartInput> = {
  title: 'Molecules/SmartInput',
  component: SmartInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An intelligent input component with file attachment support, voice recording, and accessibility features. Designed for natural language interaction in chat interfaces.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the input field'
    },
    showAttachments: {
      control: { type: 'boolean' },
      description: 'Whether to show the attachment button'
    },
    showVoice: {
      control: { type: 'boolean' },
      description: 'Whether to show the voice recording button'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the entire input when true'
    },
    onSend: {
      action: 'sent',
      description: 'Callback fired when a message is sent'
    },
    onAttachmentSelect: {
      action: 'attachment-selected',
      description: 'Callback fired when a file is selected'
    },
    onVoiceStart: {
      action: 'voice-started',
      description: 'Callback fired when voice recording starts'
    },
    onVoiceEnd: {
      action: 'voice-ended',
      description: 'Callback fired when voice recording ends'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message...',
    showAttachments: true,
    showVoice: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default SmartInput with all features enabled. Try typing a message and pressing Enter to send.'
      }
    }
  }
};

export const WithoutAttachments: Story = {
  args: {
    placeholder: 'Type your message...',
    showAttachments: false,
    showVoice: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'SmartInput without attachment functionality, useful for text-only interfaces.'
      }
    }
  }
};

export const WithoutVoice: Story = {
  args: {
    placeholder: 'Type your message...',
    showAttachments: true,
    showVoice: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'SmartInput without voice recording, suitable for environments where audio is not available.'
      }
    }
  }
};

export const TextOnly: Story = {
  args: {
    placeholder: 'Type your message...',
    showAttachments: false,
    showVoice: false,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal SmartInput with only text input functionality.'
      }
    }
  }
};

export const Disabled: Story = {
  args: {
    placeholder: 'Input is disabled...',
    showAttachments: true,
    showVoice: true,
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled SmartInput, typically used during loading states or when input is not allowed.'
      }
    }
  }
};

export const WithAttachment: Story = {
  args: {
    placeholder: 'Type your message...',
    showAttachments: true,
    showVoice: true,
    disabled: false,
    attachment: new File(['test content'], 'test.txt', { type: 'text/plain' }),
  },
  parameters: {
    docs: {
      description: {
        story: 'SmartInput with an attached file, showing the attachment preview.'
      }
    }
  }
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Ask me anything about your vehicles...',
    showAttachments: true,
    showVoice: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'SmartInput with custom placeholder text for specific contexts.'
      }
    }
  }
};

// Accessibility testing story
export const AccessibilityTest: Story = {
  args: {
    placeholder: 'Test accessibility features...',
    showAttachments: true,
    showVoice: true,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this story to test keyboard navigation. Try using Tab to move between buttons, Enter to send, and test screen reader compatibility.'
      }
    }
  }
};