const { offers } = require('../../../models/');

const createOffer = async (req, res) => {
  const { nftOwner, nftContract, tokenId, offer, offerAmount, offerer } =
    req.body;
  try {
    await offers.create({
      nftOwnerAddress: nftOwner,
      nftContractAddress: nftContract,
      tokenId,
      offerer,
      amount: offerAmount,
      order: offer,
    });

    return res.status(200).json({ message: 'Data updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

module.exports = { createOffer };
