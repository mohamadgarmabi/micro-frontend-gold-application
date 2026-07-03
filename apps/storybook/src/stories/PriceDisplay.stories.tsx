import type { Meta, StoryObj } from '@storybook/react-vite';
import PriceDisplay from '@gold/shared-components/price-display';


const meta = {
  title: 'Components/PriceDisplay',
  component: PriceDisplay,
  tags: ['autodocs'],
} satisfies Meta<typeof PriceDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 3302.45, change: 1.28, size: 'lg' } };
export const Small: Story = { args: { value: 2150, change: -0.42, size: 'sm' } };
