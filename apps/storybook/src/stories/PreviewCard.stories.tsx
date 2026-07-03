import type { Meta, StoryObj } from '@storybook/react-vite';
import PreviewCard from '@gold/shared-components/preview-card';


const meta = {
  title: 'Components/PreviewCard',
  component: PreviewCard,
  tags: ['autodocs'],
} satisfies Meta<typeof PreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <PreviewCard>
      <PreviewCard.Trigger className="rounded-lg border border-border px-4 py-2 text-sm">
        Hover for preview
      </PreviewCard.Trigger>
      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup className="w-64 rounded-lg border border-border p-4 text-sm">
            Preview card content with extra details.
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard>
  ),
};
