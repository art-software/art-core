export function errorToSerializable(error: any) {
  if (error === undefined) {
    throw new TypeError('No error was passed');
  }

  // make sure it is an object that is Error-like so we can serialize it properly
  // if it's not an actual error then we won't create an Error so that there is no stack trace
  // because no stack trace is better than a stack trace that is generated here.
  const err = (
    Object.prototype.toString.call(error) === '[object Error]' &&
    typeof error.stack === 'string'
  ) ? error : { name: 'Error', type: 'Error', message: error, stack: '' };

  return {
    type: err.type,
    name: err.name,
    message: err.message,
    stack: err.stack.split('\n    '),
  };
}