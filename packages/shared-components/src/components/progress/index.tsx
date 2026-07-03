import { Progress as BaseProgress } from '@base-ui/react/progress';
import { createStyledModule } from '../../lib/create-styled-module';
import { progressStyles } from './progress.styles';

const Progress = createStyledModule(BaseProgress, progressStyles);

export default Progress;
