function APIError(status, code, message) {
  Object.defineProperty(this, 'name', {
      enumerable: false,
      writable: false,
      value: 'APIError'
  });

  Object.defineProperty(this, 'status', {
    enumerable: false,
    writable: true,
    value: status
  });

  Object.defineProperty(this, 'code', {
    enumerable: false,
    writable: true,
    value: code
  });

  Object.defineProperty(this, 'message', {
      enumerable: false,
      writable: true,
      value: message
  });

  if (Error.hasOwnProperty('captureStackTrace')) { // V8
      Error.captureStackTrace(this, APIError);
  } else {
      Object.defineProperty(this, 'stack', {
          enumerable: false,
          writable: false,
          value: (new Error(message)).stack
      });
  }
}

if (typeof Object.setPrototypeOf === 'function') {
  Object.setPrototypeOf(APIError.prototype, Error.prototype);
} else {
  APIError.prototype = Object.create(Error.prototype, {
      constructor: { value: APIError }
  });
}

export default APIError;
