import type { Meta, StoryObj } from '@storybook/react-vite'
import Drawer from '@gold/shared-components/drawer'

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer>
      <Drawer.Trigger>Open drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content className="p-6">
          <Drawer.Handle />
          <Drawer.Title>Drawer title</Drawer.Title>
          <Drawer.Description className="mt-2 text-sm text-foreground-muted">
            Slide-up panel content.
          </Drawer.Description>
          <Drawer.Close className="mt-4 rounded-lg px-4 py-2 text-sm">Close</Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer>
  ),
}
