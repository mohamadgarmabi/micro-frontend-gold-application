import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { createStyledModule } from '../../lib/create-styled-module';
import { tabsStyles } from './tabs.styles';

const Tabs = createStyledModule(BaseTabs, tabsStyles);

export default Tabs;
