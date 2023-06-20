const { nftdetails } = require('../../../models/');

const orderfulfill1155 = async (req, res) => {
  const { nftOwner, nftContract, tokenId, units, newnftOwner } = req.body;
  try {
    const nftData = await nftdetails.findOne({
      where: {
        nftOwnerAddress: nftOwner,
        nftContractAddress: nftContract,
        tokenId: tokenId,
      },
    });
    if (nftData) {
      const updatedListed = nftData.totalListed - units;
      if (updatedListed === 0) {
        const updatedBalance = nftData.balance - units;
        await nftdetails.update(
          {
            isListed: false,
            order: null,
            floorPrice: null,
            listingPrice: null,
            balance: updatedBalance,
            totalListed: updatedListed,
          },
          {
            where: {
              nftOwnerAddress: nftOwner,
              nftContractAddress: nftContract,
              tokenId: tokenId,
            },
          },
        );
      } else {
        const updatedBalance = nftData.balance - units;
        await nftdetails.update(
          {
            totalListed: updatedListed,
            balance: updatedBalance,
          },
          {
            where: {
              nftOwnerAddress: nftOwner,
              nftContractAddress: nftContract,
              tokenId: tokenId,
            },
          },
        );
      }

      //   return res.status(200).json({ message: 'Data Updated Successfully' });
    }

    const newOwner = await nftdetails.findOne({
      where: {
        nftOwnerAddress: newnftOwner,
        nftContractAddress: nftContract,
        tokenId: tokenId,
      },
    });
    if (newOwner) {
      const updatedBalance = nftData.balance + units;
      await nftdetails.update(
        {
          balance: updatedBalance,
        },
        {
          where: {
            nftOwnerAddress: newnftOwner,
            nftContractAddress: nftContract,
            tokenId: tokenId,
          },
        },
      );
    } else {
      await nftdetails.create({
        walletAddress: nftData.walletAddress,
        nftOwnerAddress: newnftOwner,
        nftContractAddress: nftData.nftContractAddress,
        tokenId: nftData.tokenId,
        network: nftData.network,
        nftJsonData: nftData.nftJsonData,
        balance: units,
        isListed: false,
      });
    }

    return res.status(200).json({ message: 'Data  Updated Successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

module.exports = { orderfulfill1155 };
