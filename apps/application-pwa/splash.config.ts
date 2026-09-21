import { readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import type { IndexHtmlTransformContext, Plugin } from "vite"
import { viteSplashScreen, type SplashScreenOptions } from "vite-plugin-react-splash"
import { THEME_META_COLORS } from "./src/config/theme.constants"

const appDirectory = path.dirname(fileURLToPath(import.meta.url))
const appLogoSvg = readFileSync(path.join(appDirectory, "public/icon.svg"), "utf8")

const VIRTUAL_SPLASH_ID = "virtual:vite-splash"
const RESOLVED_VIRTUAL_SPLASH_ID = `\0${VIRTUAL_SPLASH_ID}`

const EMPTY_HTML_CONTEXT = {
  path: "/",
  filename: "index.html",
} as IndexHtmlTransformContext

const splashScreenOptions: SplashScreenOptions = {
  logo: {
    light: appLogoSvg,
    dark: appLogoSvg,
  },
  text: "Ayar",
  waitUntilReady: true,
  minDuration: 1200,
  animation: "pulse",
  mode: "auto",
  respectReducedMotion: true,
  theme: {
    light: {
      background: THEME_META_COLORS.light,
      color: THEME_META_COLORS.dark,
    },
    dark: {
      background: THEME_META_COLORS.dark,
      color: THEME_META_COLORS.light,
    },
  },
}

type SplashHtmlTransform = (
  html: string,
  ctx: IndexHtmlTransformContext,
) => string | void | Promise<string | void>

const renderSplashHtml = (plugin: Plugin, html: string): string => {
  const hook = plugin.transformIndexHtml
  const transform: SplashHtmlTransform | undefined =
    typeof hook === "function"
      ? (hook as unknown as SplashHtmlTransform)
      : hook && typeof hook === "object" && typeof hook.handler === "function"
        ? (hook.handler as unknown as SplashHtmlTransform)
        : undefined

  if (!transform) {
    throw new Error("vite-plugin-react-splash: transformIndexHtml is missing")
  }

  const result = transform(html, EMPTY_HTML_CONTEXT)
  if (typeof result !== "string") {
    throw new Error("vite-plugin-react-splash: expected string transform result")
  }

  return result
}

const parseSplashInjection = (html: string) => {
  const styleMatch = html.match(/<style id="vite-splash-critical">([\s\S]*?)<\/style>/)
  const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/)
  const body = bodyMatch?.[1] ?? ""
  const scriptMatch = body.match(/<script>([\s\S]*?)<\/script>/)

  return {
    criticalCss: styleMatch?.[1] ?? "",
    markup: body.replace(/<script>[\s\S]*?<\/script>/, "").trim(),
    runtimeScript: scriptMatch?.[1] ?? "",
  }
}

const createSplashPlugins = (): Plugin[] => {
  const splashPlugin = viteSplashScreen(splashScreenOptions)

  const virtualSplashPlugin: Plugin = {
    name: "virtual-vite-splash",
    resolveId: (id) => {
      if (id === VIRTUAL_SPLASH_ID) {
        return RESOLVED_VIRTUAL_SPLASH_ID
      }

      return undefined
    },
    load: (id) => {
      if (id !== RESOLVED_VIRTUAL_SPLASH_ID) {
        return undefined
      }

      const html = renderSplashHtml(
        splashPlugin,
        "<!DOCTYPE html><html><head></head><body></body></html>",
      )
      const parts = parseSplashInjection(html)

      return [
        `export const splashCriticalCss = ${JSON.stringify(parts.criticalCss)}`,
        `export const splashMarkup = ${JSON.stringify(parts.markup)}`,
        `export const splashRuntimeScript = ${JSON.stringify(parts.runtimeScript)}`,
      ].join("\n")
    },
  }

  return [splashPlugin, virtualSplashPlugin]
}

export { createSplashPlugins, splashScreenOptions, VIRTUAL_SPLASH_ID }
