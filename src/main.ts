import * as core from '@actions/core'
import * as os from 'os'
import * as transformers from './transforms'


export async function run(): Promise<void> {
  try {
    const source: string = core.getInput('source')
    const transforms: string = core.getInput('transform')

    let result = source

    for (const currentTransform of transforms.split(os.EOL)) {
      for (const { verify, transform } of Object.values(transformers)) {
        if (verify(currentTransform)) {
          core.debug(`Transforming "${result}" to ${transform}...`)
          result = transform(currentTransform, result)
        }
      }
    }

    core.debug(`Result is "${result}"`)
    core.setOutput('var', result)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
