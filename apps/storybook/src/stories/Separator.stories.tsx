import type { Meta, StoryObj } from '@storybook/react-vite';
import Separator from '@gold/shared-components/separator';


const meta = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <p className="text-sm text-foreground-muted">Above</p>
      <Separator />
      <p className="text-sm text-foreground-muted">Below</p>
    </div>
  ),
};
