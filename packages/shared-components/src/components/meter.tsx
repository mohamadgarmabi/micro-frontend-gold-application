import { Meter as BaseMeter } from '@base-ui/react/meter';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Meter = createStyledModule(BaseMeter, {
  Root: styles.meterTrack,
  Indicator: styles.meterIndicator,
  Track: styles.meterTrack,
});

export default Meter;
