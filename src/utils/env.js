export function isDev() {
  return (
    process &&
    process.NODE_ENV &&
    process.NODE_ENV.toLowerCase() === 'development'
  )
}