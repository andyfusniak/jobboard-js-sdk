// import fetch from 'node-fetch';

const methodsFn = function(endpoint, tokenFn) {
  const proto = {
    /**
     * @type {Object} User
     * @property {id}   number unique identifier
     * @property {name} string username
     * @param {string} url
     * @return {Promise.<User[]>} 
     */
    async get(path) {
      const response = await fetch(`${endpoint}/${path}`);
      const data = await response.json();
      return data;
    },
    async post(path) {
      const token = tokenFn();
      const response = await fetch(`${endpoint}/${path}`, {
        headers: {
          'Authorization':  `bearer ${token}`,
        }
      });
      const data = await response.json();
      return data;
    }
  };
  return Object.create(proto);
};

export { methodsFn };
