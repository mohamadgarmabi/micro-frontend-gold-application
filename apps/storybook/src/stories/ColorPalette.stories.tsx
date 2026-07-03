import type { Meta, StoryObj } from '@storybook/react-vite';

const swatches = [
  { label: 'Primary', className: 'bg-gold-600', hex: '#7B542F' },
  { label: 'Secondary', className: 'bg-gold-500', hex: '#FF9D00' },
  { label: 'Accent', className: 'bg-gold-200', hex: '#FFCF71' },
  { label: 'Amber', className: 'bg-gold-400', hex: '#B6771D' },
];

const semantic = [
  { label: 'Error', className: 'bg-danger', muted: 'bg-danger-muted' },
  { label: 'Success', className: 'bg-success', muted: 'bg-success-muted' },
  { label: 'Warning', className: 'bg-warning', muted: 'bg-warning-muted' },
  { label: 'Info', className: 'bg-info', muted: 'bg-info-muted' },
];

function ColorPalette() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Brand</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {swatches.map(({ label, className, hex }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className={`h-14 rounded-lg border border-border ${className}`} />
              <span className="text-xs font-medium text-foreground">{label}</span>
              <span className="text-xs text-foreground-subtle">{hex}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Semantic</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {semantic.map(({ label, className, muted }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <div className={`h-10 rounded-lg ${className}`} />
              <div className={`h-6 rounded-lg border border-border ${muted}`} />
              <span className="text-xs font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Neutral</h2>
        <div className="flex overflow-hidden rounded-lg border border-border">
          <div className="h-12 flex-1 bg-neutral-50" title="neutral-50" />
          <div className="h-12 flex-1 bg-neutral-100" title="neutral-100" />
          <div className="h-12 flex-1 bg-neutral-200" title="neutral-200" />
          <div className="h-12 flex-1 bg-neutral-300" title="neutral-300" />
          <div className="h-12 flex-1 bg-neutral-400" title="neutral-400" />
          <div className="h-12 flex-1 bg-neutral-500" title="neutral-500" />
          <div className="h-12 flex-1 bg-neutral-600" title="neutral-600" />
          <div className="h-12 flex-1 bg-neutral-700" title="neutral-700" />
          <div className="h-12 flex-1 bg-neutral-800" title="neutral-800" />
          <div className="h-12 flex-1 bg-neutral-900" title="neutral-900" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-foreground">Surfaces</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-surface p-4 text-sm">surface</div>
          <div className="rounded-lg border border-border bg-surface-muted p-4 text-sm">
            surface-muted
          </div>
          <div className="rounded-lg border border-border bg-surface-elevated p-4 text-sm shadow-popup">
            surface-elevated
          </div>
          <div className="rounded-lg border border-border bg-surface-accent p-4 text-sm">
            surface-accent
          </div>
        </div>
      </section>
    </div>
  );
}

const meta = {
  title: 'Design System/Color Palette',
  component: ColorPalette,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
