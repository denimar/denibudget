import mongoose from 'mongoose';
import databasesConfig from '../config/databases.json';

mongoose.Promise = global.Promise;

class Connection {

  constructor() {
    this.currentConnection = null;
  }

  connect(databaseName) {
    const databaseConfig = databasesConfig[databaseName];

    if (this.currentConnection) {
      this.currentConnection.close();
    }

    const options = {
      useMongoClient: true
    };

    const MONGODB_USER_AND_PASSWORD = (databaseConfig.MONGODB_USER && databaseConfig.MONGODB_PASSWORD) ? databaseConfig.MONGODB_USER + ':' + databaseConfig.MONGODB_PASSWORD + '@' : '';

    const MONGODB_URI = `mongodb://${MONGODB_USER_AND_PASSWORD}${databaseConfig.MONGODB_HOST}:${databaseConfig.MONGODB_PORT}/${databaseConfig.MONGODB_DATABASE}`;

    if (databaseConfig.MONGODB_REPLICA_SET) {
      options.replset.rs_name = databaseConfig.MONGODB_REPLICA_SET;
    }

    console.log('----------------------------------------------------------');
    console.log(' Trying to connect to MongoDB:');
    console.log('----------------------------------------------------------');
    console.log(' Host : ' + databaseConfig.MONGODB_HOST);
    console.log(' Port : ' + databaseConfig.MONGODB_PORT);
    console.log(' Database : ' + databaseConfig.MONGODB_DATABASE);
    console.log(' Timeout : ' + databaseConfig.MONGODB_CONNECTION_TIMEOUT);
    console.log(' Replacaset : ' + databaseConfig.MONGODB_REPLICA_SET);
    console.log('----------------------------------------------------------');

    let createConnectionPromise = mongoose.connect(MONGODB_URI, options);

    createConnectionPromise.then(
      (newConnection) => {
        this.currentConnection = newConnection;
        console.log('----------------------------------------------------------');
        console.log('MongoDB Connected Successfully!!');
        console.log('----------------------------------------------------------');
      },
      err => {
        console.log('----------------------------------------------------------');
        console.log('Failed to connect to MongoDB:');
        console.log(err.message);
        console.log('----------------------------------------------------------');
        //throw err;
      }
    );

  }

}

export default Connection;
