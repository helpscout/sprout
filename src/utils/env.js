export function isDev(): boolean {
  return (
    process &&
    process.NODE_ENV &&
    process.NODE_ENV.toLowerCase() === 'development'
  )
}