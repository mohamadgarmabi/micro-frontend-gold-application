import { Toast as BaseToast } from '@base-ui/react/toast';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Toast = createStyledModule(BaseToast, {
  Viewport: styles.toastViewport,
  Root: styles.toastRoot,
});

export default Toast;
