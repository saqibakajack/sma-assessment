import { describe, it, expect, vi } from 'vitest'
import { App } from './app'

describe('App', () => {
  it('should run', () => {
    const app = new App()

    vi.spyOn(global.console, 'log').mockImplementation(() => {})

    app.run()

    expect(console.log).toHaveBeenCalledWith('Fare:', 7)
  })
})
