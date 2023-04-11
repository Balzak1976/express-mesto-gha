const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const routes = require('./routes/index');

const app = express();

app.use(express.json());

const { PORT = 3000, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL, {})
  .then(() => {
    console.log('Connect to DB');
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  req.user = {
    _id: '6435395abbde9a409726b391',
  };

  next();
});

app.use(routes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message, name } = err;
  console.log('err: ', name);

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Listen port:${PORT}`);
});
