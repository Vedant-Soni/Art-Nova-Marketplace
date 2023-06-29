const { offers } = require('../../../models/');

const fetchOffers = async (req, res) => {
  const nftAddress = req.params.nftAddress;
  const nftId = req.params.nftId;

  try {
    const nft = await offers.findAll({
      where: { nftContractAddress: nftAddress, tokenId: nftId },
    });
    return res.status(200).json(nft);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

module.exports = { fetchOffers };
