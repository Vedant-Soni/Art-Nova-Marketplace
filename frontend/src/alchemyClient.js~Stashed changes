const { Network, Alchemy } = require('alchemy-sdk');

const alchemyClient = async (walletAddress) => {
  const settings = {
    apiKey: `${process.env.REACT_APP_ALCHEMY_API}`,
  };
  const alchemyMumbai = new Alchemy({
    ...settings,
    network: Network.MATIC_MUMBAI,
  });
  const alchemySepolia = new Alchemy({
    ...settings,
    network: Network.ETH_SEPOLIA,
  });
  const alchemyETH = new Alchemy({ ...settings, network: Network.ETH_MAINNET });
  const alchemyPolygon = new Alchemy({
    ...settings,
    network: Network.MATIC_MAINNET,
  });

  const nftsForOwnerMumbai = await alchemyMumbai.nft.getNftsForOwner(
    walletAddress,
  );

  const nftsForOwnerSepolia = await alchemySepolia.nft.getNftsForOwner(
    walletAddress,
  );

  const nftsForOwnerPolygon = await alchemyETH.nft.getNftsForOwner(
    walletAddress,
  );

  const nftsForOwnerMainnet = await alchemyPolygon.nft.getNftsForOwner(
    walletAddress,
  );

  nftsForOwnerMumbai.network = 80001;
  nftsForOwnerSepolia.network = 11155111;
  nftsForOwnerMainnet.network = 1;
  nftsForOwnerPolygon.network = 137;

  return {
    nftsForOwnerMumbai,
    nftsForOwnerSepolia,
    nftsForOwnerMainnet,
    nftsForOwnerPolygon,
  };
};
// alchemyClient('0xcc1190D3Aad29b3E29FD435B793A830e8ccFE464');
module.exports = { alchemyClient };
