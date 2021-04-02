// import fetch from 'node-fetch';

let jbfetch;
if (typeof fetch === 'function') {
  jbfetch = fetch;
}

const methodsFn = function(endpoint, tokenFn, replacementFetch) {
  if (replacementFetch) {
    jbfetch = replacementFetch
  }
  const proto = {
    /**
     * @param {string} path - the resource path not including the host.
     * @returns {Promise.<object[]>}
     */
    async get(path) {
      const response = await jbfetch(`${endpoint}/${path}`);
      const data = await response.json();
      return data;
    },

    /**
     *
     * @param {string} path - the resource path not including the host.
     * @param {object} body - the request body parameters.
     * @params {boolean} [noAuth] - if set to true post omits the Authorization header.
     * @returns
     */
    async post(path, body, noAuth) {
      const token = tokenFn();
      let headers = {
        'Content-Type': 'application/json'
      };
      if (!noAuth) {
        headers['Authorization'] = `bearer ${token}`;
      }
      const response = await jbfetch(`${endpoint}/${path}`, {
        method: 'post',
        mode: 'cors',
        body: JSON.stringify(body),
        headers: headers
      });
      const data = await response.json();
      return data;
    }
  };
  return Object.create(proto);
};

export { methodsFn };
