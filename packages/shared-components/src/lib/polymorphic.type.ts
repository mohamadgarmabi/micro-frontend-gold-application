import type { ComponentPropsWithoutRef, ElementType } from 'react'

type PolymorphicProps<E extends ElementType, Own> = Own & {
  as?: E
} & Omit<ComponentPropsWithoutRef<E>, keyof Own | 'as'>

export type { PolymorphicProps }
