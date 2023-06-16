import { Seaport } from '@opensea/seaport-js';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { BigNumber, ethers } from 'ethers';
import { calculateFees } from './calculateFees';

const sellerPk = 'a'; //`${process.env.REACT_APP_PK}`//Account2
const sellerAddrss = '0x9b6391F135afF3bB7dF2F406fA3eC091D0242541';

const seaportAddress = '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC';
const marketplaceFee = 250;
const marketplaceFeeReceiver = '0xcc1190D3Aad29b3E29FD435B793A830e8ccFE464';
// const getWalletSigner = async({private})

export const createListing = async (price, tokenId, tokenAddress) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-mumbai.g.alchemy.com/v2/Z3uUYm-JtLrkeOtAWIYHLzENe3tRyj5k',
    );
    const { amountDue, marketplaceFeeAmount } = calculateFees({
      marketplaceFee,
      nftAddress: tokenAddress,
      price: BigNumber.from(price),
      tokenId,
    });
    const consideration = [];
    consideration.push(
      {
        amount: amountDue.toString(),
        recipient: sellerAddrss,
      },
      {
        amount: marketplaceFeeAmount.toString(),
        recipient: marketplaceFeeReceiver,
      },
    );

    const signer = new ethers.Wallet(sellerPk, provider);
    const seaport = new Seaport(signer);

    const { executeAllActions } = await seaport.createOrder(
      {
        offer: [
          {
            itemType: ItemType.ERC721,
            token: tokenAddress,
            identifier: tokenId,
          },
        ],
        consideration,
      },
      sellerAddrss, //optional parameter but we can specify
    );

    const wallet = new ethers.Wallet(sellerPk);

    const contract = new ethers.Contract(tokenAddress, 'erc721', wallet);
    const approved = await contract.isApprovedForAll(
      sellerAddrss,
      seaportAddress,
    );
    if (!approved) {
      const tx = await contract.setApprovalForAll(seaportAddress, true);
      await tx.wait();
    }

    return executeAllActions();
  } catch (error) {
    console.log(error);
  }
};

// const createOrder = async ({ price, tokenId, tokenAddress }) => {
//   const order = await createListing({ price, tokenId, tokenAddress });
//   console.log(order);
// };

// createOrder({
//   price: ethers.utils.parseEther('0.001').toString(),
//   tokenId: '1',
//   tokenAddress: 'aaa',
// });

// const txHash = await fulfillOrder({
//   order,
//   fulfiller: buyesrAddress,
//   fulfillerPrivateKey: buyesrPk,
// })

// module.exports = createListing;
