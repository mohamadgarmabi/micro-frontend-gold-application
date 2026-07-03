import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { fetchPosts, postsQueryKey } from '../lib/posts'

export const Route = createFileRoute('/query')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: postsQueryKey,
      queryFn: fetchPosts,
    }),
  component: QueryDemo,
})

function QueryDemo() {
  const { data: posts } = useSuspenseQuery({
    queryKey: postsQueryKey,
    queryFn: fetchPosts,
  })

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">TanStack Query</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          SSR-prefetched posts
        </h1>
        <p className="mb-6 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          Data is prefetched in the route loader and hydrated on the client.
          API responses are cached by the service worker for offline reads.
        </p>

        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--kicker)]">
                #{post.id}
              </p>
              <h2 className="mb-2 text-sm font-semibold text-[var(--sea-ink)]">
                {post.title}
              </h2>
              <p className="m-0 line-clamp-3 text-sm text-[var(--sea-ink-soft)]">
                {post.body}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
