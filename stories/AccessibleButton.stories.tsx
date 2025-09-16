import type { Meta, StoryObj } from '@storybook/react';
import { AccessibleButton } from '../components/atoms/AccessibilityEnhancements';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AccessibleButton> = {
  title: 'Atoms/AccessibleButton',
  component: AccessibleButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'A fully accessible button component with proper ARIA labels, keyboard navigation, and focus management. Supports multiple variants, sizes, and loading states.'
      }
    }
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant of the button'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button'
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner when true'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button when true'
    },
    children: {
      control: { type: 'text' },
      description: 'Button content'
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: () => console.log('Button clicked') },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary button with the main brand color, typically used for primary actions.'
      }
    }
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button with muted styling, used for secondary actions.'
      }
    }
  }
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Ghost button with transparent background, used for subtle actions.'
      }
    }
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large button for prominent actions or touch interfaces.'
      }
    }
  }
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small button for compact spaces or less prominent actions.'
      }
    }
  }
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in loading state with spinner. Automatically disabled during loading.'
      }
    }
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled button that cannot be interacted with. Properly communicated to screen readers.'
      }
    }
  }
};

export const WithIcon: Story = {
  args: {
    children: 'Button with Icon',
    icon: <span>🚀</span>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon for enhanced visual communication.'
      }
    }
  }
};

// Accessibility testing story
export const AccessibilityTest: Story = {
  args: {
    children: 'Test Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use this story to test keyboard navigation and screen reader compatibility. Try using Tab, Enter, and Space keys.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    // This would contain automated accessibility tests
    // For now, we'll just focus the button for manual testing
    const button = canvasElement.querySelector('button');
    if (button) {
      button.focus();
    }
  }
};