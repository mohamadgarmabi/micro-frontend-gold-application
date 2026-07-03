import { Drawer as BaseDrawer } from '@base-ui/react/drawer';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Drawer = createStyledModule(BaseDrawer, {
  Popup: styles.drawerPopup,
  Backdrop: styles.backdrop,
});

export default Drawer;
