import type { Meta, StoryObj } from '@storybook/react-vite';
import Switch from '@gold/shared-components/switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm text-foreground-muted">
      <Switch />
      Notifications
    </label>
  ),
};

export const Checked: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm text-foreground-muted">
      <Switch defaultChecked />
      Enabled
    </label>
  ),
};
