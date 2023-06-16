const express = require('express');
const { nftdetails } = require('../../../models/');
const router = new express.Router();

router.post('/list721', async (req, res) => {
  const { nftOwner, nftContract, tokenId, order, listprice } = req.body;

  try {
    // const nftData = await nftdetails.findOne({
    //   where: {
    //     nftOwnerAddress: nftOwner,
    //     nftContractAddress: nftContract,
    //     tokenId: tokenId,
    //   },
    // });
    await nftdetails.update(
      {
        isListed: true,
        order: order,
        floorPrice: listprice,
        listprice: listprice,
      },
      {
        where: {
          nftOwnerAddress: nftOwner,
          nftContractAddress: nftContract,
          tokenId: tokenId,
        },
      },
    );

    res.status(200).json({ message: 'Data Updated Successfully' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
