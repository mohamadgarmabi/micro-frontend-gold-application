import { cn, mergeClassName } from './cn'

describe('cn', () => {
  it('joins truthy class names', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b')
  })

  it('returns an empty string when no classes are provided', () => {
    expect(cn()).toBe('')
  })
})

describe('mergeClassName', () => {
  it('merges static class names', () => {
    expect(mergeClassName('base', 'extra')).toBe('base extra')
  })

  it('returns a class name resolver when given a function', () => {
    const resolveClassName = mergeClassName('base', (state: { active: boolean }) =>
      state.active ? 'active' : undefined,
    )

    expect(typeof resolveClassName).toBe('function')
    expect(resolveClassName({ active: true })).toBe('base active')
    expect(resolveClassName({ active: false })).toBe('base')
  })
})
