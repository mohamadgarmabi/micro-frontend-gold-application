import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const AlertDialog = createStyledModule(BaseAlertDialog, {
  Trigger: styles.button.destructive,
  Popup: styles.popup,
  Backdrop: styles.backdrop,
});

export default AlertDialog;
