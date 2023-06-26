const express = require('express');
const { getOrder } = require('../../controllers/getOrder/getOrder');
const { verifyToken } = require('../../middleware/jwtMiddleware');
const router = new express.Router();

router.get('/getOrder/:nftAddress/:nftId', verifyToken, getOrder);

module.exports = router;
