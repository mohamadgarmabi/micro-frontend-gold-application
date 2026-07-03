import type { Meta, StoryObj } from '@storybook/react-vite';
import Form from '@gold/shared-components/form';
import Button from '@gold/shared-components/button';
import Field from '@gold/shared-components/field';

const meta = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Form
      className="w-80 space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Field.Root name="email">
        <Field.Label className="text-sm font-medium">Email</Field.Label>
        <Field.Control placeholder="you@example.com" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
      </Field.Root>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </Form>
  ),
};
