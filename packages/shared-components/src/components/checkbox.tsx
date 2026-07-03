import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Checkbox = createStyledModule(BaseCheckbox, {
  Root: styles.checkboxRoot,
  Indicator: styles.checkboxIndicator,
});

export default Checkbox;
