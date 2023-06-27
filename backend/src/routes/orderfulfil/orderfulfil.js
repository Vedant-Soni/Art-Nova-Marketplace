const express = require('express');
const { orderfulfill } = require('../../controllers/orderfulfil/orderfulfil');
const { verifyToken } = require('../../middleware/jwtMiddleware');
const router = new express.Router();

router.post('/orderfulfill', verifyToken, orderfulfill);

module.exports = router;
