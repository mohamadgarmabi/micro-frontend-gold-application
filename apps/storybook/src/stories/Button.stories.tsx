import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@gold/shared-components/components/button';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3-3" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Search',
    leftIcon: <SearchIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Continue',
    rightIcon: <ArrowIcon />,
  },
};

export const Loading: Story = {
  args: {
    children: 'Saving…',
    loading: true,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    className:
      'border border-gold-500/40 bg-white text-gold-700 hover:bg-gold-50',
  },
};
