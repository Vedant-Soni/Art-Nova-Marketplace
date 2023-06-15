import React from 'react';
import { NavLink } from 'react-router-dom';
import avtar from '../images/avatr.png';

const Collected = () => {
  return (
    <div>
      <div className=" h-96 py-4 px-4 rounded-xl">
        <div className="grid grid-cols-8 py-2 border-b-2 border-gray-200 text-gray-400 text-left">
          <div className="col-span-2 pl-2">n Items</div>
          <div>Floor price</div>
          <div>Best offer</div>
          <div>Listing price</div>
          <div>Cost</div>
          <div>Difference</div>
          <div></div>
        </div>
        <NavLink to="/nftdetail/123">
          <div className="grid grid-cols-8 py-2 border-b-2 border-gray-200 group cursor-pointer text-left items-center">
            <div className="col-span-2 pl-2 relative image  items-center">
              <div className="flex items-center">
                <img src={avtar} alt="NFT" className="h-10 w-10 m-2" />n Items
                value
              </div>
              <div class="absolute left-0  mt-0 w-40 bg-gray-200 z-10 border border-gray-200 p-4 rounded-md shadow-lg h-40 hidden group-hover:block">
                <img src={avtar} alt="NFT" className="h-fit " />
              </div>
            </div>
            <div>value Floor price </div>
            <div>value Best offer</div>
            <div>value Listing price</div>
            <div>value Cost</div>
            <div>value Difference</div>
            <div className=" justify-center hidden group-hover:flex">
              <span class="material-symbols-outlined text-center">sell</span>
            </div>
          </div>
        </NavLink>
        <NavLink to="/nftdetail/123">
          <div className="grid grid-cols-8 py-2 border-b-2 border-gray-200 group cursor-pointer text-left">
            <div className="col-span-2 pl-2 relative image">
              n Items value
              <div class="absolute left-0  mt-0 w-40 bg-black border border-gray-200 rounded-md shadow-lg h-32 hidden group-hover:block"></div>
            </div>
            <div>value Floor price </div>
            <div>value Best offer</div>
            <div>value Listing price</div>
            <div>value Cost</div>
            <div>value Difference</div>
            <div className=" justify-center hidden group-hover:flex">
              <span class="material-symbols-outlined text-center">sell</span>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Collected;
