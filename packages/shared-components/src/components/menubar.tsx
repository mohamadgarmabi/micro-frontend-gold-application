import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import type { ComponentProps } from 'react';
import { mergeClassName } from '../lib/cn';
import { singleComponentStyles } from '../lib/styles';

export type MenubarProps = ComponentProps<typeof BaseMenubar>;

export function Menubar({ className, ...props }: MenubarProps) {
  return (
    <BaseMenubar
      className={mergeClassName(singleComponentStyles.Menubar, className)}
      {...props}
    />
  );
}

export default Menubar;
