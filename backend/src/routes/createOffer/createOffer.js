const express = require('express');
const { createOffer } = require('../../controllers/createOffer/createOffer');
const router = new express.Router();
router.post('/createOffer', createOffer);

module.exports = router;
