import type { Meta, StoryObj } from '@storybook/react';
import AccessibleInput from '../../components/atoms/AccessibleInput';

const meta: Meta<typeof AccessibleInput> = {
  title: 'Atoms/AccessibleInput',
  component: AccessibleInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A fully accessible input component with label, error states, and help text. Supports both light and dark themes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helpText: {
      control: 'text',
      description: 'Help text to display below the input',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'dark'],
      description: 'Visual theme variant',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the input take full width of container',
    },
    showLabel: {
      control: 'boolean',
      description: 'Controls label visibility (for screenreaders only when false)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    required: {
      control: 'boolean',
      description: 'Marks the input as required',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helpText: 'Must be at least 8 characters with one number and one special character',
  },
};

export const Required: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
};

export const Dark: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    variant: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message here...',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export const HiddenLabel: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    showLabel: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Label is hidden visually but still accessible to screen readers.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    disabled: true,
    defaultValue: 'Cannot edit this',
  },
};

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 w-80">
      <AccessibleInput
        label="First Name"
        placeholder="Enter first name"
        required
      />
      <AccessibleInput
        label="Last Name"
        placeholder="Enter last name"
        required
      />
      <AccessibleInput
        label="Email"
        type="email"
        placeholder="Enter email address"
        helpText="We'll never share your email"
        required
      />
      <AccessibleInput
        label="Password"
        type="password"
        helpText="Must be at least 8 characters"
        required
      />
      <AccessibleInput
        label="Confirm Password"
        type="password"
        error="Passwords do not match"
      />
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example form showing various input states and configurations.',
      },
    },
  },
};