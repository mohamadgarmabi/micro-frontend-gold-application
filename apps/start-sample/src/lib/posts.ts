export type Post = {
  id: number
  title: string
  body: string
}

export const postsQueryKey = ['posts'] as const

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=8',
  )

  if (!response.ok) {
    throw new Error('Failed to load posts')
  }

  return response.json() as Promise<Post[]>
}
