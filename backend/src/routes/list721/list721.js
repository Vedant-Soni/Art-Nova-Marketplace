const express = require('express');
const { nftdetails } = require('../../../models/');
const router = new express.Router();

router.post('/list721', async (req, res) => {
  const { nftOwner, nftContract, tokenId, order, listprice } = req.body;
  console.log('hii ----- From list721 API');
  try {
    const nftData = await nftdetails.findOne({
      where: {
        nftOwnerAddress: nftOwner,
        nftContractAddress: nftContract,
        tokenId: tokenId,
      },
    });
    if (nftData) {
      await nftdetails.update(
        {
          isListed: true,
          order: order,
          floorPrice: listprice,
          listingPrice: listprice,
        },
        {
          where: {
            nftOwnerAddress: nftOwner,
            nftContractAddress: nftContract,
            tokenId: tokenId,
          },
        },
      );
    }

    res.status(200).json({ message: nftData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
