export type PostDto = {
  id: number
  title: string
  body: string
  userId?: number
}

export type CreatePostDto = {
  title: string
  body: string
  userId: number
}

export type UpdatePostDto = Partial<CreatePostDto>
