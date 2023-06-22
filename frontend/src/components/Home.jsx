import React, { useEffect, useState } from 'react';
import cover from '../../src/images/cover.jpg';
import polygon from '../../src/images/polygon.png';

import eth from '../../src/images/eth.png';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [nft, setNft] = useState();
  useEffect(() => {
    const fetchNft = async () => {
      const nft = await fetch(`http://localhost:5000/fetchNft`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await nft.json();
      setNft(response);
    };
    fetchNft();
  }, []);

  return (
    <div>
      <div className=" w-full h-fit mt-4 flex flex-col gap-5 sm:px-8 md:px-10 lg:px-16 px-4">
        <div className="rounded-xl w-full my-6 ">
          <img
            src={cover}
            className="w-screen object-cover h-96 rounded-3xl mt-4"
            alt="img"
          />
        </div>

        <div className="text-left m-2">
          <p className="text-lg">ALL NFT COllection </p>
        </div>
        <div className="grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {nft &&
            nft.map((item, key) => {
              return (
                <NavLink
                  index={key}
                  to={{
                    pathname: `/nftdetail/${item.nftContractAddress}/${item.tokenId}`,
                  }}
                >
                  <div className="transition-transform duration-300 transform-gpu hover:scale-110 text-gray-600 hover:text-gray-800 drop-shadow-xl  hover:drop-shadow-2xl my-4 rounded-3xl h-fit p-6 transition-all duration-300 bg-gray-50 flex flex-col justify-between">
                    <div className=" h-fit rounded-xl justify-center flex">
                      <img
                        src={item.nftJsonData.rawMetadata.image}
                        alt="img"
                        className="rounded-t-xl h-56 self-center"
                      />
                      {/* this is image area */}
                    </div>
                    <div className="flex justify-between my-2 items-center">
                      <p className="text-xl">
                        {item.nftJsonData.rawMetadata.name}
                      </p>
                      <p className="text-xl">
                        {parseFloat(item.listingPrice)}
                        <br />
                        {item.network == 80001 ? ' MATIC' : ' ETH'}
                      </p>
                    </div>
                  </div>
                </NavLink>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
