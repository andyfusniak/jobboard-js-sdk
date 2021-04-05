const autoconfFn = function(methods) {
  const proto = {
    /**
     * Get the auto configuration object from the endpoint.
     * @returns Promise.<object>
     */
    async getFirebaseConfig() {
      const autoconf = await methods.get('autoconf', false);

      if (autoconf && autoconf.data && autoconf.data.firebaseConfig) {
        return autoconf.data.firebaseConfig;
      }
      throw Error('failed to find autoconf.data.firebaseConfig from endpoint');
    }
  };
  return Object.create(proto);
};

export default autoconfFn;
