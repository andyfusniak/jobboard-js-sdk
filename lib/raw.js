let jbfetch;

const methodsFn = function(config) {
  const { endpoint, tokenFn } = config;
  if (typeof fetch === 'function') {
    jbfetch = fetch;
  } else {
    if (!'fetch' in config) {
      throw Error('global fetch function not available');
    }
    jbfetch = config.fetch;
  }

  let debug = false;
  if (('debug' in config) && (config.debug === true)) {
    debug = true;
  }

  const proto = {
    /**
     * @param {string} path - the resource path not including the host.
     * @returns {Promise.<object[]>}
     */
    async get(path, params, useAuth) {
      const urlSearchParams = new URLSearchParams()
      for (const [key, value] of Object.entries(params)) {
        console.log(`${key}: ${value}`);
        urlSearchParams.set(key, value);
      }

      let queryString = urlSearchParams.toString();
      if (debug) {
        console.log(queryString);
      }

      if (queryString !== '') {
        queryString = `?${queryString}`;
      }
      if (debug) {
        console.log(`queryString=${queryString}`);
      }

      const token = tokenFn();
      let headers = {
        'Content-Type': 'application/json'
      };
      if (useAuth) {
        headers['Authorization'] = `bearer ${token}`;
      }
      const response = await jbfetch(`${endpoint}/${path}${queryString}`, {
        method: 'GET',
        headers: headers
      });
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
    async post(path, body, useAuth) {
      const token = tokenFn();
      let headers = {
        'Content-Type': 'application/json'
      };
      if (useAuth) {
        headers['Authorization'] = `bearer ${token}`;
      }
      const response = await jbfetch(`${endpoint}/${path}`, {
        method: 'POST',
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
