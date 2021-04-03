const jobsFn = function(methods) {
  const proto = {
    /**
     * Create a new job post.
     * @param {object} params - The job post listing.
     * @param {string|null} [jobId] - (optional) job identifier if this post is to be associated with a particular advertiser.
     * @param {string} params.uri - The job URI e.g. 'senior-dev-golang'
     * @param {string} params.companyName - name of the company.
     */
    async createJob(params) {
      try {
        const body = {
          uri: params.uri,
          companyName: params.companyName
        };

        // if the userId is set use an authorization header to ensure the
        // request is authenticated so it can be successfully associated
        // with the user (with an advertiser role).
        let useAuth = false;
        if (('userId' in params) && (params.userId !== null)) {
          body.userId = params.userId
          useAuth = true;
        }
        const job = await methods.post('jobs', body, useAuth);
        return job;
      } catch (err) {
        throw err;
      }
    },
    /**
     * Get a single job by its job identifier.
     * @param {string} jobId - the job identifier e.g. '1qd6Zo5x6KZ5OfrX6ZX3FhlYwAN'
     */
    async getJob(jobId) {
      const job = await methods.get(`jobs/${jobId}`, false);
      return job;
    },
    /**
     * Query jobs
     * @param {object} params - query selector parameters.
     * @param {number} params.limit - positive integer limiting the result set. A value of 0 indicates no limit (all).
     */
    async queryJobs(params) {
      if (typeof params !== 'object') {
        params = {};
      }
      const query = {
        limit: params.limit || 0
      };
      const jobs = await methods.get('jobs', query, false);
      return jobs;
    }
  };
  return Object.create(proto);
};

export default jobsFn;
