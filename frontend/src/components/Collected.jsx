import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { alchemyClient } from '../alchemyClient';
import avtar from '../images/avatr.png';

const Collected = () => {
  const [nftsForOwnerMumbai, setnftsForOwnerMumbai] = useState(null);
  const [nftsForOwnerSepolia, setnftsForOwnerSepolia] = useState(null);
  const [nftsForOwnerMainnet, setnftsForOwnerMainnet] = useState(null);
  const [nftsForOwnerPolygon, setnftsForOwnerPolygon] = useState(null);

  useEffect(() => {
    const getNFT = async () => {
      const {
        nftsForOwnerMumbai,
        nftsForOwnerSepolia,
        nftsForOwnerMainnet,
        nftsForOwnerPolygon,
      } = await alchemyClient('0xcc1190D3Aad29b3E29FD435B793A830e8ccFE464');
      console.log(nftsForOwnerSepolia.totalCount + 'hiiii');
      if (nftsForOwnerMumbai.totalCount !== 0)
        setnftsForOwnerMumbai(nftsForOwnerMumbai);
      if (nftsForOwnerSepolia.totalCount !== 0)
        setnftsForOwnerSepolia(nftsForOwnerSepolia);
      if (nftsForOwnerMainnet.totalCount !== 0)
        setnftsForOwnerMainnet(nftsForOwnerMainnet);
      if (nftsForOwnerPolygon.totalCount !== 0)
        setnftsForOwnerPolygon(nftsForOwnerPolygon);
    };
    getNFT();
  }, []);

  return (
    <div>
      <div className=" h-96 py-4 px-4 rounded-xl">
        <div className="grid grid-cols-8 py-2 border-b-2 border-gray-200 text-gray-400 text-left">
          <div className="col-span-2 pl-2">Items</div>
          <div>Floor price</div>
          <div>Best offer</div>
          <div>Listing price</div>
          <div>Token Type</div>
          <div>Network</div>
          <div></div>
        </div>

        {nftsForOwnerMumbai &&
          nftsForOwnerMumbai.ownedNfts.map((nftdetail, key) => {
            return (
              <NavLink to="/nftdetail/123">
                <div className="grid grid-cols-8 py-2 border-b-2 border-gray-200 group cursor-pointer text-left items-center">
                  <div className="col-span-2 pl-2 relative image  items-center">
                    <div className="flex items-center">
                      <img src={avtar} alt="NFT" className="h-10 w-10 m-2" />
                      {nftdetail.title === '' ? '#untitled' : nftdetail.title}
                    </div>
                    <div class="absolute left-0  mt-0 w-40 bg-gray-200 z-10 border border-gray-200 p-4 rounded-md shadow-lg h-40 hidden group-hover:block">
                      <img src={avtar} alt="NFT" className="h-fit " />
                    </div>
                  </div>
                  <div>-- -- </div>
                  <div>-- --</div>
                  <div>-- --</div>
                  <div>{nftdetail.contract.tokenType}</div>
                  <div>Polygon Mumbai</div>
                  <div className=" justify-center hidden group-hover:flex">
                    <span class="material-symbols-outlined text-center">
                      sell
                    </span>
                  </div>
                </div>
              </NavLink>
            );
          })}
        {nftsForOwnerSepolia &&
          nftsForOwnerSepolia.ownedNfts.map((nftdetail, key) => {
            return (
              <NavLink to="/nftdetail/123">
                <div className="grid grid-cols-8 py-2 border-b-2 border-gray-200 group cursor-pointer text-left items-center">
                  <div className="col-span-2 pl-2 relative image  items-center">
                    <div className="flex items-center">
                      <img src={''} alt="NFT" className="h-10 w-10 m-2" />
                      {nftdetail.title === '' ? '#untitled' : nftdetail.title}
                    </div>
                    <div class="absolute left-0  mt-0 w-40 bg-gray-200 z-10 border border-gray-200 p-4 rounded-md shadow-lg h-40 hidden group-hover:block">
                      <img src={avtar} alt="NFT" className="h-fit " />
                    </div>
                  </div>
                  <div>-- -- </div>
                  <div>-- --</div>
                  <div>-- --</div>
                  <div>{nftdetail.contract.tokenType}</div>
                  <div>Sepolia</div>
                  <div className=" justify-center hidden group-hover:flex">
                    <span class="material-symbols-outlined text-center">
                      sell
                    </span>
                  </div>
                </div>
              </NavLink>
            );
          })}
        {nftsForOwnerMainnet &&
          nftsForOwnerMainnet.ownedNfts.map((nftdetail, key) => {
            return (
              <NavLink to="/nftdetail/123">
                <div className="grid grid-cols-8 py-2 border-b-2 border-gray-200 group cursor-pointer text-left items-center">
                  <div className="col-span-2 pl-2 relative image  items-center">
                    <div className="flex items-center">
                      <img src={''} alt="NFT" className="h-10 w-10 m-2" />
                      {nftdetail.title === '' ? '#untitled' : nftdetail.title}
                    </div>
                    <div class="absolute left-0  mt-0 w-40 bg-gray-200 z-10 border border-gray-200 p-4 rounded-md shadow-lg h-40 hidden group-hover:block">
                      <img src={avtar} alt="NFT" className="h-fit " />
                    </div>
                  </div>
                  <div>-- -- </div>
                  <div>-- --</div>
                  <div>-- --</div>
                  <div>{nftdetail.contract.tokenType}</div>
                  <div>{nftsForOwnerMainnet.network}</div>
                  <div className=" justify-center hidden group-hover:flex">
                    <span class="material-symbols-outlined text-center">
                      sell
                    </span>
                  </div>
                </div>
              </NavLink>
            );
          })}
        {nftsForOwnerPolygon &&
          nftsForOwnerPolygon.ownedNfts.map((nftdetail, key) => {
            return (
              <NavLink to="/nftdetail/123">
                <div className="grid grid-cols-8 py-2 border-b-2 border-gray-200 group cursor-pointer text-left items-center">
                  <div className="col-span-2 pl-2 relative image  items-center">
                    <div className="flex items-center">
                      <img src={''} alt="NFT" className="h-10 w-10 m-2" />
                      {nftdetail.title === '' ? '#untitled' : nftdetail.title}
                    </div>
                    <div class="absolute left-0  mt-0 w-40 bg-gray-200 z-10 border border-gray-200 p-4 rounded-md shadow-lg h-40 hidden group-hover:block">
                      <img src={avtar} alt="NFT" className="h-fit " />
                    </div>
                  </div>
                  <div>-- -- </div>
                  <div>-- --</div>
                  <div>-- --</div>
                  <div>{nftdetail.contract.tokenType}</div>
                  <div>{nftsForOwnerPolygon.network}</div>
                  <div className=" justify-center hidden group-hover:flex">
                    <span class="material-symbols-outlined text-center">
                      sell
                    </span>
                  </div>
                </div>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default Collected;
