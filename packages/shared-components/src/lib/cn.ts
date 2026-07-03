type ClassNameArg = string | false | null | undefined;

export function cn(...classes: ClassNameArg[]) {
  return classes.filter(Boolean).join(' ');
}

export function mergeClassName<S>(
  base: string,
  className?: string | ((state: S) => string | undefined)
): string | ((state: S) => string | undefined) {
  if (typeof className === 'function') {
    return (state: S) => cn(base, className(state));
  }

  return cn(base, className);
}
