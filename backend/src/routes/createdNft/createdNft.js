const express = require('express');
const { createdNft } = require('../../controllers/createdNft/createdNft');
const { verifyToken } = require('../../middleware/jwtMiddleware');
const router = new express.Router();
router.post('/createdNft', verifyToken, createdNft);

module.exports = router;
