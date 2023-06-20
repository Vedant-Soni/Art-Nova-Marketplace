import React from 'react';
import avatr from '../images/avatr.png';
import { NavLink } from 'react-router-dom';

const Created = () => {
  return (
    <div>
      <div className="p-4 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {/* loop this */}
        <NavLink
          to={
            {
              // pathname: `/nftdetail/${nftdetail.nftContractAddress}/${nftdetail.tokenId}`,
            }
          }
        >
          <div className="h-fit flex flex-col justify-end  rounded-3xl  relative drop-shadow-sm hover:drop-shadow-xl">
            <img
              src={avatr}
              alt="image"
              className="rounded-t-xl h-56 object-cover"
            />
            <div className="bg-slate-50 absolute rounded-xl bottom-2 left-2  p-1">
              <img className="w-12 rounded-lg " src={avatr} alt="img" />
            </div>
            <div className="bg-slate-50 h-12 flex items-center pl-16 rounded-b-xl">
              Name
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Created;
