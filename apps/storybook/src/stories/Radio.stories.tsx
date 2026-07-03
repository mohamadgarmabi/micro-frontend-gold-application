import type { Meta, StoryObj } from '@storybook/react-vite';
import Radio from '@gold/shared-components/radio';


const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <label className="flex items-center gap-2 text-sm text-foreground-muted">
      <Radio value="a" />
      Option A
    </label>
  ),
};
