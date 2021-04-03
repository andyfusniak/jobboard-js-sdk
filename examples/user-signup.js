const fetch = require('node-fetch');

const JobBoard = require('..');
const jbclient = JobBoard({
  endpoint: process.env.JOBBOARD_ENDPOINT || 'https://jobboard-webapi-staging.andyfusniak.com',
  tokenFn: function() { return 'fake-token'; },
  fetch: fetch
});

(async() => {
  try {
    params = {
      firstname: 'Jack',
      lastname: 'Sparrow',
      role: 'user',
      email: 'jack.sparrow+test8@example.com',
      password: 'testtest12345'
    };
    const user = await jbclient.auth.userSignUp(params);
    console.log(user);
  } catch (err) {
    console.error(err);
  }
})();
