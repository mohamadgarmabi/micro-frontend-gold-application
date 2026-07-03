import type { ToasterProps } from './sonner.type';
import { sonnerToastOptions } from './sonner.styles';

function useSonner(props: Pick<ToasterProps, 'dir' | 'theme'>) {
  const dir =
    props.dir ??
    (typeof document !== 'undefined' ? (document.documentElement.dir as 'rtl' | 'ltr') : 'rtl');

  const theme = props.theme ?? 'system';

  return {
    dir,
    theme,
    toastOptions: sonnerToastOptions,
  };
}

export { useSonner };
