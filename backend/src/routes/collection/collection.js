const express = require('express');
const {
  collections,
  allCollection,
} = require('../../controllers/collection/collection');
const { verifyToken } = require('../../middleware/jwtMiddleware');
const router = new express.Router();

router.get('/collections/:ownerAddress', verifyToken, collections);
router.post('/allcollection', allCollection);

module.exports = router;
