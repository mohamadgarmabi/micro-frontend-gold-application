import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import { createStyledModule } from '../../lib/create-styled-module';
import { autocompleteStyles } from './autocomplete.styles';

const Autocomplete = createStyledModule(BaseAutocomplete, autocompleteStyles);

export default Autocomplete;
