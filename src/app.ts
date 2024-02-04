import { join } from 'path'
import { InputFormatter } from './services/input-formatter'
import { Metro } from './services/metro'
import { Command } from 'commander'

export const DEFAULT_PATH = join(__dirname, '..', 'data.csv')

interface AppParameters {
  path: string
}

export class App {
  private readonly command = new Command()
  private readonly inputFormatter: InputFormatter = new InputFormatter()

  async run (): Promise<void> {
    const parameters = this.parseCli()

    await this.process(parameters.path)
  }

  async process (path: string): Promise<void> {
    const input = await this.inputFormatter.format(path)

    const metro = new Metro()

    const fare = metro.calculateFare(input)

    console.log('Fare:', fare)
  }

  parseCli (argv: string[] = process.argv): AppParameters {
    this.command
      .requiredOption('-p, --path <path>', 'Path of csv', DEFAULT_PATH)

    this.command.parse(argv)
    const options = this.command.opts()

    return { path: options.path }
  }
}
