import { Transform } from '../transform'
import { snakeCase } from 'lodash'

export const Snake: Transform = {
  verify: transform => transform.trim().toLowerCase() === 'snake',
  transform: (transform, source) => snakeCase(source)
}
