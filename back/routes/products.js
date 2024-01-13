import express from 'express';
import database from '../db/connection.js';

const router = express.Router();

/* GET ALL PRODUCTS */
router.get('/', async (req, res) => {
  const allProduct = await database
    .collection('products')
    .findOne({ stock_number: '12345' });

  // Print the document returned by findOne()
  console.log('all product', allProduct);
  return allProduct;
});

/* GET A PRODUCT */
router.get('/:id', (req, res) => {});

/* ADD A PRODUCT */
router.post('/', async (req, res) => {
  // Create a document to insert
  const doc = {
    stock_number: '12345',
    name: 'Pro Batteries',
    Description: 'Batteries',
    Price: '£1.99',
  };
  // Insert the defined document into the "haiku" collection
  const result = await database.collection('mongodb_fullstack').insertOne(doc);
  // Print the ID of the inserted document
  console.log(`A document was inserted: ${result.insertedId}`);
});

/* UPDATE A PRODUCT */
router.put('/:id', (req, res) => {});

/* DELETE A PRODUCT */
router.delete('/:id', (req, res) => {});

export default router;
