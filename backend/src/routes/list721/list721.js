const express = require('express');
const { list721 } = require('../../controllers/list721/list721');
const router = new express.Router();

router.post('/list721', list721);

module.exports = router;
