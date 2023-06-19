import { Seaport } from '@opensea/seaport-js';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { BigNumber, ethers } from 'ethers';
import { ABI721 } from './ABI721';
import { calculateFees } from './calculateFees';
import { Buffer } from 'buffer';
import { ABI1155 } from './ABI1155';

// @ts-ignore
window.Buffer = Buffer;

const seaportAddress = '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC';
const marketplaceFee = 250;
const marketplaceFeeReceiver = '0xcc1190D3Aad29b3E29FD435B793A830e8ccFE464';

export const createOrder1155 = async ({
  price,
  tokenId,
  tokenAddress,
  signer,
  offerer,
  tokenAmount,
}) => {
  try {
    console.log(signer.provider);

    price = ethers.utils.parseEther(`${price}`).toString();
    const { amountDue, marketplaceFeeAmount } = calculateFees({
      marketplaceFee,
      nftAddress: tokenAddress,
      price: BigNumber.from(price).mul(BigNumber.from(tokenAmount)),
      tokenId,
    });
    console.log('hi 2---------------------');
    const consideration = [];
    consideration.push(
      {
        amount: amountDue.toString(),
        recipient: offerer,
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
          itemType: ItemType.ERC1155,
          token: tokenAddress,
          identifier: tokenId,
          amount: tokenAmount,
        },
      ],
      consideration,
      allowPartialFills: true,
    });
    console.log('hi 5---------------------');

    const contract = new ethers.Contract(tokenAddress, ABI1155, signer);
    console.log('hi 6---------------------');
    const approved = await contract.isApprovedForAll(offerer, seaportAddress);

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
