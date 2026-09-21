import { useEffect } from "react"
import { useSplashScreen } from "vite-plugin-react-splash"
import type { ResolvedTheme } from "../types"

type UseViteSplashParams = {
  resolvedTheme: ResolvedTheme
}

const useViteSplash = ({ resolvedTheme }: UseViteSplashParams) => {
  const { hideSplashScreen, setSplashTheme } = useSplashScreen()

  useEffect(() => {
    setSplashTheme(resolvedTheme)
  }, [resolvedTheme, setSplashTheme])

  useEffect(() => {
    const dismiss = () => {
      hideSplashScreen()
    }

    if (document.readyState === "complete") {
      dismiss()
      return undefined
    }

    window.addEventListener("load", dismiss, { once: true })

    return () => {
      window.removeEventListener("load", dismiss)
    }
  }, [hideSplashScreen])
}

export { useViteSplash }
