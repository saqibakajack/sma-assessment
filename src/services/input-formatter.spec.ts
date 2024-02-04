import { describe, it, expect, vi } from 'vitest'
import { InputFormatter } from './input-formatter'
import { readFileSync, existsSync } from 'fs'

vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  existsSync: vi.fn()
}))

describe('InputFormatter Service', () => {
  it('given an empty string: should return an empty array', async () => {
    const inputFormatter = new InputFormatter()

    vi.mocked(readFileSync).mockReturnValue('')
    vi.mocked(existsSync).mockReturnValue(true)

    const formattedInput = await inputFormatter.format('file.csv')

    expect(formattedInput).toEqual([])
  })

  it('given a string with one line: should return an array with one object', async () => {
    const inputFormatter = new InputFormatter()

    vi.mocked(readFileSync).mockReturnValue('Green,Red,2021-03-24T07:58:30')
    vi.mocked(existsSync).mockReturnValue(true)

    const formattedInput = await inputFormatter.format('file.csv')

    expect(formattedInput).toHaveLength(1)

    expect(formattedInput[0].from).toBe('Green')
    expect(formattedInput[0].to).toBe('Red')
    expect(formattedInput[0].peak).toBe(false)
  })

  it('given an input with peak time: should return the peak property as true', async () => {
    const inputFormatter = new InputFormatter()

    vi.mocked(readFileSync).mockReturnValue('Red,Green,2021-03-24T09:58:30')
    vi.mocked(existsSync).mockReturnValue(true)

    const formattedInput = await inputFormatter.format('file.csv')

    expect(formattedInput).toHaveLength(1)

    expect(formattedInput[0].from).toBe('Red')
    expect(formattedInput[0].to).toBe('Green')
    expect(formattedInput[0].peak).toBe(true)
  })

  it('given a file that does not exist: should throw an error', async () => {
    const inputFormatter = new InputFormatter()

    vi.mocked(existsSync).mockReturnValue(false)

    await expect(async () => await inputFormatter.format('file.csv'))
      .rejects.toEqual(new Error('File not found'))
  })

  it('given an invalid input: should throw an error', async () => {
    const inputFormatter = new InputFormatter()

    vi.mocked(readFileSync).mockReturnValue('Red,Green,ABC')
    vi.mocked(existsSync).mockReturnValue(true)

    await expect(async () => await inputFormatter.format('file.csv'))
      .rejects.toEqual([
        'date: Date must be a valid datetime string'
      ])
  })
})
