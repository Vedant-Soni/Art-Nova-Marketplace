const express = require('express');
const { verifyToken } = require('../../middleware/jwtMiddleware');
const {
  orderfulfill1155,
} = require('../../controllers/orderfulfill1155/orderfulfill1155');
const router = new express.Router();

router.post('/orderfulfill1155', verifyToken, orderfulfill1155);

module.exports = router;
