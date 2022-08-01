// SNA
const logger = (param) => (store) => (next) => (action) => {
  console.log('logging', param)
  // console.log(next);
  // console.log(action);
  return next(action)
}

export default logger
