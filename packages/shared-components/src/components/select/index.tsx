import { Select as BaseSelect } from '@base-ui/react/select';
import { createStyledModule } from '../../lib/create-styled-module';
import { selectStyles } from './select.styles';

const Select = createStyledModule(BaseSelect, selectStyles);

export default Select;
