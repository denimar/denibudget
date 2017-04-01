const ENVIRONMENT = {

  development: {
    PORT: 3000,
    MONGODB_HOST: '127.0.0.1',
    MONGODB_PORT: 27017,
    MONGODB_DATABASE: 'budget',
    MONGODB_CONNECTION_TIMEOUT: 5000,
    MONGODB_REPLICA_SET: false
  },

  staging: {
    PORT: 3000,
    MONGODB_HOST: 'denimar:dm90460@ds117109.mlab.com',
    MONGODB_PORT: 17109,
    MONGODB_DATABASE: 'budget',
    MONGODB_CONNECTION_TIMEOUT: 5000,
    MONGODB_REPLICA_SET: false
  },

  production: {
    PORT: 3000,
    MONGODB_HOST: 'denimar:dm90460@ds117109.mlab.com',
    MONGODB_PORT: 17109,
    MONGODB_DATABASE: 'budget',
    MONGODB_CONNECTION_TIMEOUT: 5000,
    MONGODB_REPLICA_SET: false
  }

}

export default ENVIRONMENT;
