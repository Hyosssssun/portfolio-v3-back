import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from '../config.js';

const mongod = await MongoMemoryServer.create();
const dbUrl = process.env.NODE_ENV === 'test' ? mongod.getUri() : config.uri;
const client = new MongoClient(dbUrl);

const connectDB = async () => {
  // try {
  //   await client.connect(dbUrl);
  //   if (process.env.NODE_ENV === 'test') {
  //     console.log('[TEST] MongoDB connected');
  //   } else {
  //     console.log('MongoDB connected');
  //   }
  // } catch (err) {
  //   console.error(err);
  //   process.exit(1);
  // }
};

const disconnectDB = async () => {
  try {
    await client.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const database = client.db('mongodb_fullstack');

export { database, connectDB, disconnectDB };
