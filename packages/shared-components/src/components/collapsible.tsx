import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Collapsible = createStyledModule(BaseCollapsible, {
  Trigger: styles.accordionTrigger,
  Panel: styles.accordionPanel,
});

export default Collapsible;
