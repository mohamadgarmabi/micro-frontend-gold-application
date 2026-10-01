import { queryOptions } from "@tanstack/react-query"
import type { SseCallOptions, SseSubscription } from "tanstack-fetch"
import { getApiClient } from "../../client"
import type { MarketOverviewResponseDto, MarketTickResponseDto } from "../dto"
import { marketEndpoint } from "../endpoints"

const marketController = {
  getOverview: () =>
    queryOptions({
      queryKey: [marketEndpoint.overview] as const,
      queryFn: async () => {
        return getApiClient().get<MarketOverviewResponseDto>(marketEndpoint.overview, {})
      },
    }),

  /**
   * Subscribe to live market ticks via SSE (`tanstack-fetch/sse`).
   * Prefer updating the overview cache with `setQueryData` on each message.
   */
  subscribeTicks: (
    handlers: SseCallOptions<MarketTickResponseDto> &
      (
        | {
            onMessage: NonNullable<SseCallOptions<MarketTickResponseDto>["onMessage"]>
          }
        | {
            onEvent: NonNullable<SseCallOptions<MarketTickResponseDto>["onEvent"]>
          }
      ),
  ): SseSubscription => {
    return getApiClient().sse<MarketTickResponseDto>(marketEndpoint.ticks, handlers)
  },
}

export { marketController }
