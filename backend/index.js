const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const collection = require('./src/routes/collection/collection');
const detailsPage = require('./src/routes/detailsPage/detailsPage');

app.use(express.json());
app.use(cors());

app.use(collection);
app.use(detailsPage);

const server = app.listen(port, () => {
  console.log('Server Running on port: ', port);
});

module.exports = server;
