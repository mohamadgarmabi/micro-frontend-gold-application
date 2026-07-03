import { Slider as BaseSlider } from '@base-ui/react/slider';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Slider = createStyledModule(BaseSlider, {
  Root: styles.sliderRoot,
  Track: styles.sliderTrack,
  Indicator: styles.sliderIndicator,
  Thumb: styles.sliderThumb,
});

export default Slider;
