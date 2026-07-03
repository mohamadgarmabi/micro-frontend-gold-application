import { ScrollArea as BaseScrollArea } from '@base-ui/react/scroll-area';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const ScrollArea = createStyledModule(BaseScrollArea, {
  Root: 'rounded-lg border border-border',
  Viewport: styles.scrollViewport,
  Scrollbar: styles.scrollScrollbar,
  Thumb: styles.scrollThumb,
});

export default ScrollArea;
