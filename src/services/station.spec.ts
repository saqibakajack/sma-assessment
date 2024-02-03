import { describe, it, expect } from 'vitest'
import { Station } from './station'

describe('Station Service', () => {
  it('should create a station', () => {
    const station = new Station({ name: 'Park Street', line: 'Red' })

    expect(station).toBeDefined()
    expect(station.name).toBe('Park Street')
    expect(station.line).toBe('Red')
  })

  it('given the name and line: should create a station with no destinations', () => {
    const station = new Station({ name: 'Park Street', line: 'Red' })

    expect(station).toBeDefined()
    expect(station.destinations).toEqual([])
  })

  it('given the destinations: should add a destination to a station', () => {
    const parkStreet = new Station({ name: 'Park Street', line: 'Red' })
    const southStation = new Station({ name: 'South Station', line: 'Red' })
    const fare = { peak: 6.25, 'non-peak': 5.75 }

    parkStreet.addDestination(southStation, fare)

    expect(parkStreet.destinations).toEqual([
      {
        station: southStation,
        fares: fare
      }
    ])
  })
})
