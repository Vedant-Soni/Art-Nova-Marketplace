const { alchemyClient } = require('../../../alchemyClient');
const { nftdetails } = require('../../../models/');

const fetchCreated = async (req, res) => {
  try {
    console.log('Hii');
    const owner = req.params.ownerAddress;
    const nftData = await nftdetails.findAll({
      where: { nftOwnerAddress: owner, isCreated: true },
    });
    res.status(200).json(nftData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = { fetchCreated };
