import usersFn from './users.js';
import postsFn from './posts.js';
import { methodsFn } from './raw.js';

const JobBoard = function({ endpoint, tokenFn } ) {
  const proto = {
    init(methods) {
      this.users = usersFn(methods);
      this.posts = postsFn(methods);
      return this;
    },
    version() {
      return '__JOBBOARD_VERSION__';
    }
  };
  return Object.create(proto).init(
    methodsFn(endpoint, tokenFn)
  );
}

export default JobBoard;
