import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { createStyledModule } from '../../lib/create-styled-module';
import { accordionStyles } from './accordion.styles';

const Accordion = createStyledModule(BaseAccordion, accordionStyles);

export default Accordion;
