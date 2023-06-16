import { Connector } from 'wagmi';
import { Seaport } from '@opensea/seaport-js';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { BigNumber, ethers } from 'ethers';
import { ABI721 } from './ABI721';
import { calculateFees } from './calculateFees';
import { Buffer } from 'buffer';

// @ts-ignore
window.Buffer = Buffer;
const sellerPk = 'a'; //`${process.env.REACT_APP_PK}`//Account2

const seaportAddress = '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC';
const marketplaceFee = 250;
const marketplaceFeeReceiver = '0xcc1190D3Aad29b3E29FD435B793A830e8ccFE464';

export const createListing = async ({
  price,
  tokenId,
  tokenAddress,
  signer,
}) => {
  try {
    const connector = new Connector();
    await connector.connect();
    console.log(signer.provider);

    price = ethers.utils.parseEther(`${price}`).toString();
    const { amountDue, marketplaceFeeAmount } = calculateFees({
      marketplaceFee,
      nftAddress: tokenAddress,
      price: BigNumber.from(price),
      tokenId,
    });
    console.log('hi 2---------------------');
    const consideration = [];
    consideration.push(
      {
        amount: amountDue.toString(),
        recipient: '0x9b6391F135afF3bB7dF2F406fA3eC091D0242541',
      },
      {
        amount: marketplaceFeeAmount.toString(),
        recipient: marketplaceFeeReceiver,
      },
    );
    console.log('hi 3---------------------');

    const seaport = new Seaport(signer);
    console.log('seaport:-', seaport);
    console.log('hi 4---------------------');
    const { executeAllActions } = await seaport.createOrder({
      offer: [
        {
          itemType: ItemType.ERC721,
          token: tokenAddress,
          identifier: tokenId,
        },
      ],
      consideration,
    });
    console.log('hi 5---------------------');

    const contract = new ethers.Contract(tokenAddress, ABI721, signer);
    console.log('hi 6---------------------');
    const approved = await contract.isApprovedForAll(
      '0x9b6391F135afF3bB7dF2F406fA3eC091D0242541',
      seaportAddress,
    );
    if (!approved) {
      const tx = await contract.setApprovalForAll(seaportAddress, true);
      await tx.wait();
    }
    console.log('hi 7---------------------');
    return executeAllActions();
  } catch (error) {
    console.log('hi ERRRRRRRRRRRRR---------------------');
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
