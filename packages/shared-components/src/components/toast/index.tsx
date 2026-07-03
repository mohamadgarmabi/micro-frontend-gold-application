import { Toast as BaseToast } from '@base-ui/react/toast';
import { createStyledModule } from '../../lib/create-styled-module';
import { toastStyles } from './toast.styles';

const Toast = createStyledModule(BaseToast, toastStyles);

export default Toast;
