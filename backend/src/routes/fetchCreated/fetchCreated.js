const express = require('express');
const { fetchCreated } = require('../../controllers/fetchCreated/fetchCreated');
const { verifyToken } = require('../../middleware/jwtMiddleware');
const router = new express.Router();

router.get('/fetchCreated/:ownerAddress', verifyToken, fetchCreated);

module.exports = router;
