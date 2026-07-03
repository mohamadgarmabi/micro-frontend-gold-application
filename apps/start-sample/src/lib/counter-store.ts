import { Store } from '@tanstack/store'

export type CounterState = {
  count: number
}

export const counterStore = new Store<CounterState>({
  count: 0,
})

export function incrementCounter(by = 1) {
  counterStore.setState((state) => ({ count: state.count + by }))
}

export function decrementCounter(by = 1) {
  counterStore.setState((state) => ({ count: state.count - by }))
}

export function resetCounter() {
  counterStore.setState({ count: 0 })
}
