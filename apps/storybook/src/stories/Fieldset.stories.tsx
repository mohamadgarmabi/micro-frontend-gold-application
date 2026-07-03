import type { Meta, StoryObj } from '@storybook/react-vite';
import Fieldset from '@gold/shared-components/fieldset';
import Field from '@gold/shared-components/field';

const meta = {
  title: 'Components/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
} satisfies Meta<typeof Fieldset>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Fieldset.Root className="w-80 space-y-3 rounded-lg border border-border p-4">
      <Fieldset.Legend className="text-sm font-medium">Shipping</Fieldset.Legend>
      <Field.Root name="city">
        <Field.Label className="text-sm">City</Field.Label>
        <Field.Control placeholder="Tehran" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
      </Field.Root>
    </Fieldset.Root>
  ),
};
