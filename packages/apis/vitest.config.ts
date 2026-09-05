import { createVitestConfig } from '../../vitest.config.base'

const root = import.meta.dirname

export default createVitestConfig({
  root,
  environment: 'node',
})
