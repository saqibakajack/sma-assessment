type Fare = Record<'peak' | 'non-peak', number>
type Line = 'Red' | 'Green'

interface Destination {
  station: Station
  fares: Fare
}

/**
 * Station class
 * @class
 * @classdesc Station class
 */
export class Station {
  private readonly _name: string
  private readonly _line: Line
  private readonly _destinations: Destination[]

  /**
   * @constructor
   * @param {string} name - Station name
   * @param {Line} line - Line name
   */
  constructor ({ name, line }: { name: string, line: Line }) {
    this._name = name
    this._line = line
    this._destinations = []
  }

  /**
     * Add destination to the station
     * @param {Station} destination - Destination station
     * @param {Fare} fares - Fare object
     */
  public addDestination (destination: Station, fares: Fare): void {
    this._destinations.push({
      station: destination,
      fares
    })
  }

  /**
   * Get station name
   * @public
   * @returns {string} - Station name
   */
  get name (): string {
    return this._name
  }

  /**
   * Get line name
   * @public
   * @returns {Line} - Line name
   */
  get line (): Line {
    return this._line
  }

  /**
   * Get destinations of a station
   * @public
   * @returns {Destination[]} - Array of destinations
   */
  get destinations (): Destination[] {
    return [...this._destinations]
  }
}
