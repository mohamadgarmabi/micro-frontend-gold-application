import type { Meta, StoryObj } from '@storybook/react-vite';
import Toast from '@gold/shared-components/toast';
import Button from '@gold/shared-components/button';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const { add } = Toast.useToastManager();

  return (
    <Toast.Provider>
      <Button
        type="button"
        onClick={() => add({ title: 'Saved', description: 'Your changes were saved.' })}
      >
        Show toast
      </Button>
      <Toast.Viewport />
    </Toast.Provider>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};
