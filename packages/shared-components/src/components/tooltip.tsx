import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Tooltip = createStyledModule(BaseTooltip, {
  Trigger: styles.button.ghost,
  Popup: styles.tooltipPopup,
});

export default Tooltip;
