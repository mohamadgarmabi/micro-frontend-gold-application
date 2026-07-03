import { Toaster as SonnerToaster, toast } from 'sonner';
import { mergeClassName } from '../../lib/cn';
import type { ToasterProps } from './sonner.type';
import { useSonner } from './sonner.hook';
import { sonnerClassNames } from './sonner.styles';
import './sonner.css';

function Toaster({
  className,
  position = 'top-right',
  richColors = true,
  dir,
  theme,
  toastOptions: toastOptionsProp,
  ...props
}: ToasterProps) {
  const { dir: resolvedDir, theme: resolvedTheme, toastOptions } = useSonner({ dir, theme });

  return (
    <SonnerToaster
      className={mergeClassName(sonnerClassNames.toaster, className)}
      position={position}
      dir={resolvedDir}
      theme={resolvedTheme}
      richColors={richColors}
      closeButton
      toastOptions={{
        ...toastOptions,
        ...toastOptionsProp,
        classNames: {
          ...toastOptions.classNames,
          ...toastOptionsProp?.classNames,
        },
      }}
      {...props}
    />
  );
}

export default Toaster;
export { toast };
export type { ToasterProps };
