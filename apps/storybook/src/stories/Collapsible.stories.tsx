import type { Meta, StoryObj } from '@storybook/react-vite';
import Collapsible from '@gold/shared-components/collapsible';


const meta = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-80">
      <Collapsible.Trigger className="text-sm font-medium">Toggle content</Collapsible.Trigger>
      <Collapsible.Panel className="mt-2 text-sm text-foreground-muted">
        Hidden content revealed on click.
      </Collapsible.Panel>
    </Collapsible>
  ),
};
