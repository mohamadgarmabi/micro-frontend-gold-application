import { useVirtualizer } from '@tanstack/react-virtual'
import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'

const ITEM_COUNT = 10_000
const ROW_HEIGHT = 44

export const Route = createFileRoute('/virtual')({
  component: VirtualDemo,
})

function VirtualDemo() {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: ITEM_COUNT,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 12,
  })

  const items = virtualizer.getVirtualItems()

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">TanStack Virtual</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {ITEM_COUNT.toLocaleString()} rows
        </h1>
        <p className="mb-6 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Only visible rows are mounted. Scroll to verify smooth performance on
          large datasets.
        </p>

        <div
          ref={parentRef}
          className="h-[min(60vh,28rem)] overflow-auto rounded-xl border border-[var(--line)] bg-[var(--surface)]"
        >
          <div
            className="relative w-full"
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            {items.map((item) => (
              <div
                key={item.key}
                className="absolute left-0 top-0 flex w-full items-center border-b border-[var(--line)] px-4 text-sm text-[var(--sea-ink)]"
                style={{
                  height: `${item.size}px`,
                  transform: `translateY(${item.start}px)`,
                }}
              >
                <span className="w-16 font-mono text-[var(--sea-ink-soft)]">
                  {String(item.index + 1).padStart(5, '0')}
                </span>
                <span>Virtual row {item.index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
