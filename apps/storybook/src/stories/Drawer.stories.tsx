import type { Meta, StoryObj } from '@storybook/react-vite';
import Drawer from '@gold/shared-components/drawer';


const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger>Open drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Popup className="fixed inset-x-0 bottom-0 rounded-t-2xl p-6">
          <Drawer.Title>Drawer title</Drawer.Title>
          <Drawer.Description className="mt-2 text-sm text-foreground-muted">
            Slide-up panel content.
          </Drawer.Description>
          <Drawer.Close className="mt-4 rounded-lg px-4 py-2 text-sm">Close</Drawer.Close>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer>
  ),
};
