import { Transform } from '../transform'

export const Upper: Transform = {
  verify: (transform) => transform.trim().toLowerCase() === 'upper',
  transform: (transform, source)=> source.toUpperCase()
}
