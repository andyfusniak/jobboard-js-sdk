import Raw from './raw.js';
import Autoconf from './autoconf.js';
import Auth from './auth.js';
import Jobs from './jobs.js';
import Users from './users.js';

const JobBoard = function() {};

/**
 *
 * @param {object} config - configuration parameters.
 * @param {string} config.endpoint - web API endpoint.
 * @param {function} [config.fetch] - (optional) replacement fetch. Usually used when using the client library from outside the browser JavaScript host environment.
 * @param {boolean} [config.debug] - enable debug console log output.
 * @returns
 */
JobBoard.prototype.init = (config) => {
  const { endpoint, fetch, debug } = config;

  JobBoard.endpoint = endpoint;

  // fetch
  if (typeof fetch === 'function') {
    Raw.jbfetch = fetch;
  } else {
    if (!jbfetch) {
      throw Error('global fetch function not available');
    }
    Raw.jbfetch = jbfetch;
  }
  JobBoard.debug = debug;

  const raw = new Raw(endpoint, fetch, getTokenFn, debug);
  JobBoard.prototype.auth = new Auth(raw);
  JobBoard.prototype.autoconf = new Autoconf(raw);
  JobBoard.prototype.jobs = new Jobs(raw);
  JobBoard.prototype.users = new Users(raw);
};

function getTokenFn() {
  return JobBoard.tokenFn;
}

JobBoard.prototype.registerIdToken = (fn) => {
  JobBoard.tokenFn = fn;
};

JobBoard.prototype.unregisterIdToken = () => {
  JobBoard.tokenFn = async function () {
    return '';
  };
};

JobBoard.prototype.version = () => {
  return '__JOBBOARD_VERSION__';
};

const jobboard = new JobBoard();

export default jobboard;
