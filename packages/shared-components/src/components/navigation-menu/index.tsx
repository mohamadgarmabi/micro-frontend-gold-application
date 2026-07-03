import { NavigationMenu as BaseNavigationMenu } from '@base-ui/react/navigation-menu';
import { createStyledModule } from '../../lib/create-styled-module';
import { navigationmenuStyles } from './navigation-menu.styles';

const NavigationMenu = createStyledModule(BaseNavigationMenu, navigationmenuStyles);

export default NavigationMenu;
