const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { PORT = 3000 } = process.env;
const db = 'mongodb://localhost:27017/mestodb';

mongoose
  .connect(db)
  .then((res) => { console.log('Connect to DB'); })
  .catch((err) => { console.log(err); });

app.listen(PORT, () => {
  console.log(`Listen port:${PORT}`);
});
