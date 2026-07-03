import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Switch = createStyledModule(BaseSwitch, {
  Root: styles.switchRoot,
  Thumb: styles.switchThumb,
});

export default Switch;
