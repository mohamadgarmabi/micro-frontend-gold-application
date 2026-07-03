import type { Meta, StoryObj } from '@storybook/react-vite';
import ToggleGroup from '@gold/shared-components/toggle-group';
import Toggle from '@gold/shared-components/toggle';

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToggleGroup defaultValue={['bold']} className="flex gap-1">
      <Toggle value="bold">B</Toggle>
      <Toggle value="italic">I</Toggle>
      <Toggle value="underline">U</Toggle>
    </ToggleGroup>
  ),
};
