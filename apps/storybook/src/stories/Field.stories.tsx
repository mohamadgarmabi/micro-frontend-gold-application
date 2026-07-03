import type { Meta, StoryObj } from '@storybook/react-vite';
import Field from '@gold/shared-components/field';


const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Field.Root name="email" className="w-80 space-y-1">
      <Field.Label className="text-sm font-medium">Email</Field.Label>
      <Field.Control placeholder="you@example.com" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
      <Field.Description className="text-xs text-foreground-muted">
        We will never share your email.
      </Field.Description>
    </Field.Root>
  ),
};
