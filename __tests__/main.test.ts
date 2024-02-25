import * as core from '@actions/core'
import * as main from '../src/main'

const runMock = jest.spyOn(main, 'run')

let debugMock: jest.SpiedFunction<typeof core.debug>
let errorMock: jest.SpiedFunction<typeof core.error>
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
  })

  it('lower', async () => {
    await validate('TestProject', 'lower', 'testproject')
  })

  it('upper', async () => {
    await validate('TestProject', 'upper', 'TESTPROJECT')
  })

  it('camel', async () => {
    await validate('TestProject', 'camel', 'testProject')
  })

  it('pascal', async () => {
    await validate('testProject', 'pascal', 'TestProject')
  })

  it('snake', async () => {
    await validate('TestProject', 'snake', 'test_project')
  })

  it('kebab', async () => {
    await validate('TestProject', 'kebab', 'test-project')
  })

  it('combine', async () => {
    const transform = `
kebab
upper
replace('ST', 'XT')
`
    await validate('TestProject', transform, 'TEXT-PROJECT')
  })

  it('replace string', async () => {
    await validate('TestProject', 'replace("Test", "X")', 'XProject')
  })

  it('replace regex', async () => {
    await validate('TestProject', 'replace(/[esc]/gi, "_")', 'T__tProj__t')
  })

  const validate = async (source: string, transform: string, result: string) => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'source':
          return source
        case 'transform':
          return transform
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    expect(setOutputMock).toHaveBeenNthCalledWith(
      1,
      'var',
      result
    )
    expect(errorMock).not.toHaveBeenCalled()
  }
})
