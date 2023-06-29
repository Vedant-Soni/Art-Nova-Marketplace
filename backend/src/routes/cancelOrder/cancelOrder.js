const express = require('express');
const { cancelOrder } = require('../../controllers/cancelOrder/cancelOrder');
const { verifyToken } = require('../../middleware/jwtMiddleware');
const router = new express.Router();

router.post('/cancelOrder', verifyToken, cancelOrder);

module.exports = router;
