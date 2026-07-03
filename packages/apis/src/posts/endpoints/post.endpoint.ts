export const endpoint = {
  post: {
    get: '/posts',
    getById: (id: number) => `/posts/${id}`,
  },
} as const
