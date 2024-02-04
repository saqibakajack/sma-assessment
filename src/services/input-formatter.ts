import moment from 'moment'
import { PeakTimes } from '../data/peak-times'
import { readFileSync, existsSync } from 'fs'
import { Readable } from 'stream'
import { object, string, ZodError } from 'zod'
import csv from 'csv-parser'

const rowSchema = object({
  from: string(),
  to: string(),
  date: string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Date must be a valid datetime string'
  })
})

export interface Trip {
  from: string
  to: string
  date: Date
  peak: boolean
}

/**
 * InputFormatter class
 * @class
 * @classdesc Class to format input data
 */
export class InputFormatter {
  /**
   * Format the input data
   * @public
   * @returns {Promise<Trip[]>} - Formatted trip data
   */
  async format (filePath: string): Promise<Trip[]> {
    if (!existsSync(filePath)) {
      throw new Error('File not found')
    }

    const data = readFileSync(filePath, { encoding: 'utf8' })
    const stream = Readable.from(data)

    const results: Trip[] = []

    return await new Promise((resolve, reject) => {
      stream
        .pipe(csv({
          headers: ['from', 'to', 'date'],
          skipLines: 0
        }))
        .on('data', (row) => {
          try {
            const { from, to, date } = rowSchema.parse(row)

            results.push({
              from,
              to,
              date: moment(date).toDate(),
              peak: this.isPeakTime(date)
            })
          } catch (error: any) {
            if (error instanceof ZodError) {
              reject(error.errors.map(e => `${e.path.join('')}: ${e.message}`))
            } else {
              reject(error)
            }
          }
        })
        .on('end', () => { resolve(results) })
    })
  }

  /**
   * Check if the date is a peak time
   * @private
   * @param date
   * @returns {boolean} - True if the date is a peak time
   */
  private isPeakTime (date: string): boolean {
    const peakTimes = PeakTimes[moment(date).format('dddd').toLowerCase()]

    return peakTimes.length <= 0
      ? false
      : peakTimes.some(time => {
        const from = moment(date)
          .set({
            hour: +time.from.split(':')[0],
            minute: +time.from.split(':')[1],
            second: +time.from.split(':')[2]
          })

        const to = moment(date)
          .set({
            hour: +time.to.split(':')[0],
            minute: +time.to.split(':')[1],
            second: +time.to.split(':')[2]
          })

        return moment(date).isBetween(from, to)
      })
  }
}
