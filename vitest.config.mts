import { defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'istanbul',
      thresholds: {
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100
        },
      },
      include: ['src/**/*.ts'],
      exclude: ['src/data/*.ts', 'src/main.ts'],
    }
  }
})
