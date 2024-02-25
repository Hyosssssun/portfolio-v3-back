import { MongoMemoryServer } from 'mongodb-memory-server';
import config from '../config.js';
import { MongoClient, ServerApiVersion } from 'mongodb';

const client = new MongoClient(config.uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let mongod;

const connectDB = async () => {
  try {
    let dbUrl = config.uri;
    if (process.env.NODE_ENV === 'test') {
      console.log('TEST ENV!');
      mongod = await MongoMemoryServer.create();
      dbUrl = mongod.getUri();
    }

    await client.connect(dbUrl);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
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
