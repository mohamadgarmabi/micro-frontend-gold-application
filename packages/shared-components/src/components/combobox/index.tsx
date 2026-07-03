import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { createStyledModule } from '../../lib/create-styled-module';
import { comboboxStyles } from './combobox.styles';

const Combobox = createStyledModule(BaseCombobox, comboboxStyles);

export default Combobox;
