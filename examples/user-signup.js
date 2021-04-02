const fetch = require('node-fetch');

const JobBoard = require('..');
const jbclient = JobBoard({
  endpoint: 'https://jobboard-webapi-staging.andyfusniak.com',
  tokenFn: function() { return 'fake-token'; },
  fetch: fetch
});

(async() => {
  try {
    params = {
      firstname: 'Jack',
      lastname: 'Sparrow',
      email: 'jack.sparrow@example.com',
      password: 'testtest12345'
    };
    const user = await jbclient.auth.userSignUp(params);
    console.log(user);
  } catch (err) {
    console.error(err);
  }
})();
