import { useSelector } from '@tanstack/react-store'
import { createFileRoute } from '@tanstack/react-router'
import {
  counterStore,
  decrementCounter,
  incrementCounter,
  resetCounter,
} from '../lib/counter-store'

export const Route = createFileRoute('/store')({
  component: StoreDemo,
})

function StoreDemo() {
  const count = useSelector(counterStore, (state) => state.count)

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">TanStack Store</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Reactive counter
        </h1>
        <p className="mb-8 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Store is framework-agnostic. Components subscribe with{' '}
          <code>useStore</code> and update via <code>setState</code>.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <p className="m-0 text-5xl font-bold tabular-nums text-[var(--sea-ink)]">
            {count}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)]"
              onClick={() => decrementCounter()}
            >
              −1
            </button>
            <button
              type="button"
              className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-4 py-2 text-sm font-semibold text-[var(--lagoon-deep)]"
              onClick={() => incrementCounter()}
            >
              +1
            </button>
            <button
              type="button"
              className="rounded-full border border-[rgba(23,58,64,0.2)] bg-white/50 px-4 py-2 text-sm font-semibold text-[var(--sea-ink)]"
              onClick={() => resetCounter()}
            >
              Reset
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
