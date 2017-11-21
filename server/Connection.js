import mongoose from 'mongoose';
import databasesConfig from '../config/databases.json';

mongoose.Promise = global.Promise;

class Connection {

  constructor() {
    this.connections = [];
  }

  setDatabase(databaseName) {
    this.databaseName = databaseName;
  }

  getConnection() {
    for (let i = 0 ; i < this.connections.length; i++) {
      let conn = this.connections[i];
      if (conn.databaseName === this.databaseName) {
        return conn.connectionObj;
      }
    }

    const databaseConfig = databasesConfig[this.databaseName];

    const options = {
      useMongoClient: true
    };

    const MONGODB_USER_AND_PASSWORD = (databaseConfig.MONGODB_USER && databaseConfig.MONGODB_PASSWORD) ? databaseConfig.MONGODB_USER + ':' + databaseConfig.MONGODB_PASSWORD + '@' : '';

    const MONGODB_URI = `mongodb://${MONGODB_USER_AND_PASSWORD}${databaseConfig.MONGODB_HOST}:${databaseConfig.MONGODB_PORT}/${databaseConfig.MONGODB_DATABASE}`;

    if (databaseConfig.MONGODB_REPLICA_SET) {
      options.replset.rs_name = databaseConfig.MONGODB_REPLICA_SET;
    }

    mongoose.connect(MONGODB_URI, options);

    const connectionObj = mongoose.connection;

    console.log('----------------------------------------------------------');
    console.log(' Trying to connect to MongoDB:');
    console.log('----------------------------------------------------------');
    console.log(' Host : ' + databaseConfig.MONGODB_HOST);
    console.log(' Port : ' + databaseConfig.MONGODB_PORT);
    console.log(' Database : ' + databaseConfig.MONGODB_DATABASE);
    console.log(' Timeout : ' + databaseConfig.MONGODB_CONNECTION_TIMEOUT);
    console.log(' Replacaset : ' + databaseConfig.MONGODB_REPLICA_SET);
    console.log('----------------------------------------------------------');

    connectionObj.on('error', err => {
      console.log('----------------------------------------------------------');
      console.log('Failed to connect to MongoDB:');
      console.log(err);
      console.log('----------------------------------------------------------');
      throw err;
    });

    connectionObj.on('connected', () => {
      console.log('----------------------------------------------------------');
      console.log('MongoDB Connected Successfully!!');
      console.log('----------------------------------------------------------');
    });


    this.connections.push({
      databaseName: this.databaseName,
      connectionObj: connectionObj
    });

    return connectionObj;
  }

}

export default Connection;
