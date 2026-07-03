import type { Meta, StoryObj } from '@storybook/react-vite';
import NumberField from '@gold/shared-components/number-field';


const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NumberField defaultValue={42} className="w-40">
      <NumberField.Group>
        <NumberField.Decrement />
        <NumberField.Input />
        <NumberField.Increment />
      </NumberField.Group>
    </NumberField>
  ),
};
