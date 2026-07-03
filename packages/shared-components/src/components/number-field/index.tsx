import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { createStyledModule } from '../../lib/create-styled-module';
import { numberfieldStyles } from './number-field.styles';

const NumberField = createStyledModule(BaseNumberField, numberfieldStyles);

export default NumberField;
