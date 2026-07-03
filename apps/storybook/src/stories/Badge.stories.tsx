import type { Meta, StoryObj } from '@storybook/react-vite';
import Badge from '@gold/shared-components/badge';


const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Gold', variant: 'brand' } };
export const Success: Story = { args: { children: 'Verified', variant: 'success' } };
