const express = require('express');
const { collections } = require('../../controllers/collection/collection');

const router = new express.Router();

router.get('/collections/:ownerAddress', collections);

module.exports = router;
