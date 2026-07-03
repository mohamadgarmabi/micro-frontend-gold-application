import type { Meta, StoryObj } from '@storybook/react-vite';
import Checkbox from '@gold/shared-components/checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm text-foreground-muted">
      <Checkbox />
      Accept terms
    </label>
  ),
};

export const Checked: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm text-foreground-muted">
      <Checkbox defaultChecked />
      Remember me
    </label>
  ),
};
