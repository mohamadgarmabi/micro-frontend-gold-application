import { createElement, type ComponentType, type ReactNode } from 'react'
import { partStyles } from './styles'
import { styledPart } from './styled-part'

type AnyComponent = ComponentType<Record<string, unknown>>

type RootPropsOf<T> = T extends {
  Root: ComponentType<infer P>
}
  ? P
  : Record<string, unknown>

type StyledModuleResult<T> = ((props: RootPropsOf<T>) => ReactNode) & T

type StyleSlot = string | (() => string)

const resolveStyleSlot = (value: unknown) => {
  if (typeof value === 'function') {
    return String(value())
  }

  if (typeof value === 'string') {
    return value
  }

  return ''
}

const createStyledModule = <T extends object>(
  base: T,
  extra?: Partial<Record<keyof T, StyleSlot>>,
): StyledModuleResult<T> => {
  const styled: Record<string, AnyComponent> = {}
  const passthrough: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(base)) {
    if (!isReactComponent(value)) {
      passthrough[key] = value
      continue
    }

    const partKey = toPartKey(String(key))
    const className =
      resolveStyleSlot(extra?.[key as keyof T]) ||
      partStyles[partKey] ||
      partStyles[String(key)] ||
      ''

    styled[key] = className ? styledPart(value, className) : value
  }

  const Root = styled.Root
  if (!Root) {
    return { ...styled, ...passthrough } as StyledModuleResult<T>
  }

  type RootProps = RootPropsOf<T>

  const partKeys = Object.keys(styled)
  const isSimpleIndicator =
    partKeys.length === 2 && partKeys.includes('Root') && partKeys.includes('Indicator')
  const isSimpleThumb =
    partKeys.length === 2 && partKeys.includes('Root') && partKeys.includes('Thumb')

  const Thumb = styled.Thumb
  const Indicator = styled.Indicator

  const ModuleRoot = (props: RootProps) => {
    const { children, ...rest } = props as RootProps & { children?: ReactNode }

    if (children != null) {
      return createElement(Root, rest, children)
    }

    if (isSimpleThumb && Thumb) {
      return createElement(Root, rest, createElement(Thumb))
    }

    if (isSimpleIndicator && Indicator) {
      return createElement(Root, rest, createElement(Indicator))
    }

    return createElement(Root, rest)
  }

  ModuleRoot.displayName = `Gold${Root.displayName ?? 'Root'}`

  return Object.assign(ModuleRoot, styled, passthrough) as unknown as StyledModuleResult<T>
}

const toPartKey = (exportName: string) => {
  return exportName.replace(/[^a-zA-Z0-9]/g, '')
}

const isClass = (value: unknown): value is new (...args: never[]) => unknown => {
  return typeof value === 'function' && /^class\s/.test(Function.prototype.toString.call(value))
}

const isReactComponent = (value: unknown): value is AnyComponent => {
  if (value == null) return false

  if (typeof value === 'object' && '$$typeof' in value) {
    const type = (value as { $$typeof: symbol }).$$typeof
    return type === Symbol.for('react.forward_ref') || type === Symbol.for('react.memo')
  }

  if (typeof value === 'function') {
    if (isClass(value)) return false
    const { name } = value
    if (/^use[A-Z]/.test(name) || /^create[A-Z]/.test(name)) return false
    return true
  }

  return false
}

export { createStyledModule }
export type { StyledModuleResult }
