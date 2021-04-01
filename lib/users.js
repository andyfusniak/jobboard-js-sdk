const usersFn = function(methods) {
  const proto = {
    async getUsers() {
      try {
        const users = await methods.get('users');
        return users;
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

export default usersFn;
