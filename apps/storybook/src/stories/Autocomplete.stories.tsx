import type { Meta, StoryObj } from '@storybook/react-vite';
import Autocomplete from '@gold/shared-components/autocomplete';


const meta = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const metals = ['Gold', 'Silver', 'Platinum', 'Palladium'];

export const Default: Story = {
  render: () => (
    <Autocomplete className="w-64">
      <Autocomplete.Input placeholder="Search metals" />
      <Autocomplete.Portal>
        <Autocomplete.Positioner>
          <Autocomplete.Popup>
            <Autocomplete.List>
              {metals.map((metal) => (
                <Autocomplete.Item key={metal} value={metal}>
                  {metal}
                </Autocomplete.Item>
              ))}
            </Autocomplete.List>
          </Autocomplete.Popup>
        </Autocomplete.Positioner>
      </Autocomplete.Portal>
    </Autocomplete>
  ),
};
