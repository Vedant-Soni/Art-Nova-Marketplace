const express = require('express');
const { cancelOrder } = require('../../controllers/cancelOrder/cancelOrder');
const router = new express.Router();

router.post('/cancelOrder', cancelOrder);

module.exports = router;
