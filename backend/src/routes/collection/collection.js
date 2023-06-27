const express = require('express');
const { collections } = require('../../controllers/collection/collection');
const { verifyToken } = require('../../middleware/jwtMiddleware');
const router = new express.Router();

router.get('/collections/:ownerAddress', verifyToken, collections);

module.exports = router;
