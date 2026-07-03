import type { Meta, StoryObj } from '@storybook/react-vite';
import Tabs from '@gold/shared-components/tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-80">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview" className="text-sm text-foreground-muted">
        Base UI primitives styled with Gold tokens.
      </Tabs.Panel>
      <Tabs.Panel value="settings" className="text-sm text-foreground-muted">
        Storybook catalog for @gold/shared-components.
      </Tabs.Panel>
    </Tabs>
  ),
};
