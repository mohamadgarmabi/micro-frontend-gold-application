import type { Meta, StoryObj } from '@storybook/react-vite';
import Tooltip from '@gold/shared-components/tooltip';


const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger className="rounded-lg border border-border px-4 py-2 text-sm">
        Hover me
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner sideOffset={8}>
          <Tooltip.Popup className="rounded-lg px-3 py-1.5 text-sm">Tooltip text</Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip>
  ),
};
