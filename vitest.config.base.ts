import { defineConfig } from 'vitest/config'

type CreateVitestConfigOptions = {
  root: string
  environment?: 'node' | 'jsdom'
}

const createVitestConfig = ({
  root,
  environment = 'jsdom',
}: CreateVitestConfigOptions) =>
  defineConfig({
    root,
    test: {
      name: root,
      globals: true,
      environment,
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      passWithNoTests: true,
      reporters: ['default'],
      coverage: {
        provider: 'v8',
        reportsDirectory: `${root}/coverage`,
      },
    },
  })

export { createVitestConfig }
