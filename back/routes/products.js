import express from 'express';
import { ObjectId } from 'mongodb';

import { database } from '../db/connection.js';

const router = express.Router();
export const productsCollection = database.collection('products');
const isDev = process.env.NODE_ENV === 'test';

/* GET ALL PRODUCTS */
router.get('/', async (_, res) => {
  try {
    const products = await productsCollection.find({}).toArray();

    res.send(products).status(200);
  } catch (err) {
    console.error(`Something is wrong here`, err.message);
  }
});

/* GET A PRODUCT */
router.get('/:id', async (req, res) => {
  const queryParam = isDev ? req.params.id : new ObjectId(req.params.id);
  const query = { _id: queryParam };

  try {
    const product = await productsCollection.findOne(query);

    if (!product) {
      res.send('Not found').status(404);
    } else {
      res.send(product).status(200);
    }
  } catch (err) {
    console.error(`Something is wrong here`, err.message);
  }
});

/* ADD A PRODUCT */
router.post('/', async (req, res) => {
  let newDocument = req.body;

  try {
    let product = await productsCollection.insertOne(newDocument);

    res.send(product).status(201);
  } catch (err) {
    console.error(`Something is wrong here`, err.message);
  }
});

/* UPDATE A PRODUCT */
router.put('/:id', async (req, res) => {
  const queryParam = isDev ? req.params.id : new ObjectId(req.params.id);
  const query = { _id: queryParam };
  const updates = {
    $set: req.body,
  };

  try {
    let product = await productsCollection.updateOne(query, updates);

    res.send(product).status(200);
  } catch (err) {
    console.error(`Something is wrong here`, err.message);
  }
});

/* DELETE A PRODUCT */
router.delete('/:id', async (req, res) => {
  const queryParam = isDev ? req.params.id : new ObjectId(req.params.id);
  const query = { _id: queryParam };

  try {
    let product = await productsCollection.deleteOne(query);

    res.send(product).status(204);
  } catch (err) {
    console.error(`Something is wrong here`, err.message);
  }
});

export default router;
