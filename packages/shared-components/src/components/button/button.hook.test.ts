import { renderHook } from '@testing-library/react'
import { useButton } from './button.hook'

describe('useButton', () => {
  it('disables the button when loading', () => {
    const { result } = renderHook(() => useButton({ loading: true }))

    expect(result.current.isDisabled).toBe(true)
  })

  it('disables the button when disabled is true', () => {
    const { result } = renderHook(() => useButton({ disabled: true }))

    expect(result.current.isDisabled).toBe(true)
  })

  it('keeps the button enabled by default', () => {
    const { result } = renderHook(() => useButton({}))

    expect(result.current.isDisabled).toBe(false)
  })
})
