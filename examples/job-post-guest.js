const fetch = require('node-fetch');

const token = process.env.JWT || 'fake-token';

const JobBoard = require('..');
const jbclient = JobBoard({
  endpoint: process.env.JOBBOARD_ENDPOINT || 'https://jobboard-webapi-staging.andyfusniak.com',
  tokenFn: function() { return token; },
  fetch: fetch
});

(async() => {
  try {
    params = {
      // jobId: null,
      uri: 'senior-golang-developer-4',
      companyName: 'Big Software Inc.'
    };
    const job = await jbclient.jobs.createJob(params);
    console.log(job);
  } catch (err) {
    console.error(err);
  }
})();
