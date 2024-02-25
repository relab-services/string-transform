import { Transform } from '../transform'
import { kebabCase } from 'lodash'

export const Kebab: Transform = {
  verify: transform => transform.trim().toLowerCase() === 'kebab',
  transform: (transform, source) => kebabCase(source)
}
