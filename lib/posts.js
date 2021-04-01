const postsFn = function(methods) {
  const proto = {
    async getPosts() {
      try {
        const posts = await methods.get('posts');
        return posts;
      } catch (err) {
        throw err;
      }
    },
    async createPost() {
      const user = await methods.post('posts');
      return user;
    }
  };
  return Object.create(proto);
};

export default postsFn;
