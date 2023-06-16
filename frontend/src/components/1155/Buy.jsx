import React, { useState } from 'react';

const Buy = ({ total1155 }) => {
  const [tokenAmount, setTokenAmount] = useState(1);

  function increase() {
    if (tokenAmount < total1155) setTokenAmount(tokenAmount + 1);
  }
  function decrease() {
    if (tokenAmount > 1) setTokenAmount(tokenAmount - 1);
  }
  return (
    <div>
      <div className="grid grid-cols-2 p-6 text-center ">
        <div className="mx-4">
          <button className="flex justify-center gap-4 h-full w-full text-blue-500 border border-gray-300 text-xl p-4 rounded-xl">
            <span class="material-symbols-outlined text-3xl">sell</span>Buy{' '}
            {tokenAmount} item{' '}
          </button>
        </div>
        <div className="flex gap-6 text-2xl h-full w-fit p-4 px-8 rounded-xl text-center border border-gray-300">
          <div className="cursor-pointer" onClick={() => decrease()}>
            -
          </div>
          <div>
            <p>{tokenAmount}</p>
          </div>
          <div className="cursor-pointer" onClick={() => increase()}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
