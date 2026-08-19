import type { Meta, StoryObj } from '@storybook/react-vite'
import Select from '@gold/shared-components/select'

const metals = [
  { value: 'gold', label: 'Gold 18K', description: 'Melted gold' },
  { value: 'silver', label: 'Silver 999', description: 'Investment silver' },
  { value: 'platinum', label: 'Platinum' },
]

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    options: metals,
    placeholder: 'Choose metal',
    searchable: true,
    title: 'Metals',
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Multiple: Story = {
  args: {
    multiple: true,
    defaultValue: ['gold'],
    placeholder: 'Choose metals',
    doneLabel: 'Done',
  },
}

export const WithRowActions: Story = {
  args: {
    rowActions: [
      {
        id: 'edit',
        label: 'Edit',
        onAction: (option) => {
          console.info('edit', option.value)
        },
      },
    ],
  },
}
