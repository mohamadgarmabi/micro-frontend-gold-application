import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import { createStyledModule } from '../../lib/create-styled-module';
import { scrollareaStyles } from './scroll-area.styles';

const ScrollArea = createStyledModule(BaseScrollArea, scrollareaStyles);

export default ScrollArea;
