const fetch = require('node-fetch');
const token = process.env.JWT || 'fake-token';
const JobBoard = require('..');

const jbclient = JobBoard({
  endpoint: process.env.JOBBOARD_ENDPOINT || 'http://localhost:8080',
  fetch: fetch,
  tokenFn: function() { return token; },
  debug: true
});

(async() => {
  try {
    const autoconf = await jbclient.autoconf.getFirebaseConfig();
    console.log(autoconf);
  } catch (err) {
    console.error(err);
  }
})();
