import moment from 'moment'
import { PeakTimes } from '../data/peak-times'

interface Input {
  from: string
  to: string
  peak: boolean
}

export class InputFormatter {
  private readonly _input: string

  constructor (input: string) {
    this._input = input
  }

  format (): Input[] {
    if (this._input === '') return []

    return this._input.split('\n').map(input => {
      const [from, to, date] = input.split(', ')

      if (from == null || to == null || date == null) {
        throw new Error('Invalid input')
      }

      return {
        from,
        to,
        peak: this.isPeakTime(date)
      }
    })
  }

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
