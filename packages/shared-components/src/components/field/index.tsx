import { Field as BaseField } from '@base-ui/react/field';
import { createStyledModule } from '../../lib/create-styled-module';
import { fieldStyles } from './field.styles';

const Field = createStyledModule(BaseField, fieldStyles);

export default Field;
