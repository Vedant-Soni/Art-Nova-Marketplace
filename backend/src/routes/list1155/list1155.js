const express = require('express');
const { nftdetails } = require('../../../models/');
const router = new express.Router();

router.post('/list1155', async (req, res) => {
  console.log('Hiii from --->   list1155');
  const {
    nftOwner,
    nftContract,
    tokenId,
    order,
    listprice,
    totalListed,
    availableForListing,
  } = req.body;
  try {
    const nftData = await nftdetails.findOne({
      where: {
        nftOwnerAddress: nftOwner,
        nftContractAddress: nftContract,
        tokenId: tokenId,
      },
    });
    if (nftData) {
      console.log('Inside');
      await nftdetails.update(
        {
          isListed: true,
          order: order,
          floorPrice: listprice,
          listingPrice: listprice,
          totalListed,
          availableForListing,
        },
        {
          where: {
            nftOwnerAddress: nftOwner,
            nftContractAddress: nftContract,
            tokenId: tokenId,
          },
        },
      );
      return res.status(200).json({ message: 'Data Updated successfully' });
    }
    return res.status(400).json({ message: 'No data found' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});
module.exports = router;
