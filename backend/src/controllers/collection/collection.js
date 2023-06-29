const { alchemyClient } = require('../../../alchemyClient');
const { nftdetails } = require('../../../models/');

const collections = async (req, res) => {
  try {
    console.log('Hii');
    const owner = req.params.ownerAddress;
    let nftData = await nftdetails.findAll({
      where: { nftOwnerAddress: owner },
      order: [['id', 'DESC']],
    });
    if (nftData.length === 0) {
      const {
        nftsForOwnerMumbai,
        nftsForOwnerSepolia,
        nftsForOwnerMainnet,
        nftsForOwnerPolygon,
      } = await alchemyClient(owner);

      if (nftsForOwnerMumbai.totalCount !== 0) {
        nftsForOwnerMumbai.ownedNfts.map(async (nftdetail, key) => {
          await nftdetails.create({
            walletAddress: owner,
            nftOwnerAddress: owner,
            nftContractAddress: nftdetail.contract.address,
            tokenId: nftdetail.tokenId,
            network: nftsForOwnerMumbai.network,
            nftJsonData: nftdetail,
            balance: nftdetail.balance,
            isListed: false,
            totalSupply: nftdetail.balance,
          });
        });
      }
      if (nftsForOwnerSepolia.totalCount !== 0) {
        nftsForOwnerSepolia.ownedNfts.map(async (nftdetail, key) => {
          await nftdetails.create({
            walletAddress: owner,
            nftOwnerAddress: owner,
            nftContractAddress: nftdetail.contract.address,
            tokenId: nftdetail.tokenId,
            network: nftsForOwnerSepolia.network,
            nftJsonData: nftdetail,
            balance: nftdetail.balance,
            isListed: false,
            totalSupply: nftdetail.balance,
          });
        });
      }

      if (nftsForOwnerMainnet.totalCount !== 0) {
        nftsForOwnerMainnet.ownedNfts.map(async (nftdetail, key) => {
          await nftdetails.create({
            walletAddress: owner,
            nftOwnerAddress: owner,
            nftContractAddress: nftdetail.contract.address,
            tokenId: nftdetail.tokenId,
            network: nftsForOwnerMainnet.network,
            nftJsonData: nftdetail,
            balance: nftdetail.balance,
            isListed: false,
            totalSupply: nftdetail.balance,
          });
        });
      }

      if (nftsForOwnerPolygon.totalCount !== 0) {
        nftsForOwnerPolygon.ownedNfts.map(async (nftdetail, key) => {
          await nftdetails.create({
            walletAddress: owner,
            nftOwnerAddress: owner,
            nftContractAddress: nftdetail.contract.address,
            tokenId: nftdetail.tokenId,
            network: nftsForOwnerPolygon.network,
            nftJsonData: nftdetail,
            balance: nftdetail.balance,
            isListed: false,
            totalSupply: nftdetail.balance,
          });
        });
      }
      nftData = await nftdetails.findAll({
        where: { nftOwnerAddress: owner },
        order: [['id', 'DESC']],
      });
      res.status(200).json({ nftData });
    } else {
      res.status(200).json({ nftData });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
const allCollection = async (req, res) => {
  try {
    const nftData = await nftdetails.findAll({
      order: [['id', 'DESC']],
    });
    res.status(200).json({ nftData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
module.exports = { collections, allCollection };
