import type { Meta, StoryObj } from '@storybook/react-vite';
import Toolbar from '@gold/shared-components/toolbar';


const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Toolbar className="flex gap-1 rounded-lg border border-border p-1">
      <Toolbar.Button>Bold</Toolbar.Button>
      <Toolbar.Button>Italic</Toolbar.Button>
      <Toolbar.Separator />
      <Toolbar.Button>Link</Toolbar.Button>
    </Toolbar>
  ),
};
