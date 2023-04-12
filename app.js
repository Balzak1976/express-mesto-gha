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
    _id: '6435395abbde9a409726b392',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Listen port:${PORT}`);
});
