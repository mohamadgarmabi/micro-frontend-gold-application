import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { createStyledModule } from '../../lib/create-styled-module';
import { collapsibleStyles } from './collapsible.styles';

const Collapsible = createStyledModule(BaseCollapsible, collapsibleStyles);

export default Collapsible;
