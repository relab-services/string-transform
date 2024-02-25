import { Transform } from '../transform'

const regex = () => /^\s*replace\s*\(\s*\/(?<from>.+?)\/(?<modifier>[a-z]*)\s*,\s*["'`](?<to>.+?)["'`]\)\s*$/gi

export const Regex: Transform = {
  verify: (transform) => regex().test(transform),
  transform: (transform, source)=> {
    const replace = regex().exec(transform)
    if (replace && replace.groups) {
      const { from, modifier, to } = replace.groups
      return source.replace(new RegExp(from, modifier), to)
    }

    return source
  }
}
