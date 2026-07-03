type ClassNameArg = string | false | null | undefined;

function cn(...classes: ClassNameArg[]) {
  return classes.filter(Boolean).join(' ');
}

function mergeClassName<S>(
  base: string,
  className?: string | ((state: S) => string | undefined)
): string | ((state: S) => string | undefined) {
  if (typeof className === 'function') {
    return (state: S) => cn(base, className(state));
  }

  return cn(base, className);
}

export { cn, mergeClassName };
