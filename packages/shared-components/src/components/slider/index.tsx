import { Slider as BaseSlider } from '@base-ui/react/slider';
import { createStyledModule } from '../../lib/create-styled-module';
import { sliderStyles } from './slider.styles';

const Slider = createStyledModule(BaseSlider, sliderStyles);

export default Slider;
