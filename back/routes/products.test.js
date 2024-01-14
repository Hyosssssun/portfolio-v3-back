import database, { closeConnection } from '../db/connection.js';
import request from 'supertest';
import app from '../app.js';

describe('products', () => {
  let testDB;

  beforeAll(async () => {
    await database.collection('products_test').deleteMany({});
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
    await database.collection('products_test').insertMany(initialData);
  });

  beforeEach(async () => {
    testDB = database.collection('products_test');
  });

  afterEach(async () => {});

  afterAll(async () => {
    await closeConnection();
  });

  it.only('should get all products', async () => {
    expect(1 + 1).toBe(2);
    const allProducts = await request(app).get('/').expect(200);

    const totalProduct = await testDB.find({}).toArray();
    console.log('TOTAL PRODUCT', totalProduct);
    expect(totalProduct).toHaveLength(2);

    // expect(allProducts.).toHaveLength(2);
    // expect(allProducts).toEqual(
    //   {
    //     _id: 'test-id-1',
    //     stock_number: '1',
    //     name: 'test-name-1',
    //     Description: 'test-description-1',
    //     Price: 'test-price-1',
    //   },
    //   {
    //     _id: 'test-id-2',
    //     stock_number: '2',
    //     name: 'test-name-2',
    //     Description: 'test-description-2',
    //     Price: 'test-price-2',
    //   }
    // );
  });

  it('should get a product with specific id', async () => {
    const product = await request(app).get('/test-id-2').expect(200);
    expect(product).toHaveLength(1);
    expect(product).toEqual({
      _id: 'test-id-2',
      stock_number: '2',
      name: 'test-name-2',
      Description: 'test-description-2',
      Price: 'test-price-2',
    });
  });

  it('should add a new product', async () => {
    const newProduct = {
      _id: 'test-id-3',
      stock_number: '3',
      name: 'test-name-3',
      Description: 'test-description-3',
      Price: 'test-price-3',
    };

    await request(app).post('/').send(newProduct).expect(200);

    const totalProduct = await testDB.find({}).toArray();
    expect(totalProduct).toHaveLength(3);

    const insertedProduct = await testDB.findOne({ _id: 'test-id-3' });
    expect(insertedProduct).toEqual(newProduct);
  });

  it('should update the product with the given id', async () => {
    const updateBody = {
      _id: 'test-id-3',
      stock_number: '3',
      name: 'test-name-3',
      Description: 'test-description-3',
      Price: 'test-price-3',
    };

    await request(app).put('/test-id-3').send(updateBody).expect(200);

    const totalProduct = await testDB.find({}).toArray();
    expect(totalProduct).toHaveLength(3);

    const insertedProduct = await testDB.findOne({ _id: 'test-id-3' });
    expect(insertedProduct).toEqual(updateBody);
  });
});
