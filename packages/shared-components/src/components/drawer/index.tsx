import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { createStyledModule } from '../../lib/create-styled-module';
import { drawerStyles } from './drawer.styles';

const Drawer = createStyledModule(BaseDrawer, drawerStyles);

export default Drawer;
