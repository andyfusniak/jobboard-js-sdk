import { methodsFn } from './raw.js';
import autoconfFn from './autoconf.js';
import authFn from './auth.js';
import jobsFn from './jobs.js';
import usersFn from './users.js';

/**
 *
 * @param {object} config - configuration parameters.
 * @param {string} config.endpoint - web API endpoint.
 * @param {function} [config.fetch] - (optional) replacement fetch. Usually used when using the client library from outside the browser JavaScript host environment.
 * @param {boolean} [config.debug] - enable debug console log output.
 * @returns
 */
const JobBoard = function(config) {
  config.tokenFn = async function() {
    return '';
  };
  const proto = {
    init(methods) {
      Object.assign(this, {
        registerIdToken: function(fn) {
          config.tokenFn = fn;
        },
        unregisterIdToken: function() {
          config.tokenFn = async function() {
            return '';
          };
        },
        users: usersFn(methods),
        auth: authFn(methods),
        jobs: jobsFn(methods),
        autoconf: autoconfFn(methods)
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
