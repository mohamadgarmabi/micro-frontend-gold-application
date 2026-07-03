import type { Meta, StoryObj } from '@storybook/react-vite';
import AlertDialog from '@gold/shared-components/alert-dialog';


const meta = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialog.Trigger>Delete item</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup className="fixed top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2">
          <AlertDialog.Title>Are you sure?</AlertDialog.Title>
          <AlertDialog.Description className="mt-2">
            This action cannot be undone.
          </AlertDialog.Description>
          <div className="mt-4 flex justify-end gap-2">
            <AlertDialog.Close className="rounded-lg px-4 py-2 text-sm">Cancel</AlertDialog.Close>
            <AlertDialog.Close className="rounded-lg bg-danger px-4 py-2 text-sm text-white">
              Delete
            </AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog>
  ),
};
