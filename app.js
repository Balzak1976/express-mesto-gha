const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/index');

dotenv.config();

const app = express();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://0.0.0.0:27017/mestodb',
} = process.env;

mongoose.connect(MONGO_URL, {});

app.use((req, res, next) => {
  req.user = {
    _id: '6435395abbde9a409726b391',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  // console.log(`Listen port:${PORT}`);
});
