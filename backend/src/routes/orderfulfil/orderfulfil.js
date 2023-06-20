const express = require('express');
const { orderfulfill } = require('../../controllers/orderfulfil/orderfulfil');
const router = new express.Router();

router.post('/orderfulfill', orderfulfill);

module.exports = router;
