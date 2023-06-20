const { nftdetails } = require('../../../models/');

const fetchNft = async (req, res) => {
  try {
    console.log('Hii from --> fetchNft');

    const nft = await nftdetails.findAll({
      where: { isListed: true },
    });
    res.status(200).json(nft);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = { fetchNft };
