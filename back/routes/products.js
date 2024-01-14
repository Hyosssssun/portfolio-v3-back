import express from 'express';
import database, { closeConnection } from '../db/connection.js';
import { ObjectId } from 'mongodb';

const router = express.Router();
const productsCollection = database.collection('products');

/* GET ALL PRODUCTS */
router.get('/', async (_, res) => {
  try {
    const products = await productsCollection.find({}).toArray();
    console.log('-----in new get', products);

    res.send(products).status(200);
  } catch (err) {
    console.error(`Something is wrong here`, err.message);
  } finally {
    await closeConnection();
  }
});

/* GET A PRODUCT */
router.get('/:id', async (req, res) => {
  console.log(req.params);
  const query = { _id: new ObjectId(req.params.id) };

  try {
    const product = await productsCollection.findOne(query);
    console.log('-----in new getById', product);

    if (!product) {
      res.send('Not found').status(404);
    } else {
      res.send(product).status(200);
    }
  } catch (err) {
    console.error(`Something is wrong here`, err.message);
  } finally {
    await closeConnection();
  }
});

/* ADD A PRODUCT */
router.post('/', async (req, res) => {
  let newDocument = req.body;

  try {
    let product = await productsCollection.insertOne(newDocument);
    console.log('-----in new post', product);

    res.send(product).status(204);
  } catch (err) {
    console.error(`Something is wrong here`, err.message);
  } finally {
    await closeConnection();
  }
});

/* UPDATE A PRODUCT */
router.put('/:id', async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };
  const updates = {
    $push: req.body,
  };

  try {
    let product = await productsCollection.updateOne(query, updates);
    console.log('-----in new update', product);

    res.send(product).status(200);
  } catch (err) {
    console.error(`Something is wrong here`, err.message);
  } finally {
    await closeConnection();
  }
});

/* DELETE A PRODUCT */
router.delete('/:id', async (req, res) => {
  const query = { _id: ObjectId(req.params.id) };

  try {
    let product = await productsCollection.deleteOne(query);
    console.log('-----in new delete', product);

    res.send(product).status(200);
  } catch (err) {
    console.error(`Something is wrong here`, err.message);
  } finally {
    await closeConnection();
  }
});

export default router;
