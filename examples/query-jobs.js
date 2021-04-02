const fetch = require('node-fetch');
const token = process.env.JWT || 'fake-token';
const JobBoard = require('..');

const jbclient = JobBoard({
  endpoint: 'https://jobboard-webapi-staging.andyfusniak.com',
  tokenFn: function() { return token; },
  fetch: fetch,
  debug: true
});

(async() => {
  try {
    const querySelector = {
      // limit: 3
    };
    const jobs = await jbclient.jobs.queryJobs(querySelector);
    console.log(jobs);
  } catch (err) {
    console.error(err);
  }
})();
