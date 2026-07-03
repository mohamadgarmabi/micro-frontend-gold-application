import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { createStyledModule } from '../lib/create-styled-module';
import { styles } from '../lib/styles';

export const Avatar = createStyledModule(BaseAvatar, {
  Root: styles.avatarRoot,
  Image: styles.avatarImage,
  Fallback: styles.avatarFallback,
});

export default Avatar;
