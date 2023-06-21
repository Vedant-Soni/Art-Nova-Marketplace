const { alchemyClient } = require('../../../alchemyClient');
const { nftdetails } = require('../../../models/');

const createdNft = async (req, res) => {
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
      const nftdetail =
        nftsForOwnerMumbai.ownedNfts[nftsForOwnerMumbai.ownedNfts.length - 1];
      console.log(nftdetail);
      await nftdetails.create({
        walletAddress: owner,
        nftOwnerAddress: owner,
        nftContractAddress: nftdetail.contract.address,
        tokenId: nftdetail.tokenId,
        network: nftsForOwnerMumbai.network,
        nftJsonData: nftdetail,
        balance: nftdetail.balance,
        isListed: false,
        isCreated: true,
      });

      return res.status(200).json({ message: 'Data Updated Successfully' });
    } else if (chainName === 'Sepolia Testnet') {
      console.log('hii ---->       Inside sep');
      const nftdetail =
        nftsForOwnerSepolia.ownedNfts[nftsForOwnerSepolia.ownedNfts.length - 1];
      console.log(nftdetail);
      await nftdetails.create({
        walletAddress: owner,
        nftOwnerAddress: owner,
        nftContractAddress: nftdetail.contract.address,
        tokenId: nftdetail.tokenId,
        network: nftsForOwnerSepolia.network,
        nftJsonData: nftdetail,
        balance: nftdetail.balance,
        isListed: false,
        isCreated: true,
      });

      return res.status(200).json({ message: 'Data Updated Successfully' });
    } else if (chainName === 'Polygon Mainnet') {
      const nftdetail =
        nftsForOwnerPolygon.ownedNfts[nftsForOwnerPolygon.ownedNfts.length - 1];
      await nftdetails.create({
        walletAddress: owner,
        nftOwnerAddress: owner,
        nftContractAddress: nftdetail.contract.address,
        tokenId: nftdetail.tokenId,
        network: nftsForOwnerPolygon.network,
        nftJsonData: nftdetail,
        balance: nftdetail.balance,
        isListed: false,
        isCreated: true,
      });

      return res.status(200).json({ message: 'Data Updated Successfully' });
    } else {
      const nftdetail =
        nftsForOwnerMainnet.ownedNfts[nftsForOwnerMainnet.ownedNfts.length - 1];
      await nftdetails.create({
        walletAddress: owner,
        nftOwnerAddress: owner,
        nftContractAddress: nftdetail.contract.address,
        tokenId: nftdetail.tokenId,
        network: nftsForOwnerMainnet.network,
        nftJsonData: nftdetail,
        balance: nftdetail.balance,
        isListed: false,
        isCreated: true,
      });

      return res.status(200).json({ message: 'Data Updated Successfully' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = { createdNft };
