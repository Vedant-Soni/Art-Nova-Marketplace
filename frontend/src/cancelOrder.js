import { Seaport } from '@opensea/seaport-js';

export const cancelOrder = async ({ order, offerer, signer }) => {
  try {
    const seaport = new Seaport(signer);
    console.log(order);
    const { transact } = await seaport.cancelOrders([
      { ...order.parameters, counter: 0 },
    ]);

    const transaction = await transact();
    return transaction.hash;
  } catch (error) {
    console.log(error);
  }
};
