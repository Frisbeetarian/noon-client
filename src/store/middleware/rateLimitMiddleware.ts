import { rateLimitDetected } from '../ui'

const rateLimitMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith('rejected')) {
    const error = action.error

    if (error && action.payload.status === 429) {
      console.log('rateLimitMiddleware: ', action)

      store.dispatch(
        rateLimitDetected({
          isRateLimited: true,
          message: action.payload.data.error,
          retryAfter: action.payload.data.retryAfter,
        })
      )
    }
  }
  return next(action)
}

export default rateLimitMiddleware
