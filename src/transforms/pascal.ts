import { Transform } from '../transform'
import { camelCase, upperFirst } from 'lodash'

export const Pascal: Transform = {
  verify: transform => transform.trim().toLowerCase() === 'pascal',
  transform: (transform, source) => upperFirst(camelCase(source))
}
