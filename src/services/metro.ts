import { Station } from './station'
import { FareDetails } from '../data/fare-details'
import { type Trip } from './input-formatter'
import { FareCap } from './fare-cap'

export class Metro {
  private readonly _stations: Station[] = []
  private readonly fareCap: FareCap = new FareCap()

  constructor () {
    this.setupStations()
  }

  get stations (): Station[] {
    return [...this._stations]
  }

  private setupStations (): void {
    for (const station of FareDetails) {
      let stationA = this._stations.find(s => s.name === station.from)

      if (stationA == null) {
        stationA = new Station({ name: station.from, line: station.from })
        this._stations.push(stationA)
      }

      let stationB = this._stations.find(s => s.name === station.to)

      if (stationB == null) {
        stationB = new Station({ name: station.to, line: station.to })
        this._stations.push(stationB)
      }

      stationA.addDestination(stationB, { peak: station.peak, 'non-peak': station.nonPeak })
    }
  }

  calculateFare (trips: Trip[]): number {
    const fares: Array<Trip & { amount: number }> = trips.map(trip => {
      const stationA = this._stations.find(s => s.name === trip.from)
      const stationB = this._stations.find(s => s.name === trip.to)

      if (stationA == null || stationB == null) {
        throw new Error('Invalid station')
      }

      const amount = stationA.destinations
        .find(d => d.station.name === stationB.name)
        ?.fares[trip.peak ? 'peak' : 'non-peak'] ?? 0

      return {
        ...trip,
        amount
      }
    })

    return this.fareCap.applyFareCap(fares)
  }
}
