import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Toolbar = createStyledModule(BaseToolbar, {
  Root: styles.toolbarRoot,
});

export default Toolbar;
