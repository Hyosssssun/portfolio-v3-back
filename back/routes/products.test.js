import request from 'supertest';
import app, { server } from '../app.js';
import { database, disconnectDB } from '../db/connection.js';

describe('products', () => {
  let productsCollection;

  const initialData = [
    {
      _id: 'test_id_1',
      stock_number: '1',
      name: 'test_name_1',
      Description: 'test_description_1',
      Price: 'test_price_1',
    },
    {
      _id: 'test_id_2',
      stock_number: '2',
      name: 'test_name_2',
      Description: 'test_description_2',
      Price: 'test_price_2',
    },
  ];

  beforeAll(() => {
    productsCollection = database.collection('products');
  });

  beforeEach(async () => {
    await productsCollection.deleteMany({});
    await productsCollection.insertMany(initialData);
  });

  afterAll(async () => {
    await disconnectDB();
    server.close();
  });

  it('GET /products', async () => {
    // fetch get all products
    const allProducts = await request(app).get('/products');

    expect(allProducts.body).toHaveLength(2);
    expect(allProducts.body).toEqual(initialData);
  });

  it('GET /products/:id', async () => {
    const product = await request(app).get('/products/test_id_1');

    expect(product.body).toEqual({
      _id: 'test_id_1',
      stock_number: '1',
      name: 'test_name_1',
      Description: 'test_description_1',
      Price: 'test_price_1',
    });
  });

  it('POST /products', async () => {
    const newProduct = {
      _id: 'test_id_3',
      stock_number: '3',
      name: 'test_name_3',
      Description: 'test_description_3',
      Price: 'test_price_3',
    };

    await request(app).post('/products').send(newProduct);

    const allProducts = await productsCollection.find({}).toArray();
    expect(allProducts).toHaveLength(3);
    expect(allProducts).toEqual([...initialData, newProduct]);

    const insertedProduct = await productsCollection.findOne({
      _id: 'test_id_3',
    });
    expect(insertedProduct).toEqual(newProduct);
  });

  it('PUT /products/:id', async () => {
    const updateBody = {
      _id: 'test_id_2',
      stock_number: '2',
      name: 'updated_test_name_2',
      Description: 'updated_test_description_2',
      Price: 'updated_test_price_2',
    };

    await request(app).put('/products/test_id_2').send(updateBody);
    const allProducts = await productsCollection.find({}).toArray();
    expect(allProducts).toEqual([
      {
        _id: 'test_id_1',
        stock_number: '1',
        name: 'test_name_1',
        Description: 'test_description_1',
        Price: 'test_price_1',
      },
      updateBody,
    ]);
    expect(allProducts).toHaveLength(2);

    const insertedProduct = await productsCollection.findOne({
      _id: 'test_id_2',
    });
    expect(insertedProduct).toEqual(updateBody);
  });

  it('DELETE /products/:id', async () => {
    await request(app).delete('/products/test_id_2');

    const allProducts = await productsCollection.find({}).toArray();
    expect(allProducts).toEqual([
      {
        _id: 'test_id_1',
        stock_number: '1',
        name: 'test_name_1',
        Description: 'test_description_1',
        Price: 'test_price_1',
      },
    ]);
    expect(allProducts).toHaveLength(1);

    const insertedProduct = await productsCollection.findOne({
      _id: 'test_id_2',
    });
    expect(insertedProduct).toBe(null);
  });
});
