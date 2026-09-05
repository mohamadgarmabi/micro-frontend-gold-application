import react from '@vitejs/plugin-react'
import { defineConfig, mergeConfig } from 'vitest/config'
import { createVitestConfig } from '../../vitest.config.base'

const root = import.meta.dirname

export default mergeConfig(
  createVitestConfig({
    root,
    environment: 'jsdom',
  }),
  defineConfig({
    plugins: [react({ compiler: true })],
  }),
)
