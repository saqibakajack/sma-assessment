import moment from 'moment'
import { FareCapDetails } from '../data/fare-cap-details'
import { type Trip } from './input-formatter'

interface TripWithAmount extends Trip {
  amount: number
}

/**
 * FareCap class
 * @class
 * @classdesc Class to calculate fare with fare caps applied
 */
export class FareCap {
  /**
   * Calculate the total fare with fare caps applied
   * @public
   * @param trips
   * @returns {number} - Total fare
   */
  public applyFareCap (trips: TripWithAmount[]): number {
    // Group trips by line and date
    const groupedTrips = this.groupTripsByLineAndWeek(trips)

    // Calculate fare with caps
    let totalFare = 0
    for (const [lineAndWeek, tripsOfLineAndWeek] of Object.entries(groupedTrips)) {
      const [line] = lineAndWeek.split('|')
      const weeklyCap = this.getCap(line, 'weekly')
      let weeklyTotal = 0

      for (const tripsOfDay of Object.values(tripsOfLineAndWeek)) {
        const dailyTotal = tripsOfDay.reduce((acc, trip) => acc + trip.amount, 0)
        const dailyCap = this.getCap(line, 'daily')
        weeklyTotal += Math.min(dailyTotal, dailyCap)
      }

      totalFare += Math.min(weeklyTotal, weeklyCap)
    }

    return totalFare
  }

  /**
   * Group trips by line and week
   * @private
   * @param trips
   * @returns {Record<string, Record<string, TripWithAmount[]>>} - Grouped trips
   */
  private groupTripsByLineAndWeek (trips: TripWithAmount[]): Record<string, Record<string, TripWithAmount[]>> {
    const groups: Record<string, Record<string, TripWithAmount[]>> = {}

    for (const trip of trips) {
      const weekOfYear = moment(trip.date).isoWeek()
      const dayOfYear = moment(trip.date).dayOfYear()
      const lineKey = `${trip.from}-${trip.to}`
      const lineAndWeekKey = `${lineKey}|${weekOfYear}`

      if (groups[lineAndWeekKey] == null) {
        groups[lineAndWeekKey] = {}
      }

      if (groups[lineAndWeekKey][dayOfYear] == null) {
        groups[lineAndWeekKey][dayOfYear] = []
      }

      groups[lineAndWeekKey][dayOfYear].push(trip)
    }

    return groups
  }

  /**
   * Get cap amount from the data
   * @private
   * @param line
   * @param capType
   * @returns {number} - Cap amount
   */
  private getCap (line: string, capType: 'daily' | 'weekly'): number {
    const fromTo = line.split('-')
    const capDetail = FareCapDetails.find(
      (detail) => detail.from === fromTo[0] && detail.to === fromTo[1]
    )
    return capDetail != null ? capDetail[capType] : 0
  }
}
