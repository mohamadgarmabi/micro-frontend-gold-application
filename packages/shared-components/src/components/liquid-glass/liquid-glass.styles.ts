import { cva } from "class-variance-authority"

// Children follow the glass corner radius so the global radius setting reshapes their surface too.
const liquidGlassStyles = cva(
  "max-w-full [&>.lg\\_\\_content]:rounded-[inherit] [&>.lg\\_\\_content>*]:rounded-[inherit]",
)

export { liquidGlassStyles }
