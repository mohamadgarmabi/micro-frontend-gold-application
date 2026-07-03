import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import { createStyledModule } from '../../lib/create-styled-module';
import { contextmenuStyles } from './context-menu.styles';

const ContextMenu = createStyledModule(BaseContextMenu, contextmenuStyles);

export default ContextMenu;
