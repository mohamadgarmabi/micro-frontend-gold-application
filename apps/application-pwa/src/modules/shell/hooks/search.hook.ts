import { useCallback, useMemo, useState } from 'react'
import { assets } from '#/modules/market/utils/data'
import type { SearchResult } from '../types'

const pageResults: SearchResult[] = [
  { id: 'page-home', title: 'Home', subtitle: 'Dashboard & spot price', href: '/home' },
  { id: 'page-chart', title: 'Chart', subtitle: 'Price history', href: '/chart' },
  { id: 'page-trade', title: 'Trade', subtitle: 'Buy and sell metals', href: '/trade' },
  { id: 'page-profile', title: 'Profile', subtitle: 'Account & holdings', href: '/profile' },
  { id: 'page-options', title: 'Settings', subtitle: 'Theme and alerts', href: '/options' },
]

const assetResults: SearchResult[] = assets.map((asset) => ({
  id: `asset-${asset.symbol}`,
  title: asset.name,
  subtitle: asset.symbol,
  href: '/chart',
}))

const searchCatalog = [...pageResults, ...assetResults]

const useSearch = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) {
      return searchCatalog
    }

    return searchCatalog.filter((item) => {
      return (
        item.title.toLowerCase().includes(normalized) ||
        item.subtitle.toLowerCase().includes(normalized)
      )
    })
  }, [query])

  const openSearch = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setQuery('')
  }, [])

  return {
    isOpen,
    query,
    results,
    openSearch,
    closeSearch,
    setQuery,
    setIsOpen,
  }
}

export { useSearch }
