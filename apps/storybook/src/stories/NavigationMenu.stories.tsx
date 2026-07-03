import type { Meta, StoryObj } from '@storybook/react-vite';
import NavigationMenu from '@gold/shared-components/navigation-menu';


const meta = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NavigationMenu className="w-full max-w-md">
      <NavigationMenu.List className="flex gap-2">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="rounded-lg px-3 py-2 text-sm">
            Products
          </NavigationMenu.Trigger>
          <NavigationMenu.Portal>
            <NavigationMenu.Positioner>
              <NavigationMenu.Popup className="rounded-lg border border-border p-4 text-sm">
                Gold, silver, and platinum instruments.
              </NavigationMenu.Popup>
            </NavigationMenu.Positioner>
          </NavigationMenu.Portal>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="#" className="rounded-lg px-3 py-2 text-sm no-underline">
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  ),
};
