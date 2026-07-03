import { Popover as BasePopover } from '@base-ui/react/popover';
import { createStyledModule } from '../../lib/create-styled-module';
import { popoverStyles } from './popover.styles';

const Popover = createStyledModule(BasePopover, popoverStyles);

export default Popover;
