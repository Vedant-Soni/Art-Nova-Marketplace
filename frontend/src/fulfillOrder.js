// Import required libraries

const { Seaport } = require('@opensea/seaport-js');

const fulfillorder = async ({ order, fulfiller, unitsToFill, signer }) => {
  try {
    console.log('Fulfile:- signer', signer);
    const seaport = new Seaport(signer);
    console.log('Fulfile:- Seaport', seaport);
    let transaction;

    if (!Array.isArray(order)) {
      const orderParams = { order, accountAddress: fulfiller };

      if (unitsToFill) {
        orderParams.unitsToFill = unitsToFill;
      }

      const { executeAllActions } = await seaport.fulfillOrder(orderParams);

      transaction = await executeAllActions();
    } else {
      const { executeAllActions } = await seaport.fulfillOrders({
        fulfillOrderDetails: order,
        accountAddress: fulfiller,
      });

      transaction = await executeAllActions();
    }

    return transaction.hash;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { fulfillorder };
