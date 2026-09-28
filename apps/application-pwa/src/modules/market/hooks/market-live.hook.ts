import {
  getApiClient,
  marketController,
  marketEndpoint,
  type MarketOverviewDto,
  type MarketTickDto,
} from "@gold/apis"
import { useSse, type SseStatus } from "@gold/apis/react"
import { useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"

type UseMarketLiveOptions = {
  enabled?: boolean
}

const applyTickToOverview = (
  overview: MarketOverviewDto | undefined,
  tick: MarketTickDto,
): MarketOverviewDto | undefined => {
  if (!overview) {
    return overview
  }

  return {
    ...overview,
    spotPrice: tick.spotPrice,
    change: tick.change,
    assets: tick.assets,
  }
}

const isStreamActive = (status: SseStatus) => {
  return status === "connecting" || status === "connected"
}

const useMarketLive = ({ enabled = true }: UseMarketLiveOptions = {}) => {
  const queryClient = useQueryClient()
  const client = getApiClient()
  const statusRef = useRef<SseStatus>("disconnected")
  const streamEnabled = enabled && typeof window !== "undefined"

  const { data, status, error } = useSse<MarketTickDto>(marketEndpoint.ticks, {
    client,
    enabled: streamEnabled,
    onMessage: (tick) => {
      // Drop late events after close / before subscribe — status is source of truth.
      if (!isStreamActive(statusRef.current)) {
        return
      }

      queryClient.setQueryData(marketController.getOverview().queryKey, (current) =>
        applyTickToOverview(current as MarketOverviewDto | undefined, tick),
      )
    },
  })

  statusRef.current = status

  const isConnected = status === "connected"

  return {
    status,
    error,
    isConnected,
    lastTickAt: isConnected ? (data?.at ?? null) : null,
  }
}

export { useMarketLive }
