import { Toolbar as BaseToolbar } from '@base-ui/react/toolbar';
import { createStyledModule } from '../../lib/create-styled-module';
import { toolbarStyles } from './toolbar.styles';

const Toolbar = createStyledModule(BaseToolbar, toolbarStyles);

export default Toolbar;
