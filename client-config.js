const environment = process.env.CONTEXT;

const dataset = environment === "production"
  ? process.env.SANITY_DATASET_PROD
  : process.env.SANITY_DATASET_DEV;

module.exports = {
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID || 'kf9wwftw',
    dataset: dataset || 'production',
    apiVersion: '2022-03-03'
  }
}
