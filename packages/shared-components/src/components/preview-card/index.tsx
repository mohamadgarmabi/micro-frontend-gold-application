import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { createStyledModule } from '../../lib/create-styled-module';
import { previewcardStyles } from './preview-card.styles';

const PreviewCard = createStyledModule(BasePreviewCard, previewcardStyles);

export default PreviewCard;
