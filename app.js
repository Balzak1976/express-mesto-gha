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

app.use(routes);

app.listen(PORT, () => {
  // console.log(`Listen port:${PORT}`);
});
