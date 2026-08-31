import { cva } from 'class-variance-authority'

const pullRefreshRootStyles = cva(
  'relative h-full overflow-y-auto overscroll-y-none touch-pan-y',
)

const pullRefreshIndicatorStyles = cva(
  'pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-center pt-[max(0.5rem,env(safe-area-inset-top))] text-brand',
)

const pullRefreshLoaderStyles = cva('size-[1.375rem] transition-transform duration-150', {
  variants: {
    spinning: {
      true: 'animate-spin',
      false: '',
    },
  },
})

const pullRefreshContentStyles = cva('min-h-full')

export {
  pullRefreshContentStyles,
  pullRefreshIndicatorStyles,
  pullRefreshLoaderStyles,
  pullRefreshRootStyles,
}
