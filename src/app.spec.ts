import { describe, it, expect, vi } from 'vitest'
import { App } from './app'
import { readFileSync, existsSync } from 'fs'

vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  existsSync: vi.fn()
}))

describe('App', () => {
  it('should run', async () => {
    const app = new App()

    vi.spyOn(global.console, 'log').mockImplementation(() => {})

    vi.mocked(readFileSync).mockReturnValue('Green,Green,2021-03-24T07:58:30\n' +
        'Green,Red,2021-03-24T09:58:30\n' +
        'Red,Red,2021-03-25T11:58:30')
    vi.mocked(existsSync).mockReturnValue(true)

    await app.run()

    expect(console.log).toHaveBeenCalledWith('Fare:', 7)
  })
})
