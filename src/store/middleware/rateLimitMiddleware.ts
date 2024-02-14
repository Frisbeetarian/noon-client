import { rateLimitDetected } from '../ui'

const rateLimitMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith('rejected')) {
    const error = action.error
    if (error && error.status === 429) {
      store.dispatch(
        rateLimitDetected({
          isRateLimited: true,
          message: error.data.error,
          retryAfter: error.data.retryAfter,
        })
      )
    }
  }
  return next(action)
}

export default rateLimitMiddleware
