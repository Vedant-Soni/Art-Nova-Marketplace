const express = require('express');
const { fulfillOffer } = require('../../controllers/fulfillOffer/fulfillOffer');
const router = new express.Router();
router.delete('/fulfillOffer/:nftAddress/:nftId', fulfillOffer);

module.exports = router;
