import { Transform } from '../transform'

const regex = () => /^\s*replace\s*\(\s*["'`](?<from>.+?)["'`]\s*,\s*["'`](?<to>.+?)["'`]\)\s*/gi

export const Replace: Transform = {
  verify: (transform) => regex().test(transform),
  transform: (transform, source)=> {
    const replace = regex().exec(transform)
    if (replace && replace.groups) {
      const { from, to } = replace.groups
      return source.replace(from, to)
    }

    return source
  }
}
