import type { Meta, StoryObj } from '@storybook/react-vite';
import Combobox from '@gold/shared-components/combobox';


const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const metals = ['Gold', 'Silver', 'Platinum', 'Palladium'];

export const Default: Story = {
  render: () => (
    <Combobox className="w-64">
      <Combobox.Input placeholder="Pick a metal" />
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup>
            <Combobox.List>
              {metals.map((metal) => (
                <Combobox.Item key={metal} value={metal}>
                  {metal}
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox>
  ),
};
