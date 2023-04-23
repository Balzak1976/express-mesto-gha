// подгружаем .env в переменную окружения
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

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
