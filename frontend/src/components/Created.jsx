import React, { useEffect, useState } from 'react';
import avatr from '../images/avatr.png';
import { NavLink } from 'react-router-dom';
import { useAccount } from 'wagmi';
import eth from '../images/Ether.png'
import polygon from '../images/polygon.png'

const Created = () => {
  const accsessToken = localStorage.getItem('ArtNovaJwt');
  const [nftData, setnftData] = useState(null);
  const { address } = useAccount();
  useEffect(() => {
    const fetchingNFT = async () => {
      const getnfts = await fetch(
        `http://localhost:5000/fetchCreated/${address}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accsessToken}`,
          },
        },
      );
      const nfts = await getnfts.json();
      setnftData(nfts);
    };
    fetchingNFT();
  }, []);
  return (
    <div>
      <div className="p-4 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {nftData &&
          nftData.map((nftdetail, key) => {
            return (
             
              <NavLink
                index={key}
                to={{
                  pathname: `/nftdetail/${nftdetail.nftContractAddress}/${nftdetail.tokenId}`,
                }}
              >
                <div className="overflow-hidden h-full  flex flex-col justify-end  rounded-3xl shadow-[rgba(0,_0,_0,_0.16)_0px_1px_4px] hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                  <img
                    src={
                      nftdetail?.nftJsonData.rawMetadata.image.includes('ipfs')
                        ? `https://ipfs.io/ipfs/` +
                          nftdetail?.nftJsonData.rawMetadata.image.match(
                            /(ipfs:\/\/|\/ipfs\/)([^/]+)$/,
                          )[2]
                        : nftdetail?.nftJsonData.rawMetadata.image
                    }
                    alt=" "
                    className="object-cover transition-transform duration-300 transform-gpu hover:scale-110 rounded-t-xl "
                  />

                  <div className="overflow-hidden z-10 bg-slate-50 h-12 flex items-center px-4 justify-between rounded-b-xl">
                    <p>
                    {nftdetail?.nftJsonData.rawMetadata.name}
                    </p>
                    <img src={nftdetail.network==80001 || nftdetail.network==137 ? polygon : eth} alt='network' className='h-6' />
                  </div>
                </div>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default Created;
