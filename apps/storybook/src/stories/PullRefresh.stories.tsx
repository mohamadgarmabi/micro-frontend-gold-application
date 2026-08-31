import type { Meta, StoryObj } from '@storybook/react-vite'
import PullRefresh from '@gold/shared-components/pull-refresh'

const meta = {
  title: 'Components/PullRefresh',
  component: PullRefresh,
  tags: ['autodocs'],
} satisfies Meta<typeof PullRefresh>

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })

const Default: StoryObj<typeof meta> = {
  render: () => (
    <div className="h-[28rem] max-w-md overflow-hidden rounded-xl border border-border bg-background">
      <PullRefresh onRefresh={() => wait(800)}>
        <div className="space-y-3 p-6">
          <p className="text-sm font-medium text-foreground">Pull down to refresh</p>
          <p className="text-sm text-foreground-subtle">
            Scroll this panel, then pull from the top to trigger a refresh.
          </p>
          <div className="h-[36rem] rounded-lg bg-surface-elevated" />
        </div>
      </PullRefresh>
    </div>
  ),
}

export default meta
export { Default }
