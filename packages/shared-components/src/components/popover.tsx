import { Popover as BasePopover } from '@base-ui/react/popover';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Popover = createStyledModule(BasePopover, {
  Trigger: styles.button.secondary,
  Popup: styles.popup,
});

export default Popover;
