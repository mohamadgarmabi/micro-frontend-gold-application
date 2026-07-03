import { Progress as BaseProgress } from '@base-ui/react/progress';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Progress = createStyledModule(BaseProgress, {
  Root: styles.progressRoot,
  Indicator: styles.progressIndicator,
});

export default Progress;
