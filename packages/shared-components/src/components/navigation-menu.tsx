import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const NavigationMenu = createStyledModule(BaseNavigationMenu, {
  List: styles.navigationList,
  Trigger: styles.navigationTrigger,
  Popup: styles.popup,
});

export default NavigationMenu;
