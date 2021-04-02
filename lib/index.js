import { methodsFn } from './raw.js';
import usersFn from './users.js';
import postsFn from './posts.js';
import authFn from './auth.js';
import jobsFn from './jobs.js';

/**
 *
 * @param {object} config - configuration parameters.
 * @param {string} config.endpoint - web API endpoint.
 * @param {function} config.tokenFn - a function that takes no parameters and returns the current JWT as a string.
 * @param {function} [config.fetch] - (optional) replacement fetch. Usually used when using the client library from outside the browser JavaScript host environment.
 * @returns
 */
const JobBoard = function(config) {
  const proto = {
    init(methods) {
      Object.assign(this, {
        users: usersFn(methods),
        posts: postsFn(methods),
        auth: authFn(methods),
        jobs: jobsFn(methods)
      });
      return this;
    },
    version() {
      return '__JOBBOARD_VERSION__';
    }
  };
  return Object.create(proto).init(
    methodsFn(config)
  );
}

export default JobBoard;
