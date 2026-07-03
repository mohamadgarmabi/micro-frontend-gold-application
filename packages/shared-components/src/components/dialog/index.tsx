import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { createStyledModule } from '../../lib/create-styled-module';
import { dialogStyles } from './dialog.styles';

const Dialog = createStyledModule(BaseDialog, dialogStyles);

export default Dialog;
