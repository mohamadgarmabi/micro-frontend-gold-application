import { createElement } from 'react'

const inputIconSvg = (...children: ReturnType<typeof createElement>[]) => {
  return createElement(
    'svg',
    {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      className: 'size-4',
      'aria-hidden': true,
    },
    ...children,
  )
}

const inputEyeIcon = inputIconSvg(
  createElement('path', {
    d: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }),
  createElement('circle', { cx: '12', cy: '12', r: '3' }),
)

const inputEyeOffIcon = inputIconSvg(
  createElement('path', {
    d: 'M3 3l18 18',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }),
  createElement('path', {
    d: 'M10.6 10.6a2 2 0 0 0 2.8 2.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }),
  createElement('path', {
    d: 'M9.9 5.1A11 11 0 0 1 12 5c6.5 0 10 7 10 7a18 18 0 0 1-2.2 3.1',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }),
  createElement('path', {
    d: 'M6.6 6.6C4.3 8.3 2.8 10.4 2 12s3.5 7 10 7a10.4 10.4 0 0 0 4.2-.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }),
)

export { inputEyeIcon, inputEyeOffIcon }
