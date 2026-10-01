const endpoint = {
  post: {
    get: "/posts",
    getById: "/posts/:id",
  },
} as const

export { endpoint }
