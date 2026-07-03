import { Avatar as BaseAvatar } from '@base-ui/react/avatar';
import { createStyledModule } from '../../lib/create-styled-module';
import { avatarStyles } from './avatar.styles';

const Avatar = createStyledModule(BaseAvatar, avatarStyles);

export default Avatar;
