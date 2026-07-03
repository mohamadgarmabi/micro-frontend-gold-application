import { Select as BaseSelect } from '@base-ui/react/select';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Select = createStyledModule(BaseSelect, {
  Trigger: styles.selectTrigger,
  Popup: styles.selectPopup,
  Item: styles.selectItem,
});

export default Select;
