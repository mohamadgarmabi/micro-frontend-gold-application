import { Menu as BaseMenu } from '@base-ui/react/menu';
import { createStyledModule } from '../../lib/create-styled-module';
import { menuStyles } from './menu.styles';

const Menu = createStyledModule(BaseMenu, menuStyles);

export default Menu;
