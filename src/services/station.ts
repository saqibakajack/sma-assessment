type Fare = Record<'peak' | 'non-peak', number>
type Line = 'Red' | 'Green'

interface Destination {
  station: Station
  fares: Fare
}

export class Station {
  private readonly _name: string
  private readonly _line: Line
  private readonly _destinations: Destination[]

  constructor ({ name, line }: { name: string, line: Line }) {
    this._name = name
    this._line = line
    this._destinations = []
  }

  addDestination (destination: Station, fares: Fare): void {
    this._destinations.push({
      station: destination,
      fares
    })
  }

  get name (): string {
    return this._name
  }

  get line (): Line {
    return this._line
  }

  get destinations (): Destination[] {
    return [...this._destinations]
  }
}
