type PostResponseDto = {
  id: number
  title: string
  body: string
  userId?: number
}

type PostRequestDto = {
  title: string
  body: string
  userId: number
}

type PostParamsDto = {
  id: number
}

type PostListQueryDto = {
  limit?: number
}

export type { PostListQueryDto, PostParamsDto, PostRequestDto, PostResponseDto }
