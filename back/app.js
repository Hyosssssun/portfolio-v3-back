import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import __dirname from './dirname.js';
import productsRouter from './routes/products.js';

const app = express();
const port = 8080;

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.use(function (req, res, next) {
  res
    .status(404)
    .json({ message: "We couldn't find what you were looking for 😞" });
});

app.use(function (err, req, res, next) {
  console.error(err.message, err.stack);
  res.status(500).json(err);
});

export const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
