import { Meter as BaseMeter } from '@base-ui/react/meter';
import { createStyledModule } from '../../lib/create-styled-module';
import { meterStyles } from './meter.styles';

const Meter = createStyledModule(BaseMeter, meterStyles);

export default Meter;
