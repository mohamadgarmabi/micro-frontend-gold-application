type ClassNameArg = string | false | null | undefined

type ClassNameFn<S> = (state: S) => string | undefined

type MergeClassName = {
  (base: string, className?: string): string
  <S>(base: string, className?: string | ClassNameFn<S>): string | ClassNameFn<S>
}

const cn = (...classes: ClassNameArg[]) => {
  return classes.filter(Boolean).join(' ')
}

const mergeClassName = ((base: string, className?: string | ClassNameFn<unknown>) => {
  if (typeof className === 'function') {
    return (state: unknown) => cn(base, className(state))
  }

  return cn(base, className)
}) as MergeClassName

export { cn, mergeClassName }
