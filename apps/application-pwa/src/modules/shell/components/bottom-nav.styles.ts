import { cva } from 'class-variance-authority'

const liquidNavStyles = cva('liquid-nav')

const liquidNavFrostStyles = cva('liquid-nav__frost')

const liquidNavBarStyles = cva('liquid-nav__bar')

const liquidNavTrackStyles = cva('liquid-nav__track')

const liquidNavGlowStyles = cva('liquid-nav__glow')

const liquidNavIndicatorStyles = cva('liquid-nav__indicator')

const liquidNavSliderStyles = cva('liquid-nav__slider', {
  variants: {
    ready: {
      true: 'is-ready',
    },
  },
})

const liquidNavItemStyles = cva('liquid-nav__item', {
  variants: {
    active: {
      true: 'is-active',
    },
  },
})

export {
  liquidNavBarStyles,
  liquidNavFrostStyles,
  liquidNavGlowStyles,
  liquidNavIndicatorStyles,
  liquidNavItemStyles,
  liquidNavSliderStyles,
  liquidNavStyles,
  liquidNavTrackStyles,
}
