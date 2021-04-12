const fetch = require('node-fetch');
const jobboard = require('..');

jobboard.init({
  endpoint: process.env.JOBBOARD_ENDPOINT || 'http://localhost:8080',
  fetch: fetch,
  debug: true
});

(async() => {
  try {
    const autoconf = await jobboard.autoconf.getFirebaseConfig();
    console.log(autoconf);
  } catch (err) {
    console.error(err.name);
    console.error(err.status);
    console.error(err.code);
    console.error(err);
  }
})();
