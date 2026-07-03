import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Tabs = createStyledModule(BaseTabs, {
  List: styles.tabsList,
  Tab: styles.tabsTrigger,
  Panel: styles.tabsPanel,
});

export default Tabs;
