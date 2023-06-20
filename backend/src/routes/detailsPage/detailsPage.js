const express = require('express');
const { detailPage } = require('../../controllers/detailsPage/detailsPage');
const router = new express.Router();

router.get('/detailsPage/:nftAddress/:nftId', detailPage);

module.exports = router;
