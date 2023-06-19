const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT;
const collection = require('./src/routes/collection/collection');
const detailsPage = require('./src/routes/detailsPage/detailsPage');
const list721 = require('./src/routes/list721/list721');
const getOrder = require('./src/routes/getOrder/getOrder');
const orderfulfill = require('./src/routes/orderfulfil/orderfulfil');
const cancelOrder = require('./src/routes/cancelOrder/cancelOrder');
const list1155 = require('./src/routes/list1155/list1155');
const orderfulfill1155 = require('./src/routes/orderfulfill1155/orderfulfill1155');
app.use(express.json());
app.use(cors());

app.use(orderfulfill1155);
app.use(list1155);
app.use(cancelOrder);
app.use(orderfulfill);
app.use(getOrder);
app.use(list721);
app.use(collection);
app.use(detailsPage);

const server = app.listen(port, () => {
  console.log('Server Running on port: ', port);
});

module.exports = server;
