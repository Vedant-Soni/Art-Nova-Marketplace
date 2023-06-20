const express = require('express');
const { createdNft } = require('../../controllers/createdNft/createdNft');

const router = new express.Router();

router.post('/createdNft', createdNft);

module.exports = router;
