export function formatMinutes(minutes: number) {
  return minutes < 10 ? `0${minutes}` : `${minutes}`
}

export function formatSeconds(seconds: number) {
  return seconds < 10 ? `0${seconds}` : `${seconds}`
}

// implement e2e encryption using signal's algorithm
