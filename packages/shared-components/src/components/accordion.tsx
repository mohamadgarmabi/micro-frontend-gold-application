import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Accordion = createStyledModule(BaseAccordion, {
  Trigger: styles.accordionTrigger,
  Panel: styles.accordionPanel,
});

export default Accordion;
