import { createElement } from 'react'

const pathIcon = (d: string, className: string) =>
  createElement(
    'svg',
    {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      className,
      'aria-hidden': true,
    },
    createElement('path', { d, strokeLinecap: 'round', strokeLinejoin: 'round' }),
  )

const selectCheckIcon = pathIcon('m5 12 4 4 10-10', 'size-4 shrink-0 text-gold-600')

const selectChevronIcon = pathIcon('m6 9 6 6 6-6', 'size-4 shrink-0 text-foreground-subtle')

const selectSearchIcon = createElement(
  'svg',
  {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    className: 'size-4',
    'aria-hidden': true,
  },
  createElement('circle', { cx: '11', cy: '11', r: '8' }),
  createElement('path', { d: 'm21 21-4.3-4.3', strokeLinecap: 'round', strokeLinejoin: 'round' }),
)

const selectEmptyIcon = createElement('span', { className: 'size-4 shrink-0', 'aria-hidden': true })

export { selectCheckIcon, selectChevronIcon, selectEmptyIcon, selectSearchIcon }
