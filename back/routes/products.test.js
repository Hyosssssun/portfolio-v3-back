import request from 'supertest';
import app, { server } from '../app.js';
import { database, connectDB, disconnectDB } from '../db/connection.js';

describe('products', () => {
  let productsCollection;
  beforeAll(async () => {
    connectDB();
    // productsCollection = database.collection('products');
    const initialData = [
      {
        _id: 'test-id-1',
        stock_number: '1',
        name: 'test-name-1',
        Description: 'test-description-1',
        Price: 'test-price-1',
      },
      {
        _id: 'test-id-2',
        stock_number: '2',
        name: 'test-name-2',
        Description: 'test-description-2',
        Price: 'test-price-2',
      },
    ];
    // await productsCollection.insertMany(initialData);
  });

  afterAll(async () => {
    disconnectDB();
    server.close();
  });

  it.only('GET /products', async () => {
    // fetch get all products
    const total = await request(app).get('/products').expect(200);
    // console.log(await productsCollection.find({}).toArray());
    console.log('*** total', total);

    // describe('GET /api/products/:id', () => {
    //   it('should return a product', async () => {
    //     const res = await request(app).get(
    //       '/api/products/6331abc9e9ececcc2d449e44'
    //     );
    //     expect(res.statusCode).toBe(200);
    //     expect(res.body.name).toBe('Product 1');
    //   });
    // });

    // const totalProduct = await testDB.find({}).toArray();

    // expect(totalProduct).toHaveLength(2);
    // expect(totalProduct).toEqual(
    //   expect.arrayContaining([
    //     {
    //       _id: 'test-id-1',
    //       stock_number: '1',
    //       name: 'test-name-1',
    //       Description: 'test-description-1',
    //       Price: 'test-price-1',
    //     },
    //     {
    //       _id: 'test-id-2',
    //       stock_number: '2',
    //       name: 'test-name-2',
    //       Description: 'test-description-2',
    //       Price: 'test-price-2',
    //     },
    //   ])
    // );
  });

  // it('should get a product with specific id', async () => {
  //   console.log(await testDB.find({}).toArray());

  //   await request(app).get('/test-id-2').expect(200);

  //   const productWithId = await testDB.findOne({ id: 'test-id-2' });
  //   expect(productWithId).toHaveLength(1);
  //   expect(productWithId).toEqual({
  //     _id: 'test-id-2',
  //     stock_number: '2',
  //     name: 'test-name-2',
  //     Description: 'test-description-2',
  //     Price: 'test-price-2',
  //   });
  // });

  // it('should add a new product', async () => {
  //   const newProduct = {
  //     _id: 'test-id-3',
  //     stock_number: '3',
  //     name: 'test-name-3',
  //     Description: 'test-description-3',
  //     Price: 'test-price-3',
  //   };

  //   await request(app).post('/').send(newProduct).expect(200);

  //   const totalProduct = await testDB.find({}).toArray();
  //   expect(totalProduct).toHaveLength(3);

  //   const insertedProduct = await testDB.findOne({ _id: 'test-id-3' });
  //   expect(insertedProduct).toEqual(newProduct);
  // });

  // it('should update the product with the given id', async () => {
  //   const updateBody = {
  //     _id: 'test-id-3',
  //     stock_number: '3',
  //     name: 'test-name-3',
  //     Description: 'test-description-3',
  //     Price: 'test-price-3',
  //   };

  //   await request(app).put('/test-id-3').send(updateBody).expect(200);

  //   const totalProduct = await testDB.find({}).toArray();
  //   expect(totalProduct).toHaveLength(3);

  //   const insertedProduct = await testDB.findOne({ _id: 'test-id-3' });
  //   expect(insertedProduct).toEqual(updateBody);
  // });
});
