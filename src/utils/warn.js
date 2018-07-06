// @flow
import { isDev } from './env'

export function warn(message: string = '') {
  if (!isDev() || !message) return

  console.warn(`Sprout: ${message}`)
}

export default warn