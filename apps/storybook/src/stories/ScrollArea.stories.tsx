import type { Meta, StoryObj } from '@storybook/react-vite';
import ScrollArea from '@gold/shared-components/scroll-area';


const meta = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-lg border border-border">
      <ScrollArea.Viewport>
        <ScrollArea.Content className="p-4 text-sm text-foreground-muted">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>Line {i + 1}</p>
          ))}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar>
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea>
  ),
};
