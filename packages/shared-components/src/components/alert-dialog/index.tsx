import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { createStyledModule } from '../../lib/create-styled-module';
import { alertdialogStyles } from './alert-dialog.styles';

const AlertDialog = createStyledModule(BaseAlertDialog, alertdialogStyles);

export default AlertDialog;
