const Auth = function (raw) {
  Auth.raw = raw;
};

/**
 * @param {object} params - The user to signup to the service.
 * @param {string} params.role - Role of 'user', 'advertiser' or 'admin.
 * @param {string} params.firstname - The first name of the user.
 * @param {string} params.lastname - The last name of the user.
 * @param {string} params.email - The user's email address.
 * @param {string} params.password - plain text password.
 */
Auth.prototype.userSignUp = async (params) => {
  try {
    const body = {
      role: params.role,
      firstname: params.firstname,
      lastname: params.lastname,
      email: params.email,
      password: params.password
    };
    return Auth.raw.post('auth/signup', body, true);
  } catch (err) {
    throw err;
  }
};

export default Auth;
