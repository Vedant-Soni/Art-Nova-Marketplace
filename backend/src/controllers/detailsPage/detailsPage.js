const { nftdetails } = require('../../../models/');

const detailPage = async (req, res) => {
  try {
    console.log('Hii from --> detailPage');
    const nftAddress = req.params.nftAddress;
    const nftId = req.params.nftId;

    const nft = await nftdetails.findOne({
      where: { nftContractAddress: nftAddress, tokenId: nftId },
    });
    res.status(200).json({ nft });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { detailPage };
