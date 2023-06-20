const express = require('express');
const { createdNft } = require('../../controllers/createdNft/createdNft');

const router = new express.Router();

router.post('/createdNft', createdNft);

module.exports = router;

const { alchemyClient } = require('../../../alchemyClient');
const { nftdetails } = require('../../../models/');
const router = new express.Router();

router.post('/createdNft', async (req, res) => {
  const { owner, chainName } = req.body;
  const {
    nftsForOwnerMumbai,
    nftsForOwnerSepolia,
    nftsForOwnerMainnet,
    nftsForOwnerPolygon,
  } = await alchemyClient(owner);
  console.log('hii ---->      createdNft');
  try {
    if (chainName === 'Polygon Mumbai') {
      console.log('hii ---->       Inside');
      const nftdetail = nftsForOwnerMumbai.ownedNfts[ownedNfts.length - 1];
      await nftdetails.create({
        walletAddress: owner,
        nftOwnerAddress: owner,
        nftContractAddress: nftdetail.contract.address,
        tokenId: nftdetail.tokenId,
        network: nftsForOwnerMumbai.network,
        nftJsonData: nftdetail,
        balance: nftdetail.balance,
        isListed: false,
      });

      return res.status(200).json({ message: 'Data Updated Successfully' });
    } else if (chainName === 'Sepolia Testnet') {
      const nftdetail = nftsForOwnerSepolia.ownedNfts[ownedNfts.length - 1];
      await nftdetails.create({
        walletAddress: owner,
        nftOwnerAddress: owner,
        nftContractAddress: nftdetail.contract.address,
        tokenId: nftdetail.tokenId,
        network: nftsForOwnerSepolia.network,
        nftJsonData: nftdetail,
        balance: nftdetail.balance,
        isListed: false,
      });

      return res.status(200).json({ message: 'Data Updated Successfully' });
    } else if (chainName === 'Polygon Mainnet') {
      const nftdetail = nftsForOwnerPolygon.ownedNfts[ownedNfts.length - 1];
      await nftdetails.create({
        walletAddress: owner,
        nftOwnerAddress: owner,
        nftContractAddress: nftdetail.contract.address,
        tokenId: nftdetail.tokenId,
        network: nftsForOwnerPolygon.network,
        nftJsonData: nftdetail,
        balance: nftdetail.balance,
        isListed: false,
      });

      return res.status(200).json({ message: 'Data Updated Successfully' });
    } else {
      const nftdetail = nftsForOwnerMainnet.ownedNfts[ownedNfts.length - 1];
      await nftdetails.create({
        walletAddress: owner,
        nftOwnerAddress: owner,
        nftContractAddress: nftdetail.contract.address,
        tokenId: nftdetail.tokenId,
        network: nftsForOwnerMainnet.network,
        nftJsonData: nftdetail,
        balance: nftdetail.balance,
        isListed: false,
      });

      return res.status(200).json({ message: 'Data Updated Successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});
