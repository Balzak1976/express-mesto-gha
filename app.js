const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT = 3000 } = process.env;
const db = 'mongodb://localhost:27017/mestodb';

mongoose
  .connect(db)
  .then(() => { console.log('Connect to DB'); })
  .catch((err) => { console.log(err); });

app.use('/users', require('./routes/user'));

app.listen(PORT, () => {
  console.log(`Listen port:${PORT}`);
});
