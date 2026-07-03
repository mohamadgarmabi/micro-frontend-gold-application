import type { Meta, StoryObj } from '@storybook/react-vite';
import Avatar from '@gold/shared-components/avatar';


const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar className="size-12">
      <Avatar.Fallback>MC</Avatar.Fallback>
    </Avatar>
  ),
};
