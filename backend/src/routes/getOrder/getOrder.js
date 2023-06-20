const express = require('express');
const { getOrder } = require('../../controllers/getOrder/getOrder');
const router = new express.Router();

router.get('/getOrder/:nftAddress/:nftId', getOrder);

module.exports = router;
