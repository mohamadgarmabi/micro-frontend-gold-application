import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Dialog = createStyledModule(BaseDialog, {
  Trigger: styles.button.primary,
  Popup: styles.popup,
  Backdrop: styles.backdrop,
});

export default Dialog;
