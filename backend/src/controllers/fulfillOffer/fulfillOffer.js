const { offers } = require('../../../models/');

const fulfillOffer = async (req, res) => {
  const nftAddress = req.params.nftAddress;
  const nftId = req.params.nftId;

  try {
    const nft = await offers.destroy({
      where: { nftContractAddress: nftAddress, tokenId: nftId },
    });
    return res.status(200).json(nft);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

module.exports = { fulfillOffer };
