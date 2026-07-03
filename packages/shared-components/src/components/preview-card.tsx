import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const PreviewCard = createStyledModule(BasePreviewCard, {
  Trigger: styles.button.ghost,
  Popup: styles.previewCardPopup,
});

export default PreviewCard;
