const { alchemyClient } = require('../../../alchemyClient');
const { nftdetails } = require('../../../models/');

const createdNft = async (req, res) => {
  const { owner, chainName } = req.body;
  console.log(chainName);
  const {
    nftsForOwnerMumbai,
    nftsForOwnerSepolia,
    nftsForOwnerMainnet,
    nftsForOwnerPolygon,
  } = await alchemyClient(owner);
  console.log('hii ---->      createdNft');
  try {
    if (chainName === 'Polygon Mumbai') {
      console.log(
        'hii ---------------------------------------------->       Inside Mumbai',
      );
      let latestNFT = null;
      let mintedNFTs = nftsForOwnerMumbai.ownedNfts;
      if (mintedNFTs.length > 0) {
        const lastMintedNFT = mintedNFTs[mintedNFTs.length - 1];
        latestNFT = lastMintedNFT;

        if (latestNFT) {
          await nftdetails.create({
            walletAddress: owner,
            nftOwnerAddress: owner,
            nftContractAddress: latestNFT.contract.address,
            tokenId: latestNFT.tokenId,
            network: nftsForOwnerMumbai.network,
            nftJsonData: latestNFT,
            balance: latestNFT.balance,
            isListed: false,
            isCreated: true,
          });
        } else {
          throw new Error('Error in latest nft data fetching');
        }

        return res.status(200).json({ message: 'Data Updated Successfully' });
      } else {
        throw new Error('Error in latest nft data fetching');
      }
    } else if (chainName === 'Sepolia Testnet') {
      console.log('hii ---->       Inside sep');
      let latestNFT = null;
      let mintedNFTs = nftsForOwnerSepolia.ownedNfts;
      if (mintedNFTs.length > 0) {
        const lastMintedNFT = mintedNFTs[mintedNFTs.length - 1];
        latestNFT = lastMintedNFT;

        if (latestNFT) {
          await nftdetails.create({
            walletAddress: owner,
            nftOwnerAddress: owner,
            nftContractAddress: latestNFT.contract.address,
            tokenId: latestNFT.tokenId,
            network: nftsForOwnerSepolia.network,
            nftJsonData: latestNFT,
            balance: latestNFT.balance,
            isListed: false,
            isCreated: true,
          });
        } else {
          throw new Error('Error in latest nft data fetching');
        }

        return res.status(200).json({ message: 'Data Updated Successfully' });
      } else {
        throw new Error('Error in latest nft data fetching');
      }
    } else if (chainName === 'Polygon Mainnet') {
      let latestNFT = null;
      let mintedNFTs = nftsForOwnerPolygon.ownedNfts;
      if (mintedNFTs.length > 0) {
        const lastMintedNFT = mintedNFTs[mintedNFTs.length - 1];
        latestNFT = lastMintedNFT;

        if (latestNFT) {
          await nftdetails.create({
            walletAddress: owner,
            nftOwnerAddress: owner,
            nftContractAddress: latestNFT.contract.address,
            tokenId: latestNFT.tokenId,
            network: nftsForOwnerPolygon.network,
            nftJsonData: latestNFT,
            balance: latestNFT.balance,
            isListed: false,
            isCreated: true,
          });
        } else {
          throw new Error('Error in latest nft data fetching');
        }

        return res.status(200).json({ message: 'Data Updated Successfully' });
      } else {
        throw new Error('Error in latest nft data fetching');
      }
    } else {
      let latestNFT = null;
      let mintedNFTs = nftsForOwnerMainnet.ownedNfts;
      if (mintedNFTs.length > 0) {
        const lastMintedNFT = mintedNFTs[mintedNFTs.length - 1];
        latestNFT = lastMintedNFT;

        if (latestNFT) {
          await nftdetails.create({
            walletAddress: owner,
            nftOwnerAddress: owner,
            nftContractAddress: latestNFT.contract.address,
            tokenId: latestNFT.tokenId,
            network: nftsForOwnerMainnet.network,
            nftJsonData: latestNFT,
            balance: latestNFT.balance,
            isListed: false,
            isCreated: true,
          });
        } else {
          throw new Error('Error in latest nft data fetching');
        }

        return res.status(200).json({ message: 'Data Updated Successfully' });
      } else {
        throw new Error('Error in latest nft data fetching');
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = { createdNft };
