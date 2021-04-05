const fetch = require('node-fetch');

const token = process.env.JWT || 'fake-token';

const JobBoard = require('..');
const jbclient = JobBoard({
  endpoint: process.env.JOBBOARD_ENDPOINT || 'http://localhost:8080',
  tokenFn: function() { return token; },
  fetch: fetch
});

(async() => {
  try {
    params = {
      userId: '1qfZQdU1qL67DVNW0kjTUa4wGd7',
      uri: 'senior-golang-developer-7',
      companyName: 'Nam Software Inc.'
    };
    const job = await jbclient.jobs.createJob(params);
    console.log(job);
  } catch (err) {
    console.error(err);
  }
})();
