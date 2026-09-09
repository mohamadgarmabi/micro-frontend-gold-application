import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { getApiClient } from '../../client'
import type { CreatePostDto, PostDto, UpdatePostDto } from '../dto'
import { endpoint } from '../endpoints'

type GetPostListParams = {
  limit?: number
}

const postController = {
  getPostList: (params: GetPostListParams = {}) =>
    queryOptions({
      queryKey: [endpoint.post.get, params] as const,
      queryFn: async () => {
        return getApiClient().get<PostDto[]>(endpoint.post.get, {
          query: { _limit: params.limit ?? 8 },
        })
      },
    }),

  getPostById: (id: number) =>
    queryOptions({
      queryKey: [endpoint.post.getById(id), id] as const,
      queryFn: async () => {
        return getApiClient().get<PostDto>(endpoint.post.getById(id))
      },
      enabled: id > 0,
    }),

  createPost: () =>
    mutationOptions({
      mutationKey: [endpoint.post.get, 'create'] as const,
      mutationFn: async (input: CreatePostDto) => {
        return getApiClient().post<PostDto>(endpoint.post.get, { body: input })
      },
    }),

  updatePost: (id: number) =>
    mutationOptions({
      mutationKey: [endpoint.post.getById(id), 'update'] as const,
      mutationFn: async (input: UpdatePostDto) => {
        return getApiClient().patch<PostDto>(endpoint.post.getById(id), { body: input })
      },
    }),

  removePost: (id: number) =>
    mutationOptions({
      mutationKey: [endpoint.post.getById(id), 'remove'] as const,
      mutationFn: async () => {
        await getApiClient().delete(endpoint.post.getById(id))
      },
    }),
}

export { postController }
export type { GetPostListParams }
