import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { createStyledModule } from '../../lib/create-styled-module';
import { tooltipStyles } from './tooltip.styles';

const Tooltip = createStyledModule(BaseTooltip, tooltipStyles);

export default Tooltip;
