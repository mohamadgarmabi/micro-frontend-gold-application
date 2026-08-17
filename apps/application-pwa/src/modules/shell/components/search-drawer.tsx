import Drawer from '@gold/shared-components/drawer'
import Input from '@gold/shared-components/input'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import type { SearchResult } from '../types'

type SearchDrawerProps = {
  isOpen: boolean
  query: string
  results: SearchResult[]
  onOpenChange: (open: boolean) => void
  onQueryChange: (value: string) => void
  onClose: () => void
}

const SearchDrawer = ({
  isOpen,
  query,
  results,
  onOpenChange,
  onQueryChange,
  onClose,
}: SearchDrawerProps) => {
  const navigate = useNavigate()

  const handleSelect = (href: SearchResult['href']) => {
    onClose()
    navigate({ to: href })
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-[2px]" />
        <Drawer.Popup className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md rounded-t-3xl border border-border bg-surface p-5 pb-8 shadow-popup">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
          <Drawer.Title className="mb-1 text-lg font-semibold text-foreground">
            Search
          </Drawer.Title>
          <Drawer.Description className="mb-4 text-sm text-foreground-subtle">
            Find assets, pages, and markets
          </Drawer.Description>
          <Input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search anything..."
            leftIcon={<Search />}
          />
          <div className="mt-4 max-h-72 space-y-1 overflow-y-auto">
            {results.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-foreground-subtle">
                No results for “{query}”
              </p>
            ) : (
              results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.href)}
                  className="flex w-full flex-col rounded-xl px-3 py-3 text-start transition-colors hover:bg-gold-100"
                >
                  <span className="text-sm font-medium text-foreground">{item.title}</span>
                  <span className="text-xs text-foreground-subtle">{item.subtitle}</span>
                </button>
              ))
            )}
          </div>
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer>
  )
}

export default SearchDrawer
