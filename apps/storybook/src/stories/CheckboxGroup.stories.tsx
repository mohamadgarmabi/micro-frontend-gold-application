import type { Meta, StoryObj } from '@storybook/react-vite';
import CheckboxGroup from '@gold/shared-components/checkbox-group';
import Checkbox from '@gold/shared-components/checkbox';

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CheckboxGroup defaultValue={['a']} className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm">
        <Checkbox value="a" />
        Option A
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Checkbox value="b" />
        Option B
      </label>
    </CheckboxGroup>
  ),
};
