const { BigNumber } = require('ethers');

const calculateFees = ({ nftAddress, price, tokenId, marketplaceFee }) => {
  try {
    const marketplaceFeeAmount = price
      .mul(BigNumber.from(marketplaceFee))
      .div(BigNumber.from('10000'));
    const amountDue = BigNumber.from(price).sub(
      BigNumber.from(marketplaceFeeAmount),
    );
    return { amountDue, marketplaceFeeAmount };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { calculateFees };
