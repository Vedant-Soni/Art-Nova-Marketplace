import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
//images
import cover from '../../src/images/cover.jpg';
import polygon from '../../src/images/polygon.png';
import ether from '../../src/images/Ether.png';
import DefaultNFT from '../images/DefaultNFT.png';

const Home = () => {
  const accsessToken = localStorage.getItem('ArtNovaJwt');
  const [nft, setNft] = useState();
  const [allNftData, setAllNft] = useState();
  useEffect(() => {
    const fetchNft = async () => {
      try {
        const nft = await fetch(`http://localhost:5000/fetchNft`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accsessToken}`,
          },
        });
        const response = await nft.json();
        setNft(response);

        const allNft = await fetch('http://localhost:5000/allcollection', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const responseAllNftdata = await allNft.json();
        setAllNft(responseAllNftdata.nftData);
      } catch (e) {
        console.log('fetch NFT on homepage error:', e);
      }
    };
    fetchNft();
  }, []);

  return (
    <div>
      <div className=" w-full h-fit mt-4 flex flex-col gap-5 ">
        {/* <div className=" w-full   absolute  filter blur-xl h-128 -z-10 ">
          <img src={cover} className="w-screen object-cover h-96 " alt="img" />
        </div> */}
        <div className="rounded-xl w-full pt-16  my-6 h-full sm:px-8 md:px-10 lg:px-16 px-4  ">
          <img
            src={cover}
            className="w-screen object-cover h-96 rounded-3xl mt-4 "
            alt="img"
          />
        </div>
        <div className="sm:px-8 md:px-10 lg:px-16 px-4">
          <div className="text-left m-2 ">
            <p className="text-3xl font-semibold text-gray-700">Listed NFT </p>
          </div>
          {/* loop all listed nft */}
          <div className="grid xl:grid-cols-5 lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {nft ? (
              nft.map((item, key) => {
                return (
                  <div  index={key}>
                  <NavLink
                   
                    to={{
                      pathname: `/nftdetail/${item.nftContractAddress}/${item.tokenId}`,
                    }}
                  >
                    <div className=" transform-gpu h-96 hover:-translate-y-3 text-gray-600 hover:text-gray-800  drop-shadow-md hover:drop-shadow-2xl my-4 rounded-3xl p-6 transition-all duration-200 bg-gray-50 flex flex-col justify-between">
                      <div className=" h-fit rounded-xl justify-center overflow-hidden  flex">
                        <img
                          src={
                            item?.nftJsonData.rawMetadata.image
                              ? item?.nftJsonData.rawMetadata.image.includes(
                                  'ipfs://',
                                )
                                ? `https://ipfs.io/ipfs/` +
                                  item?.nftJsonData.rawMetadata.image.match(
                                    /ipfs:\/\/(.+)/,
                                  )[1]
                                : item?.nftJsonData.rawMetadata.image
                              : { DefaultNFT }
                          }
                          alt="img"
                          className="rounded-t-xl object-contain h-full self-center"
                        />
                        {/* this is image area */}
                      </div>
                      <div className="flex justify-between mt-2 items-center">
                        <p className="text-xl">
                          {item?.nftJsonData.rawMetadata.name.length > 15
                            ? item.nftJsonData.rawMetadata.name.slice(0, 15) +
                              '...'
                            : item.nftJsonData.rawMetadata.name}
                        </p>
                        <p className="text-lg flex ">
                          {parseFloat(item.listingPrice)}
                          {item.network === 80001 ? ' Matic' : ' ETH'}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-base flex items-center">
                          {item.network === 80001 ? (
                            <img
                              src={polygon}
                              alt="polygon"
                              className="h-4 mr-2"
                            />
                          ) : (
                            <img src={ether} alt="eth" className="h-4 mr-2" />
                          )}
                          {item.totalSupply > 1 ? ' ERC1155' : ' ERC721'}
                        </p>
                        {item.totalSupply > 1 && (
                          <p className="text-sm">Listed : {item.totalListed}</p>
                        )}
                      </div>
                    </div>
                    </NavLink>
                    </div>
                );
              })
            ) : (
              //default nft
              <div className=" transform-gpu hover:-translate-y-3 text-gray-600 hover:text-gray-800 drop-shadow-lg  hover:drop-shadow-2xl my-4 rounded-3xl h-fit p-6 transition-all duration-300 bg-gray-50 flex flex-col justify-between">
                <div className=" h-fit rounded-xl justify-center flex">
                  <img
                    src={DefaultNFT}
                    alt="img"
                    className="rounded-t-xl h-fit self-center"
                  />
                  {/* this is image area */}
                </div>
                <div className="flex justify-center my-2 items-center">
                  <p className="text-xl">No Listed NFT Yet </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* all collection NFT */}
        <div className="sm:px-8 md:px-10 lg:px-16 px-4">
          <div className="text-left m-2 ">
            <p className="text-3xl font-semibold text-gray-700">All NFT Collection </p>
          </div>
          {/* loop all nft */}
          <div className="grid xl:grid-cols-5  lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {allNftData ? (
              allNftData.map((item, key) => {
                return (
                  <div   index={key}>
                  <NavLink
                  
                    to={{
                      pathname: `/nftdetail/${item.nftContractAddress}/${item.tokenId}`,
                    }}
                  >
                    <div className=" transform-gpu h-96 hover:-translate-y-3 text-gray-600 hover:text-gray-800  drop-shadow-md hover:drop-shadow-2xl my-4 rounded-3xl p-6 transition-all duration-200 bg-gray-50 flex flex-col justify-between">
                      <div className=" h-fit rounded-xl justify-center overflow-hidden  flex">
                        <img
                          src={
                            item?.nftJsonData.rawMetadata.image
                              ? item?.nftJsonData.rawMetadata.image.includes(
                                  'ipfs://',
                                )
                                ? `https://ipfs.io/ipfs/` +
                                  item?.nftJsonData.rawMetadata.image.match(
                                    /ipfs:\/\/(.+)/,
                                  )[1]
                                : item?.nftJsonData.rawMetadata.image
                              : { DefaultNFT }
                          }
                          alt="img"
                          className="rounded-t-xl object-contain h-full self-center"
                        />
                        {/* this is image area */}
                      </div>
                      <div className="flex justify-between mt-2 items-center">
                        <p className="text-xl">
                          {item?.nftJsonData.rawMetadata.name.length > 15
                            ? item.nftJsonData.rawMetadata.name.slice(0, 15) +
                              '...'
                            : item.nftJsonData.rawMetadata.name}
                        </p>
                        <p className="text-sm">
                          {item.totalSupply > 1 && (
                            <p className="text-sm">
                              Supply : {item.totalSupply}
                            </p>
                          )}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-base flex items-center">
                          {item.network === 80001 ? (
                            <img
                              src={polygon}
                              alt="polygon"
                              className="h-4 mr-2"
                            />
                          ) : (
                            <img src={ether} alt="eth" className="h-4 mr-2" />
                          )}
                          {item.totalSupply > 1 ? 'ERC1155' : 'ERC721'}
                        </p>
                      </div>
                    </div>
                    </NavLink>
                    </div>
                );
              })
            ) : (
              //default nft
              <div className=" transform-gpu hover:-translate-y-3 text-gray-600 hover:text-gray-800 drop-shadow-xl  hover:drop-shadow-2xl my-4 rounded-3xl h-fit p-6 transition-all duration-300 bg-gray-50 flex flex-col justify-between">
                <div className=" h-fit rounded-xl justify-center flex">
                  <img
                    src={DefaultNFT}
                    alt="img"
                    className="rounded-t-xl h-fit self-center"
                  />
                  {/* this is image area */}
                </div>
                <div className="flex justify-between my-2 items-center">
                  <p className="text-xl">List NFT </p>
                  <p className="text-xl">Price</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
