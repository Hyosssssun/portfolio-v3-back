import config from '../config.js';
import { MongoClient, ServerApiVersion } from 'mongodb';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(config.uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db('admin').command({ ping: 1 });
  console.log('Pinged your deployment. You successfully connected to MongoDB!');
} catch (error) {
  console.log(`Error during connection: ${error}`);
}
// TODO: Close client

const database = client.db('mongodb_fullstack');
export default database;

const connectionHealthCheck = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (error) {
    console.log(new Error(`Error during health check: ${error}`));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};

/* First try */

// const openConnectionToProducts = async () => {
//   try {
//     await client.connect();
//     await client.db('admin').command({ ping: 1 });
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     );

//     const database = client.db('mongodb_fullstack');
//     const productsCollection = database.collection('products');
//     console.log(productsCollection);
//     return productsCollection;
//   } catch (error) {
//     console.log(`Error during connection: ${error}`);
//   }
// };
// const connectDB = openConnectionToProducts().catch(console.dir);
// export default connectDB;

/* Second try */

// import { MongoClient } from "mongodb";
//     const connectionString = process.env.ATLAS_URI || "";
//     const client = new MongoClient(connectionString);
//     let conn;
//     try {
//       conn = await client.connect();
//     } catch(e) {
//       console.error(e);
//     }
//     let db = conn.db("sample_training");
//     export default db;
