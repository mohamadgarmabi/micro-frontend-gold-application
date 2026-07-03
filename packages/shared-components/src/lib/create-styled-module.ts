import {
  createElement,
  type ComponentType,
  type ReactNode,
} from 'react';
import { partStyles } from './styles';
import { styledPart } from './styled-part';

// Base UI parts expose heterogeneous prop shapes; `any` keeps per-part inference.
type AnyComponent = ComponentType<Record<string, unknown>>;

type RootPropsOf<T extends Record<string, unknown>> = T extends {
  Root: ComponentType<infer P>;
}
  ? P
  : never;

type StyledModuleResult<T extends Record<string, unknown>> = (T extends {
  Root: AnyComponent;
}
  ? (props: RootPropsOf<T>) => ReactNode
  : never) & {
  [K in keyof T]: T[K];
};

function createStyledModule<T extends Record<string, unknown>>(
  base: T,
  extra?: Partial<Record<keyof T, string>>
): StyledModuleResult<T> {
  const styled: Record<string, AnyComponent> = {};
  const passthrough: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(base)) {
    if (!isReactComponent(value)) {
      passthrough[key] = value;
      continue;
    }

    const partKey = toPartKey(String(key));
    const className =
      extra?.[key as keyof T] ??
      partStyles[partKey] ??
      partStyles[String(key)] ??
      '';

    styled[key] = className ? styledPart(value, className) : value;
  }

  const Root = styled.Root;
  if (!Root) {
    return { ...styled, ...passthrough } as StyledModuleResult<T>;
  }

  type RootProps = RootPropsOf<T>;

  const partKeys = Object.keys(styled);
  const isSimpleIndicator =
    partKeys.length === 2 &&
    partKeys.includes('Root') &&
    partKeys.includes('Indicator');
  const isSimpleThumb =
    partKeys.length === 2 &&
    partKeys.includes('Root') &&
    partKeys.includes('Thumb');

  const Thumb = styled.Thumb;
  const Indicator = styled.Indicator;

  const ModuleRoot = (props: RootProps) => {
    const { children, ...rest } = props as RootProps & { children?: ReactNode };

    if (children != null) {
      return createElement(Root, rest, children);
    }

    if (isSimpleThumb && Thumb) {
      return createElement(Root, rest, createElement(Thumb));
    }

    if (isSimpleIndicator && Indicator) {
      return createElement(Root, rest, createElement(Indicator));
    }

    return createElement(Root, rest);
  };

  ModuleRoot.displayName = `Gold${Root.displayName ?? 'Root'}`;

  return Object.assign(
    ModuleRoot,
    styled,
    passthrough
  ) as unknown as StyledModuleResult<T>;
}

function toPartKey(exportName: string) {
  return exportName.replace(/[^a-zA-Z0-9]/g, '');
}

function isClass(value: unknown): value is new (...args: never[]) => unknown {
  return (
    typeof value === 'function' &&
    /^class\s/.test(Function.prototype.toString.call(value))
  );
}

function isReactComponent(value: unknown): value is AnyComponent {
  if (value == null) return false;

  if (typeof value === 'object' && '$$typeof' in value) {
    const type = (value as { $$typeof: symbol }).$$typeof;
    return (
      type === Symbol.for('react.forward_ref') ||
      type === Symbol.for('react.memo')
    );
  }

  if (typeof value === 'function') {
    if (isClass(value)) return false;
    const { name } = value;
    if (/^use[A-Z]/.test(name) || /^create[A-Z]/.test(name)) return false;
    return true;
  }

  return false;
}

export { createStyledModule };
export type { StyledModuleResult };
