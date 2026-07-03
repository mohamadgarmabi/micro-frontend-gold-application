import { Radio as BaseRadio } from '@base-ui/react/radio';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Radio = createStyledModule(BaseRadio, {
  Root: styles.radioRoot,
  Indicator: styles.radioIndicator,
});

export default Radio;
