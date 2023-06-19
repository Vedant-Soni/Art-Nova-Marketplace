const express = require('express');
const { nftdetails } = require('../../../models/');
const router = new express.Router();

router.post('/cancelOrder', async (req, res) => {
  const { nftContract, tokenId } = req.body;

  try {
    console.log('outside');
    const nftData = await nftdetails.findOne({
      where: { nftContractAddress: nftContract, tokenId: tokenId },
    });

    if (nftData) {
      console.log('Hi from ----> cancelOrder API');
      await nftdetails.update(
        {
          isListed: false,
          order: null,
          listingPrice: null,
        },
        {
          where: { nftContractAddress: nftContract, tokenId: tokenId },
        },
      );

      return res.status(200).json({ message: 'Order Cancel Sucessfully' });
    }
    return res.status(400).json({ message: 'Order not found' });
  } catch (error) {
    res.status(400).json({ error });
    console.log(error);
  }
});

module.exports = router;
