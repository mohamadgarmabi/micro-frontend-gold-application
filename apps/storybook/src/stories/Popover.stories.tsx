import type { Meta, StoryObj } from '@storybook/react-vite';
import Popover from '@gold/shared-components/popover';


const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger className="rounded-lg border border-border px-4 py-2 text-sm">
        Open popover
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="rounded-lg border border-border p-4 text-sm">
            Popover content
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover>
  ),
};
