import type { Meta, StoryObj } from '@storybook/react-vite';
import RadioGroup from '@gold/shared-components/radio-group';
import Radio from '@gold/shared-components/radio';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a" className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm">
        <Radio value="a" />
        Option A
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Radio value="b" />
        Option B
      </label>
    </RadioGroup>
  ),
};
