import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from '@gold/shared-components/input';

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16v12H4z" />
    <path d="M4 8l8 5 8-5" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 118 0v3" />
  </svg>
);

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Email address',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'you@example.com',
    leftIcon: <MailIcon />,
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Password',
    type: 'password',
    rightIcon: <LockIcon />,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'you@example.com',
    leftIcon: <MailIcon />,
    error: true,
    errorMessage: 'Please enter a valid email address',
    defaultValue: 'not-an-email',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};
