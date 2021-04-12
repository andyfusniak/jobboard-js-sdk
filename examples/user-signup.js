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
      firstname: 'Jack',
      lastname: 'Sparrow Nine',
      role: 'user',
      email: 'jack.sparrow+test9@example.com',
      password: 'testtest12345'
    };
    const user = await jobboard.auth.userSignUp(params);
    console.log(user);
  } catch (err) {
    console.error(err.name);
    console.error(err.status);
    console.error(err.code);
    console.error(err);
  }
})();
