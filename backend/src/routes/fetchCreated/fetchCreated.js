const express = require('express');
const { fetchCreated } = require('../../controllers/fetchCreated/fetchCreated');

const router = new express.Router();

router.get('/fetchCreated/:ownerAddress', fetchCreated);

module.exports = router;
