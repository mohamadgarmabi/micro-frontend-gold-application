import { mutationOptions, queryOptions } from '@tanstack/react-query'
import { getApiClient } from '../../client'
import type { CreatePostDto, PostDto, UpdatePostDto } from '../dto'
import { endpoint } from '../endpoints'

export type GetPostListParams = {
  limit?: number
}

export const postController = {
  getPostList: (params: GetPostListParams = {}) =>
    queryOptions({
      queryKey: [endpoint.post.get, params] as const,
      queryFn: async () => {
        const { data } = await getApiClient().get<PostDto[]>(endpoint.post.get, {
          params: { _limit: params.limit ?? 8 },
        })

        return data
      },
    }),

  getPostById: (id: number) =>
    queryOptions({
      queryKey: [endpoint.post.getById(id), id] as const,
      queryFn: async () => {
        const { data } = await getApiClient().get<PostDto>(endpoint.post.getById(id))
        return data
      },
      enabled: id > 0,
    }),

  createPost: () =>
    mutationOptions({
      mutationKey: [endpoint.post.get, 'create'] as const,
      mutationFn: async (input: CreatePostDto) => {
        const { data } = await getApiClient().post<PostDto>(endpoint.post.get, input)
        return data
      },
    }),

  updatePost: (id: number) =>
    mutationOptions({
      mutationKey: [endpoint.post.getById(id), 'update'] as const,
      mutationFn: async (input: UpdatePostDto) => {
        const { data } = await getApiClient().patch<PostDto>(
          endpoint.post.getById(id),
          input,
        )
        return data
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
