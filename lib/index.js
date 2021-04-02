import { methodsFn } from './raw.js';
import usersFn from './users.js';
import postsFn from './posts.js';
import authFn from './auth.js';

const JobBoard = function({ endpoint, tokenFn, fetch } ) {
  const proto = {
    init(methods) {
      Object.assign(this, {
        users: usersFn(methods),
        posts: postsFn(methods),
        auth: authFn(methods)
      });
      return this;
    },
    version() {
      return '__JOBBOARD_VERSION__';
    }
  };
  return Object.create(proto).init(
    methodsFn(endpoint, tokenFn, fetch)
  );
}

export default JobBoard;
