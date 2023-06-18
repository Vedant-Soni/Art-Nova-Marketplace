import { Seaport } from '@opensea/seaport-js';

export const cancelOrder = async ({ order, offerer, signer }) => {
  try {
    const seaport = new Seaport(signer);
    console.log(order);
    // const params = {
    //   order: ,
    //   accountAddress: offerer,
    // };
    const { transact } = await seaport.cancelOrders([
      { ...order.parameters, counter: 0 },
    ]);

    const transaction = await transact();
    return transaction.hash;
  } catch (error) {
    console.log(error);
  }
};
