import { Transform } from '../transform'
import { camelCase } from 'lodash'

export const Camel: Transform = {
  verify: (transform) => transform.trim().toLowerCase() === 'camel',
  transform: (transform, source)=> camelCase(source)
}
