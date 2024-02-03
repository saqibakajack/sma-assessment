import { InputFormatter } from './services/input-formatter'
import { Metro } from './services/metro'

export class App {
  run (): void {
    const input = new InputFormatter(
      'Green, Green, 2021-03-24T07:58:30\n' +
        'Green, Red, 2021-03-24T09:58:30\n' +
        'Red, Red, 2021-03-25T11:58:30'
    ).format()

    const metro = new Metro()

    const fare = metro.calculateFare(input)

    console.log('Fare:', fare)
  }
}
