import React, { useState } from 'react';

const Sell = ({ own1155 }) => {
  const [tokenAmount, setTokenAmount] = useState(1);

  function increase() {
    if (tokenAmount < own1155) setTokenAmount(tokenAmount + 1);
  }
  function decrease() {
    if (tokenAmount > 1) setTokenAmount(tokenAmount - 1);
  }
  return (
    <div>
      <div className="grid grid-cols-2 p-6 text-center ">
        <div className="mx-4">
          <button className="bg-blue-500 h-full w-full text-white text-xl p-4 rounded-xl">
            List {tokenAmount} item{' '}
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

export default Sell;
