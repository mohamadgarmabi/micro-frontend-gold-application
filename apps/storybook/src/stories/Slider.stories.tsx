import type { Meta, StoryObj } from '@storybook/react-vite';
import Slider from '@gold/shared-components/slider';


const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Slider defaultValue={40} className="w-64" /> };
