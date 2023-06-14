import React, { useState } from 'react';

const Buy721 = ({ owner }) => {
  return (
    <div>
      <div className="grid grid-cols-2 p-6 text-center ">
        <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center">
          <button className="flex justify-center gap-4 h-full w-full text-white border bg-blue-500 border-gray-300 text-xl p-4 rounded-xl">
            Buy now
          </button>
        </div>
        <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center ">
          <button className="flex justify-center gap-4 h-full w-full text-blue-500 border border-gray-300 text-xl p-4 rounded-xl">
            <span class="material-symbols-outlined text-3xl">sell</span>Make
            Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buy721;
