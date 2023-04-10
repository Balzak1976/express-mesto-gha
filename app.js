const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/index');

const app = express();

app.use(express.json());

const { PORT = 3000 } = process.env;
const db = 'mongodb://0.0.0.0:27017/mestodb';

mongoose
  .connect(db)
  .then(() => { console.log('Connect to DB'); })
  .catch((err) => { console.log(err); });

app.use((req, res, next) => {
  req.user = {
    _id: '64287fc7ade4b04361906e3f',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Listen port:${PORT}`);
});
