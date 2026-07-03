import type { Meta, StoryObj } from '@storybook/react-vite';
import Meter from '@gold/shared-components/meter';


const meta = {
  title: 'Components/Meter',
  component: Meter,
  tags: ['autodocs'],
} satisfies Meta<typeof Meter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Meter value={0.7} /> };
