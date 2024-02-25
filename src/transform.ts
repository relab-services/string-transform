export type Transform = {
  verify: (transform: string) => boolean
  transform: (transform: string, source: string) => string
}
