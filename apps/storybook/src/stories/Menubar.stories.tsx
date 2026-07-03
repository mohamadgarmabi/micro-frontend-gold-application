import type { Meta, StoryObj } from '@storybook/react-vite';
import Menubar from '@gold/shared-components/menubar';
import Menu from '@gold/shared-components/menu';

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Menubar className="flex gap-1 rounded-lg border border-border p-1">
      <Menu>
        <Menu.Trigger className="rounded px-3 py-1.5 text-sm">File</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item>New tab</Menu.Item>
              <Menu.Item>New window</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu>
      <Menu>
        <Menu.Trigger className="rounded px-3 py-1.5 text-sm">Edit</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner>
            <Menu.Popup>
              <Menu.Item>Undo</Menu.Item>
              <Menu.Item>Redo</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu>
    </Menubar>
  ),
};
