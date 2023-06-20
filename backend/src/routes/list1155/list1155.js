const express = require('express');
const { list1155 } = require('../../controllers/list1155/list1155');
const router = new express.Router();

router.post('/list1155', list1155);
module.exports = router;
