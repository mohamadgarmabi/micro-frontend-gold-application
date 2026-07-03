import { createElement, type ComponentProps, type ComponentType } from 'react';
import { cn } from './cn';

export function styledPart<C extends ComponentType<Record<string, unknown>>>(
  Component: C,
  baseClassName: string
): C {
  const Styled = (props: ComponentProps<C>) => {
    const { className, ...rest } = props as ComponentProps<C> & {
      className?: string;
    };

    return createElement(Component, {
      className: cn(baseClassName, className),
      ...(rest as Record<string, unknown>),
    } as ComponentProps<C>);
  };

  Styled.displayName = `Gold${Component.displayName ?? 'Part'}`;
  return Styled as C;
}
