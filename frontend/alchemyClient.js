const { Network, Alchemy } = require('alchemy-sdk');

const alchemyClient = async (walletAddress) => {
  const settings = {
    apiKey: 'Z3uUYm-JtLrkeOtAWIYHLzENe3tRyj5k',
  };
  const alchemyMumbai = new Alchemy({
    ...settings,
    network: Network.MATIC_MUMBAI,
  });
  const alchemySepolia = new Alchemy({
    ...settings,
    network: Network.SE_POLIA,
  });
  const alchemyETH = new Alchemy({ ...settings, network: Network.ETH_MAINNET });
  const alchemyPolygon = new Alchemy({
    ...settings,
    network: Network.MATIC_MAINNET,
  });

  const nftsForOwnerMumbai = await alchemyMumbai.nft.getNftsForOwner(
    walletAddress,
  );
  console.log(
    'Number of NFTs found in Polygon Mumbai:',
    nftsForOwnerMumbai.totalCount,
  );

  const nftsForOwnerSepolia = await alchemySepolia.nft.getNftsForOwner(
    walletAddress,
  );
  console.log(
    'Number of NFTs found in Sepolia:',
    nftsForOwnerSepolia.totalCount,
  );
};

// module.exports = { alchemyClient };
alchemyClient('0xcc1190D3Aad29b3E29FD435B793A830e8ccFE464');
