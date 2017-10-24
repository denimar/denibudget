module.exports = {

  development: {
    PORT: 3000,
    MONGODB_HOST: '127.0.0.1',
    MONGODB_PORT: 27017,
    MONGODB_DATABASE: 'budget',
    MONGODB_CONNECTION_TIMEOUT: 10000,
    MONGODB_REPLICA_SET: false
  },

  staging: {
    PORT: 3000,
    MONGODB_HOST: 'ds117109.mlab.com',
    MONGODB_PORT: 17109,
    MONGODB_DATABASE: 'budget',
    MONGODB_CONNECTION_TIMEOUT: 10000,
    MONGODB_REPLICA_SET: false
  },

  production: {
    //PORT: 3000,
    MONGODB_HOST: 'ds117109.mlab.com',
    MONGODB_PORT: 17109,
    MONGODB_DATABASE: 'budget',
    MONGODB_CONNECTION_TIMEOUT: 10000,
    MONGODB_REPLICA_SET: false,
    MONGODB_USER: 'denimar',
    MONGODB_PASSWORD: 'dm90460'
  }

}
