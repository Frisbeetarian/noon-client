import { rateLimitDetected, resetRateLimit } from '../ui'

const rateLimitMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith('rejected')) {
    const error = action.error

    if (error && action.payload.status === 429) {
      store.dispatch(
        rateLimitDetected({
          isRateLimited: true,
          message: action.payload.data.error,
          retryAfter: action.payload.data.retryAfter,
          refresh: new Date().getTime(),
        })
      )
    } else {
      store.dispatch(resetRateLimit())
    }
  }
  return next(action)
}

export default rateLimitMiddleware
