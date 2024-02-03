import { describe, it, expect } from 'vitest'
import { InputFormatter } from './input-formatter'

describe('InputFormatter Service', () => {
  it('given an empty string: should return an empty array', () => {
    const inputFormatter = new InputFormatter('')

    expect(inputFormatter.format()).toEqual([])
  })

  it('given a string with one line: should return an array with one object', () => {
    const inputFormatter = new InputFormatter('Green, Red, 2021-03-24T07:58:30')

    const formattedInput = inputFormatter.format()

    expect(formattedInput).toHaveLength(1)

    expect(formattedInput[0].from).toBe('Green')
    expect(formattedInput[0].to).toBe('Red')
    expect(formattedInput[0].peak).toBe(false)
  })

  it('given an input with peak time: should return the peak property as true', () => {
    const inputFormatter = new InputFormatter('Red, Green, 2021-03-24T09:58:30')

    const formattedInput = inputFormatter.format()

    expect(formattedInput).toHaveLength(1)

    expect(formattedInput[0].from).toBe('Red')
    expect(formattedInput[0].to).toBe('Green')
    expect(formattedInput[0].peak).toBe(true)
  })

  it('given an invalid input: should throw an error', () => {
    const inputFormatter = new InputFormatter('ABC')

    expect(() => inputFormatter.format()).toThrowError('Invalid input')
  })
})
