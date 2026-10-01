import { mutationOptions, queryOptions } from "@tanstack/react-query"
import type { NoParams } from "tanstack-fetch"
import { getApiClient } from "../../client"
import type { PostListQueryDto, PostParamsDto, PostRequestDto, PostResponseDto } from "../dto"
import { endpoint } from "../endpoints"

const postController = {
  getPostList: (query: PostListQueryDto = {}) =>
    queryOptions({
      queryKey: [endpoint.post.get, query] as const,
      queryFn: async () => {
        return getApiClient().get<PostResponseDto[]>(endpoint.post.get, {
          query: { _limit: query.limit ?? 8 },
        })
      },
    }),

  getPostById: (params: PostParamsDto) =>
    queryOptions({
      queryKey: [endpoint.post.getById, params] as const,
      queryFn: async () => {
        return getApiClient().get<PostResponseDto, PostParamsDto>(endpoint.post.getById, {
          params,
        })
      },
      enabled: params.id > 0,
    }),

  createPost: () =>
    mutationOptions({
      mutationKey: [endpoint.post.get, "create"] as const,
      mutationFn: async (body: PostRequestDto) => {
        return getApiClient().post<PostResponseDto, NoParams, PostRequestDto>(endpoint.post.get, {
          body,
        })
      },
    }),

  updatePost: (params: PostParamsDto) =>
    mutationOptions({
      mutationKey: [endpoint.post.getById, params, "update"] as const,
      mutationFn: async (body: Partial<PostRequestDto>) => {
        return getApiClient().patch<PostResponseDto, PostParamsDto, Partial<PostRequestDto>>(
          endpoint.post.getById,
          {
            params,
            body,
          },
        )
      },
    }),

  removePost: (params: PostParamsDto) =>
    mutationOptions({
      mutationKey: [endpoint.post.getById, params, "remove"] as const,
      mutationFn: async () => {
        await getApiClient().delete<unknown, PostParamsDto>(endpoint.post.getById, {
          params,
        })
      },
    }),
}

export { postController }
