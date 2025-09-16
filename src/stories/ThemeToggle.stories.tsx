import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '../../components/providers/ThemeProvider';
import ThemeToggle from '../../components/atoms/ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Atoms/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A theme toggle component that switches between light and dark themes. Includes accessible labeling and visual feedback.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-4 bg-surface border border-themed rounded-lg">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['button', 'icon'],
      description: 'Toggle style variant',
    },
    showLabel: {
      control: 'boolean',
      description: 'Shows text label alongside icon (button variant only)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Switch: Story = {
  args: {
    variant: 'icon',
  },
};

export const Button: Story = {
  args: {
    variant: 'button',
  },
};

export const ButtonWithLabel: Story = {
  args: {
    variant: 'button',
    showLabel: true,
  },
};

export const InHeader: Story = {
  render: () => (
    <header className="flex items-center justify-between p-4 bg-surface border-b border-themed w-96">
      <h1 className="text-lg font-semibold text-primary">AI Concierge</h1>
      <div className="flex items-center gap-2">
        <ThemeToggle variant="button" showLabel />
      </div>
    </header>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Theme toggle integrated into a header layout.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex items-center gap-4">
        <span className="text-secondary">Switch style:</span>
        <ThemeToggle variant="icon" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-secondary">Button style:</span>
        <ThemeToggle variant="button" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-secondary">Button with label:</span>
        <ThemeToggle variant="button" showLabel />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available theme toggle variants.',
      },
    },
  },
};