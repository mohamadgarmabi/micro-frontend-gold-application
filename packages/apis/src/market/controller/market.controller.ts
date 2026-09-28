import { queryOptions } from "@tanstack/react-query"
import type { SseCallOptions, SseSubscription } from "tanstack-fetch"
import { getApiClient } from "../../client"
import type { MarketOverviewDto, MarketTickDto } from "../dto"
import { marketEndpoint } from "../endpoints"

const marketController = {
  getOverview: () =>
    queryOptions({
      queryKey: [marketEndpoint.overview] as const,
      queryFn: async () => {
        return getApiClient().get<MarketOverviewDto>(marketEndpoint.overview)
      },
    }),

  /**
   * Subscribe to live market ticks via SSE (`tanstack-fetch/sse`).
   * Prefer updating the overview cache with `setQueryData` on each message.
   */
  subscribeTicks: (
    handlers: SseCallOptions<MarketTickDto> &
      (
        | { onMessage: NonNullable<SseCallOptions<MarketTickDto>["onMessage"]> }
        | {
            onEvent: NonNullable<SseCallOptions<MarketTickDto>["onEvent"]>
          }
      ),
  ): SseSubscription => {
    return getApiClient().sse<MarketTickDto>(marketEndpoint.ticks, handlers)
  },
}

export { marketController }
