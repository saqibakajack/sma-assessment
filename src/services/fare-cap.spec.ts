import { describe, it, expect } from 'vitest'
import { FareCap } from './fare-cap'
import moment from 'moment'

describe('FareCap Service', () => {
  it('given an empty array: should return 0', () => {
    const fareCap = new FareCap()

    const fare = fareCap.applyFareCap([])

    expect(fare).toBe(0)
  })

  it('given the trips where daily cap is not reached: should return the total fare', () => {
    const fareCap = new FareCap()

    const fare = fareCap.applyFareCap([
      { from: 'Green', to: 'Green', peak: false, date: new Date(), amount: 2 },
      { from: 'Green', to: 'Green', peak: false, date: new Date(), amount: 2 },
      { from: 'Green', to: 'Green', peak: false, date: new Date(), amount: 2 }
    ])

    expect(fare).toBe(6)
  })

  it('given the trips where daily cap is reached: should return the fare according to daily cap', () => {
    const fareCap = new FareCap()

    const fare = fareCap.applyFareCap([
      { from: 'Green', to: 'Green', peak: false, date: new Date(), amount: 2 },
      { from: 'Green', to: 'Green', peak: false, date: new Date(), amount: 2 },
      { from: 'Green', to: 'Green', peak: false, date: new Date(), amount: 2 },
      { from: 'Green', to: 'Green', peak: false, date: new Date(), amount: 3 }
    ])

    expect(fare).toBe(8)
  })

  it('given the trips where weekly cap is not reached: should return the total fare', () => {
    const fareCap = new FareCap()

    const fare = fareCap.applyFareCap([
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-05T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-06T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-07T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-08T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-09T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-10T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-11T00:00:00').toDate(), amount: 2 }
    ])

    expect(fare).toBe(50)
  })

  it('given the trips where weekly cap is reached: should return the fare according to weekly cap', () => {
    const fareCap = new FareCap()

    const fare = fareCap.applyFareCap([
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-05T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-06T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-07T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-08T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-09T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-10T00:00:00').toDate(), amount: 8 },
      { from: 'Green', to: 'Green', peak: false, date: moment('2024-02-11T00:00:00').toDate(), amount: 8 }
    ])

    expect(fare).toBe(55)
  })
})
