// @flow
import { isDev } from './env'

export function warn(message: string = '') {
  if (!isDev() || !message) return

  throw new Error(`Sprout: ${message}`)
}

export default warn