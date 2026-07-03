import type { Meta, StoryObj } from '@storybook/react-vite';
import Toaster, { toast } from '@gold/shared-components/sonner';
import Button from '@gold/shared-components/button';

const meta = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button onClick={() => toast.success('Saved successfully')}>Show toast</Button>
    </>
  ),
};
