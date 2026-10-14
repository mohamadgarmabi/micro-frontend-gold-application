import { LiquidGlass as VepandoLiquidGlass } from "@vepando/liquid-glass-react"
import {
  LIQUID_GLASS_DEFAULT_SETTINGS,
  setLiquidGlassSettings,
  useLiquidGlass,
  useLiquidGlassSettings,
} from "./liquid-glass.hook"
import type { LiquidGlassProps, LiquidGlassSettings, LiquidGlassTint } from "./liquid-glass.type"

const LiquidGlass = (props: LiquidGlassProps) => {
  const {
    children,
    className,
    style,
    radius,
    tint,
    refraction,
    blur,
    dispersion,
    specular,
    interactive,
    onClick,
  } = useLiquidGlass(props)

  return (
    <VepandoLiquidGlass
      className={className}
      style={style}
      radius={radius}
      tint={tint}
      refraction={refraction}
      blur={blur}
      dispersion={dispersion}
      specular={specular}
      interactive={interactive}
      onClick={onClick}
    >
      {children}
    </VepandoLiquidGlass>
  )
}

export default LiquidGlass
export { LIQUID_GLASS_DEFAULT_SETTINGS, setLiquidGlassSettings, useLiquidGlassSettings }
export type { LiquidGlassProps, LiquidGlassSettings, LiquidGlassTint }
