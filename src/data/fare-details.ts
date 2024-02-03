export const FareDetails: Array<{
  from: 'Green' | 'Red'
  to: 'Green' | 'Red'
  peak: number
  nonPeak: number
}> = [
  {
    from: 'Green',
    to: 'Green',
    peak: 2,
    nonPeak: 1
  },
  {
    from: 'Green',
    to: 'Red',
    peak: 4,
    nonPeak: 3
  },
  {
    from: 'Red',
    to: 'Red',
    peak: 3,
    nonPeak: 2
  },
  {
    from: 'Red',
    to: 'Green',
    peak: 3,
    nonPeak: 2
  }
]
