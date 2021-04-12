const Jobs = function (raw) {
  Jobs.raw = raw;
};

/**
 * Create a new job post.
 * @param {object} params - The job post listing.
 * @param {string|null} [jobId] - (optional) job identifier if this post is to be associated with a particular advertiser.
 * @param {string} params.uri - The job URI e.g. 'senior-dev-golang'
 * @param {string} params.companyName - name of the company.
 */
Jobs.prototype.createJob = async (params) => {
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
    return Jobs.raw.post('jobs', body, useAuth);
  } catch (err) {
    throw err;
  }
};

/**
 * Get a single job by its job identifier.
 * @param {string} jobId - the job identifier e.g. '1qd6Zo5x6KZ5OfrX6ZX3FhlYwAN'
 */
Jobs.prototype.getJob = async (jobId) => {
  return Jobs.raw.get(`jobs/${jobId}`, false);
};

/**
 * Query jobs
 * @param {object} params - query selector parameters.
 * @param {number} params.limit - positive integer limiting the result set. A value of 0 indicates no limit (all).
 */
Jobs.prototype.queryJobs = async (params) => {
  if (typeof params !== 'object') {
    params = {};
  }
  const query = {
    limit: params.limit || 0
  };
  return Jobs.raw.get('jobs', query, false);
};

export default Jobs;
