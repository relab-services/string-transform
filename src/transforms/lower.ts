import { Transform } from '../transform'

export const Lower: Transform = {
  verify: (transform) => transform.trim().toLowerCase() === 'lower',
  transform: (transform, source)=> source.toLowerCase()
}
