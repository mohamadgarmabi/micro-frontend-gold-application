import type { Meta, StoryObj } from '@storybook/react-vite';
import OTPField from '@gold/shared-components/otp-field';


const meta = {
  title: 'Components/OTPField',
  component: OTPField,
  tags: ['autodocs'],
} satisfies Meta<typeof OTPField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <OTPField maxLength={6}>
      <OTPField.Input />
    </OTPField>
  ),
};
