import { Menu as BaseMenu } from '@base-ui/react/menu';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Menu = createStyledModule(BaseMenu, {
  Trigger: styles.button.secondary,
  Popup: styles.menuPopup,
  Item: styles.menuItem,
});

export default Menu;
