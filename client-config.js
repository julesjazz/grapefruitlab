const environment = process.env.CONTEXT;

// const dataset = environment === 'production'
//   ? process.env.SANITY_DATASET_PROD
//   : process.env.SANITY_DATASET_DEV;

const dataset = 'production';

module.exports = {
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID || '7jk93b9e',
    dataset: dataset || 'production',
    apiVersion: '2022-03-03'
  }
}
