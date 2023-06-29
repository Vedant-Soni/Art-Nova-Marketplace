const express = require('express');
const { fetchOffers } = require('../../controllers/fetchOffers/fetchOffers');
const router = new express.Router();
router.get('/fetchOffers/:nftAddress/:nftId', fetchOffers);

module.exports = router;
