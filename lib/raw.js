import APIError from './error';

const Raw = function (endpoint, jbfetch, getTokenFn, debug) {
  Raw.endpoint = endpoint;
  Raw.jbfetch = jbfetch;
  Raw.getTokenFn = getTokenFn;
  Raw.debug = debug;
};

/**
 * @param {string} path - the resource path not including the host.
 * @returns {Promise.<object[]>}
 */
Raw.prototype.get = async (path, params, useAuth) => {
  const urlSearchParams = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    console.log(`${key}: ${value}`);
    urlSearchParams.set(key, value);
  }

  let queryString = urlSearchParams.toString();
  if (Raw.debug) {
    console.log(queryString);
  }

  if (queryString !== '') {
    queryString = `?${queryString}`;
  }
  if (Raw.debug) {
    console.log(`queryString=${queryString}`);
  }

  let headers = {
    'Content-Type': 'application/json'
  };
  if (Raw.debug) {
    console.log(`about to fetch('${Raw.endpoint}/${path}${queryString}')`);
  }
  const response = await Raw.jbfetch(`${Raw.endpoint}/${path}${queryString}`, {
    method: 'GET',
    headers: headers
  });
  return response.json();
};

/**
 *
 * @param {string} path - the resource path not including the host.
 * @param {object} body - the request body parameters.
 * @params {boolean} [noAuth] - if set to true post omits the Authorization header.
 * @returns
 */
Raw.prototype.post = async (path, body, useAuth) => {
  const tokenFn = Raw.getTokenFn();
  if (!tokenFn) {
    throw Error('No IdTokenFn has been registered. Use registerIdToken()');
  }
  const token = await tokenFn();
  let headers = {
    'Content-Type': 'application/json'
  };
  if (useAuth) {
    headers['Authorization'] = `bearer ${token}`;
  }
  const response = await Raw.jbfetch(`${Raw.endpoint}/${path}`, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(body),
    headers: headers
  });
  const data = await response.json();
  if (!response.ok) {
    throw new APIError(data.status, data.code, data.message)
  }
  return data;
};



export default Raw;
