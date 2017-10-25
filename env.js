module.exports = {

  development: {
    PORT: 3000,
    MONGODB_HOST: 'ds117109.mlab.com',
    MONGODB_PORT: 17109,
    MONGODB_DATABASE: 'budget',
    MONGODB_CONNECTION_TIMEOUT: 10000,
    MONGODB_REPLICA_SET: false,
    MONGODB_USER: 'denimar',
    MONGODB_PASSWORD: 'dm90460'
  },

  staging: {
    PORT: 3000,
    MONGODB_HOST: 'ds117109.mlab.com',
    MONGODB_PORT: 17109,
    MONGODB_DATABASE: 'budget',
    MONGODB_CONNECTION_TIMEOUT: 10000,
    MONGODB_REPLICA_SET: false
  },

/*
  production: {
    //PORT: 3000,
    MONGODB_HOST: '32-3a.mongo.evennode.com',
    MONGODB_PORT: 27017,
    MONGODB_DATABASE: 'b06782f406525ca8f6285931fb0fb06a',
    MONGODB_CONNECTION_TIMEOUT: 10000,
    MONGODB_REPLICA_SET: true,
    MONGODB_USER: 'b06782f406525ca8f6285931fb0fb06a',
    MONGODB_PASSWORD: 'dm90460'
  }
*/

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
