const authFn = function(methods) {
  const proto = {
    /**
     * @param {object} params - The user to signup to the service.
     * @param {string} params.role - Role of 'user', 'advertiser' or 'admin.
     * @param {string} params.firstname - The first name of the user.
     * @param {string} params.lastname - The last name of the user.
     * @param {string} params.email - The user's email address.
     * @param {string} params.password - plain text password.
     */
    async userSignUp(params) {
      try {
        const body = {
          role: params.role,
          firstname: params.firstname,
          lastname: params.lastname,
          email: params.email,
          password: params.password
        };
        const user = await methods.post('auth/signup', body, true);
        return user;
      } catch (err) {
        throw err;
      }
    },
    async createUser() {
      const user = await methods.post('users');
      return user;
    }
  };
  return Object.create(proto);
};

export default authFn;
