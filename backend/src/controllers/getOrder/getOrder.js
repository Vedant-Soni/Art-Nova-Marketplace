const { nftdetails } = require('../../../models/');

const getOrder = async (req, res) => {
  try {
    console.log('Hii from --> getOrder');
    const nftAddress = req.params.nftAddress;
    const nftId = req.params.nftId;

    const orderNft = await nftdetails.findOne({
      where: {
        nftContractAddress: nftAddress,
        tokenId: nftId,
      },
    });
    const order = orderNft.order;
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = { getOrder };
