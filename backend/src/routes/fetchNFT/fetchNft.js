const express = require('express');

const { fetchNft } = require('../../controllers/fetchNFT/fetchNft');
const router = new express.Router();

router.get('/fetchNft', fetchNft);

module.exports = router;
