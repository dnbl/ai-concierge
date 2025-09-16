import type { Meta, StoryObj } from '@storybook/react';
import AccessibleButton from '../../components/atoms/AccessibleButton';

const meta: Meta<typeof AccessibleButton> = {
  title: 'Atoms/AccessibleButton',
  component: AccessibleButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A fully accessible button component with multiple variants, sizes, and loading states. Follows WCAG 2.1 AA guidelines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner when true',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button when true',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const WithAriaLabel: Story = {
  args: {
    children: '❤️',
    ariaLabel: 'Like this post',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with icon content and descriptive aria-label for accessibility.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4 items-center">
        <AccessibleButton variant="primary">Primary</AccessibleButton>
        <AccessibleButton variant="secondary">Secondary</AccessibleButton>
        <AccessibleButton variant="ghost">Ghost</AccessibleButton>
        <AccessibleButton variant="danger">Danger</AccessibleButton>
      </div>
      <div className="flex gap-4 items-center">
        <AccessibleButton size="sm">Small</AccessibleButton>
        <AccessibleButton size="md">Medium</AccessibleButton>
        <AccessibleButton size="lg">Large</AccessibleButton>
      </div>
      <div className="flex gap-4 items-center">
        <AccessibleButton loading>Loading</AccessibleButton>
        <AccessibleButton disabled>Disabled</AccessibleButton>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Overview of all button variants, sizes, and states.',
      },
    },
  },
};