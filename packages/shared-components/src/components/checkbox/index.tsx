import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { createStyledModule } from '../../lib/create-styled-module';
import { checkboxStyles } from './checkbox.styles';

const Checkbox = createStyledModule(BaseCheckbox, checkboxStyles);

export default Checkbox;
