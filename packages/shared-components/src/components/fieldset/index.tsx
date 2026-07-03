import { Fieldset as BaseFieldset } from '@base-ui/react/fieldset';
import { createStyledModule } from '../../lib/create-styled-module';
import { fieldsetStyles } from './fieldset.styles';

const Fieldset = createStyledModule(BaseFieldset, fieldsetStyles);

export default Fieldset;
