// Import required libraries

const { Seaport } = require('@opensea/seaport-js');

export const fulfillorder = async ({
  order,
  fulfiller,
  unitsToFill,
  signer,
}) => {
  try {
    console.log('Fullfile:- signer', signer);
    const seaport = new Seaport(signer);
    console.log('Fullfile:- Seaport', seaport);
    let transaction;
    console.log(order, ';;;;;;', fulfiller);
    if (!Array.isArray(order)) {
      const orderParams = { order, accountAddress: fulfiller };
      console.log('Hi 1');
      if (unitsToFill) {
        orderParams.unitsToFill = unitsToFill;
      }

      console.log('Hi 2');
      const { executeAllActions } = await seaport.fulfillOrder(orderParams);

      transaction = await executeAllActions();
      console.log(transaction);
    } else {
      const { executeAllActions } = await seaport.fulfillOrders({
        fulfillOrderDetails: order,
        accountAddress: fulfiller,
      });

      transaction = await executeAllActions();
    }
    console.log('Hi 3');
    return transaction.hash;
  } catch (e) {
    console.log(e);
  }
};

// module.exports = { fulfillorder };
