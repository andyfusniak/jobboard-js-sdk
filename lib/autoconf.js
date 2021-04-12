const Autoconf = function (raw) {
  Autoconf.raw = raw;
};

/**
 * Get the auto configuration object from the endpoint.
 * @returns Promise.<object>
 */
Autoconf.prototype.getFirebaseConfig = async () => {
  const autoconf = await Autoconf.raw.get('autoconf', false);

  if (autoconf && autoconf.data && autoconf.data.firebaseConfig) {
    return autoconf.data.firebaseConfig;
  }
  throw Error('failed to find autoconf.data.firebaseConfig from endpoint');
};

export default Autoconf;
