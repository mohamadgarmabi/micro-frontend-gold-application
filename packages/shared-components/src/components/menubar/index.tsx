import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import { mergeClassName } from '../../lib/cn';
import type { MenubarProps } from './menubar.type';
import { menubarClassName } from './menubar.styles';

function Menubar({ className, ...props }: MenubarProps) {
  return (
    <BaseMenubar
      className={mergeClassName(menubarClassName, className)}
      {...props}
    />
  );
}

export default Menubar;
export type { MenubarProps };
