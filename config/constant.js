//
// Eventually, you might create separated environments (dev, staging or prod)
// by setting ".env" file which is at the root of this project (rename it, if is the case)
//
export const MONGODB_HOST = process.env.MONGODB_HOST || '127.0.0.1';
export const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'budget';
export const MONGODB_CONNECTION_TIMEOUT = parseInt(process.env.MONGODB_CONNECTION_TIMEOUT || '5000');
export const MONGODB_REPLICA_SET = process.env.MONGODB_REPLICA_SET || false;
const MONGODB_USER_AND_PASSWORD = (process.env.MONGODB_USER && process.env.MONGODB_PASSWORD) ? process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@' : '';
export const MONGODB_URI = `mongodb://${MONGODB_USER_AND_PASSWORD}${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
