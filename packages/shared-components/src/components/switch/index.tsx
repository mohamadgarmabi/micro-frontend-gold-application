import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { createStyledModule } from '../../lib/create-styled-module';
import { switchStyles } from './switch.styles';

const Switch = createStyledModule(BaseSwitch, switchStyles);

export default Switch;
