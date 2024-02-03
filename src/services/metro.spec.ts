import { describe, it, expect } from 'vitest'
import { Metro } from './metro'

describe('Metro Service', () => {
  it('should create metro service', () => {
    const metro = new Metro()

    expect(metro).toBeDefined()
  })

  it('should initiate stations in mtero', () => {
    const metro = new Metro()

    expect(metro.stations).toBeDefined()
    expect(metro.stations.length).toBeGreaterThan(0)
  })

  it('given the trips: should return the total fare', () => {
    const metro = new Metro()
    const trips = [
      { from: 'Green', to: 'Green', peak: true },
      { from: 'Green', to: 'Red', peak: false },
      { from: 'Red', to: 'Red', peak: true }
    ]

    const fare = metro.calculateFare(trips)

    expect(fare).toBe(8)
  })

  it('given an invalid station: should throw an error', () => {
    const metro = new Metro()
    const trips = [
      { from: 'Green', to: 'Green', peak: true },
      { from: 'Green', to: 'Red', peak: false },
      { from: 'Red', to: 'Invalid', peak: true }
    ]

    expect(() => metro.calculateFare(trips)).toThrowError('Invalid station')
  })
})
