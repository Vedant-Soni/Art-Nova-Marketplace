const express = require('express');
const { nftdetails } = require('../../../models/');
const router = new express.Router();

router.post('/orderfulfill', async (req, res) => {
  const { nftOwner, nftContract, tokenId } = req.body;
  try {
    const nftData = await nftdetails.findOne({
      where: { nftContractAddress: nftContract, tokenId: tokenId },
    });
    if (nftData) {
      await nftdetails.update(
        {
          isListed: false,
          order: null,
          floorPrice: null,
          listingPrice: null,
          nftOwnerAddress: nftOwner,
        },
        { where: { nftContractAddress: nftContract, tokenId: tokenId } },
      );
      return res.status(200).json({ message: 'Data Updated Successfully' });
    }
    return res.status(400).json({ message: 'No data found' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
});

module.exports = router;
