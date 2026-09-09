import { queryOptions } from '@tanstack/react-query'
import { getApiClient } from '../../client'
import type { MarketOverviewDto } from '../dto'
import { marketEndpoint } from '../endpoints'

const marketController = {
  getOverview: () =>
    queryOptions({
      queryKey: [marketEndpoint.overview] as const,
      queryFn: async () => {
        return getApiClient().get<MarketOverviewDto>(marketEndpoint.overview)
      },
    }),
}

export { marketController }
