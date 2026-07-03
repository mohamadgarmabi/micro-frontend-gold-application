import type { Meta, StoryObj } from '@storybook/react-vite';
import Toggle from '@gold/shared-components/toggle';


const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Toggle>Toggle me</Toggle> };
