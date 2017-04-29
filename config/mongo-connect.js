import mongoose from 'mongoose'
import {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE,
  MONGODB_CONNECTION_TIMEOUT,
  MONGODB_REPLICA_SET,
  MONGODB_URI
} from './constant'

mongoose.Promise = global.Promise;

const options = {
  server: {
    auto_reconnect: true,
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: MONGODB_CONNECTION_TIMEOUT
    }
  },
  replset: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: MONGODB_CONNECTION_TIMEOUT
    }
  }
};

if (MONGODB_REPLICA_SET) {
  options.replset.rs_name = MONGODB_REPLICA_SET;
}

mongoose.connect(MONGODB_URI, options);

const db = mongoose.connection;

console.log('----------------------------------------------------------');
console.log(' Trying to connect to MongoDB:');
console.log('----------------------------------------------------------');
console.log(' Host : ' + MONGODB_HOST);
console.log(' Port : ' + MONGODB_PORT);
console.log(' Database : ' + MONGODB_DATABASE);
console.log(' Timeout : ' + MONGODB_CONNECTION_TIMEOUT);
console.log(' Replacaset : ' + MONGODB_REPLICA_SET);
console.log('----------------------------------------------------------');

db.on('error', err => {
  console.log('----------------------------------------------------------');
  console.log('Failed to connect to MongoDB:');
  console.log(err);
  console.log('----------------------------------------------------------');
  throw err;
});

db.on('connected', () => {
  console.log('----------------------------------------------------------');
  console.log('MongoDB Connected Successfully!!');
  console.log('----------------------------------------------------------');
});
