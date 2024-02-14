const rateLimitMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith('rejected')) {
    const error = action.error
    if (error && error.status === 429) {
      // Dispatch an action to update state with rate limit info
      // Assuming you have an action creator for updating rate limit state
      store.dispatch(
        rateLimitDetected({
          message: error.data.error,
          retryAfter: error.data.retryAfter,
        })
      )
    }
  }
  return next(action)
}

export default rateLimitMiddleware
