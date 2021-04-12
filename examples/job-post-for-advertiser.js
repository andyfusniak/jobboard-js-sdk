const fetch = require('node-fetch');
const token = process.env.JWT || 'fake-token';
const jobboard = require('..');

jobboard.init({
  endpoint: process.env.JOBBOARD_ENDPOINT || 'http://localhost:8080',
  fetch: fetch,
  debug: true
});

(async() => {
  try {
    jobboard.registerIdToken(function () {
      return token;
    });

    params = {
      userId: '1qfZQdU1qL67DVNW0kjTUa4wGd7',
      uri: 'senior-golang-developer-7',
      companyName: 'Nam Software Inc.'
    };
    const job = await jobboard.jobs.createJob(params);
    console.log(job);
  } catch (err) {
    console.error(err.name);
    console.error(err.status);
    console.error(err.code);
    console.error(err);
  }
})();
