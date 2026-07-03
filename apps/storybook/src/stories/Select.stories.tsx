import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from '@gold/shared-components/select';


const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select defaultValue="gold">
      <Select.Trigger className="w-48">
        <Select.Value />
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.List>
              <Select.Item value="gold">Gold</Select.Item>
              <Select.Item value="silver">Silver</Select.Item>
              <Select.Item value="platinum">Platinum</Select.Item>
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select>
  ),
};
