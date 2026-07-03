import { Radio as BaseRadio } from '@base-ui/react/radio';
import { createStyledModule } from '../../lib/create-styled-module';
import { radioStyles } from './radio.styles';

const Radio = createStyledModule(BaseRadio, radioStyles);

export default Radio;
