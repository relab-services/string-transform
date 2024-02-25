import * as core from '@actions/core'
import * as main from '../src/main'

const runMock = jest.spyOn(main, 'run')

let errorMock: jest.SpiedFunction<typeof core.error>
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
  })

  // eslint-disable-next-line jest/expect-expect
  it('lower', async () => {
    await validate('TestProject', 'lower', 'testproject')
  })

  // eslint-disable-next-line jest/expect-expect
  it('upper', async () => {
    await validate('TestProject', 'upper', 'TESTPROJECT')
  })

  // eslint-disable-next-line jest/expect-expect
  it('camel', async () => {
    await validate('TestProject', 'camel', 'testProject')
  })

  // eslint-disable-next-line jest/expect-expect
  it('pascal', async () => {
    await validate('testProject', 'pascal', 'TestProject')
  })

  // eslint-disable-next-line jest/expect-expect
  it('snake', async () => {
    await validate('TestProject', 'snake', 'test_project')
  })

  // eslint-disable-next-line jest/expect-expect
  it('kebab', async () => {
    await validate('TestProject', 'kebab', 'test-project')
  })

  // eslint-disable-next-line jest/expect-expect
  it('combine', async () => {
    const transform = `
kebab
upper
replace('ST', 'XT')
`
    await validate('TestProject', transform, 'TEXT-PROJECT')
  })

  // eslint-disable-next-line jest/expect-expect
  it('replace string', async () => {
    await validate('TestProject', 'replace("Test", "X")', 'XProject')
  })

  // eslint-disable-next-line jest/expect-expect
  it('replace regex', async () => {
    await validate('TestProject', 'replace(/[esc]/gi, "_")', 'T__tProj__t')
  })

  const validate = async (
    source: string,
    transform: string,
    result: string
  ): Promise<void> => {
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

    expect(setOutputMock).toHaveBeenNthCalledWith(1, 'var', result)
    expect(errorMock).not.toHaveBeenCalled()
  }
})
