
const { Seaport } = require('@opensea/seaport-js');

export const fulfillorder = async ({
  order,
  fulfiller,
  unitsToFill,
  signer,
}) => {
  try {
    
    const seaport = new Seaport(signer);
  
    let transaction;
    
    if (!Array.isArray(order)) {
      const orderParams = { order, accountAddress: fulfiller };
     
      if (unitsToFill) {
        orderParams.unitsToFill = unitsToFill;
      }

      
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
   
    return transaction.hash;
  } catch (e) {
    console.log(e);
  }
};


