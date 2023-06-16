import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import avtar from '../images/avatr.png';
import Buy from './1155/Buy';
import Sell from './1155/Sell';
import Buy721 from './721/Buy721';
import Description from './Description';

const NftDetail = () => {
  const { address, id } = useParams();
  const [historyDropdown, setHistoryDropdown] = useState(false);
  const [listDropdown, setListDropdown] = useState(false);
  const [offerDropdown, setOfferDropdown] = useState(false);
  const [amount1155, setAmount1155] = useState(10);
  const [component, setComponent] = useState('Sell');
  const [totalSupply1155, setTotalSupply] = useState(10);
  const [nftData, setNftData] = useState();
  console.log('hii');
  const networks = {
    1: 'Ethereum Mainnet',
    11155111: 'Sepolia',
    80001: 'Polygon Mumbai',
    137: 'Polygon Mainnet',
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log('hiii');
      try {
        const response = await fetch(
          `http://localhost:5000/detailsPage/${address}/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const getnftData = await response.json();
        setNftData(getnftData.nft);
        console.log(getnftData);
      } catch (error) {
        console.log(error);
      }
      // setNftData(response);
    };
    fetchData();
  }, [address, id]);

  const tokenStandard = nftData?.nftJsonData.tokenType;
  const priceOfToken = 0.04;
  const chainCrypto = 'ETH';
  const chainCryptoPrice = 1243;
  const chainId = nftData?.network;
  const ownerOfNft = nftData?.nftOwnerAddress;
  return (
    <div>
      <div className="grid grid-cols-5 px-8">
        <div className=" p-4 w-full  col-span-2">
          <div className="border-2 border-gray-200 h-fit w-full rounded-xl">
            <div className="flex w-full justify-between p-2">
              {chainId === 80001 ? (
                <img
                  src=" https://w7.pngwing.com/pngs/659/334/png-transparent-polygon-matic-coin-cryptocoin-exchange-coins-crypto-blockchain-cryptocurrency-logo-glyph-icon-thumbnail.png"
                  alt="eth"
                  className="h-6"
                />
              ) : (
                <img
                  src="https://ethresear.ch/uploads/default/original/1X/bc9ee6d276a251519dd12dca7202a9e3658a7eb3.png"
                  alt="eth"
                  className="h-6"
                />
              )}
              <span class="material-symbols-outlined ">favorite</span>
            </div>
            <div className="p-8">
              <img
                src={
                  nftData
                    ? nftData.nftJsonData.rawMetadata.image
                      ? nftData.nftJsonData.rawMetadata.image
                      : 'https://cdn3.iconfinder.com/data/icons/nft/64/nft_non_fungible_token_blockchain_sign_coin-512.png'
                    : 'https://cdn3.iconfinder.com/data/icons/nft/64/nft_non_fungible_token_blockchain_sign_coin-512.png'
                }
                alt="NFT"
                className="rounded-xl w-full "
              />
            </div>
          </div>

          {/* details */}
          <div className=" h-full w-full rounded-xl my-4">
            <Description c_id={123} />
          </div>
        </div>

        <div className=" p-4 w-full h-fit col-span-3">
          <div className=" h-48 w-full rounded-xl">
            <div className="flex justify-between">
              <div>
                {nftData
                  ? nftData.nftJsonData.contract.name
                    ? nftData.nftJsonData.contract.name
                    : 'Untitled'
                  : 'Untitled'}
              </div>
              <div className="cursor-pointer">
                <span class="material-symbols-outlined m-2">send</span>
                <span class="material-symbols-outlined m-2">share</span>
                <span class="material-symbols-outlined m-2">more_horiz</span>
              </div>
            </div>

            {/* NFT name */}
            <div>
              <p className="text-4xl text-left my-2">
                {nftData
                  ? nftData.nftJsonData.title === ''
                    ? '#untitled'
                    : nftData.nftJsonData.title
                  : 'Untitled'}
              </p>
              <p className="text-base text-left my-4">Owned by You </p>{' '}
              {/* Fetch from DB */}
            </div>
          </div>

          {/* 1155 or 721 buy-sell option */}
          {tokenStandard === 'ERC1155' ? (
            <>
              {/* total supply of 1155 */}
              <div className=" h-fit w-full rounded-xl">
                <div className="flex justify-between text-center">
                  <div className="flex justify-between text-center">
                    <span class="material-symbols-outlined">view_module</span>
                    <p>{totalSupply1155} items</p>
                  </div>
                </div>
              </div>

              {/* 1155 buy-sell*/}
              <div className="border-2 border-gray-200 h-full w-full text-center rounded-xl my-4">
                <div className="flex justify-between px-6 pt-6 ">
                  <div className=" text-xl text-left flex gap-4">
                    <div className="h-fit flex  border-gray-300 text-gray-700 ">
                      <div
                        className={
                          component === 'Sell'
                            ? 'mx-4 cursor-pointer text-black border-b-2 border-black pb-3'
                            : 'mx-4  cursor-pointer'
                        }
                        onClick={() => {
                          setComponent('Sell');
                        }}
                      >
                        Sell
                      </div>
                      <div
                        className={
                          component === 'Buy'
                            ? 'mx-4  cursor-pointer text-black border-b-2 border-black pb-3'
                            : 'mx-4  cursor-pointer'
                        }
                        onClick={() => {
                          setComponent('Buy');
                        }}
                      >
                        Buy
                      </div>
                    </div>
                  </div>
                  <div>You own {amount1155}</div>
                </div>
                <div className="border-t border-gray-300">
                  {component === 'Buy' ? (
                    <Buy total1155={totalSupply1155} />
                  ) : component === 'Sell' ? (
                    <Sell own1155={amount1155} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          ) : tokenStandard === 'ERC721' ? (
            <>
              <div className="border-2 border-gray-200 h-full w-full text-center rounded-xl my-4">
                <div className="p-6 text-xl text-left flex justify-between  ">
                  <div className="flex gap-2 align-bottom">
                    <p className="text-3xl">
                      {priceOfToken} {chainCrypto}
                    </p>
                    <p className="text-sm text-gray-400 ">
                      $ {priceOfToken * chainCryptoPrice}USD
                    </p>
                  </div>
                </div>
                <div className="w-full h-fit border-t  border-gray-300">
                  <Buy721 nftData={nftData} />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Price History */}
          <div className="border-2 border-gray-200 h-full w-full text-center rounded-xl my-4">
            <div className="p-6 text-xl text-left flex justify-between  ">
              <div className="flex gap-2 ">
                <span class="material-symbols-outlined text-3xl">timeline</span>
                Price History
              </div>
              <span
                class="material-symbols-outlined cursor-pointer"
                onClick={() => {
                  setHistoryDropdown(!historyDropdown);
                }}
              >
                {!historyDropdown ? 'expand_more' : 'expand_less'}
              </span>
            </div>
            {historyDropdown ? (
              <div className="w-full h-48 border-t  border-gray-300"></div>
            ) : (
              <></>
            )}
          </div>

          {/* Listing */}
          <div className="border-2 border-gray-200 h-full w-full text-center rounded-xl my-4">
            <div className="p-6 text-xl text-left flex justify-between  ">
              <div className="flex gap-2 ">
                <span class="material-symbols-outlined text-3xl">sell</span>
                Listings
              </div>
              <span
                class="material-symbols-outlined cursor-pointer"
                onClick={() => {
                  setListDropdown(!listDropdown);
                }}
              >
                {!listDropdown ? 'expand_more' : 'expand_less'}
              </span>
            </div>
            {listDropdown ? (
              <div className="w-full h-48 border-t  border-gray-300"></div>
            ) : (
              <></>
            )}
          </div>

          {/* Offers */}
          <div className="border-2 border-gray-200 h-full w-full text-center rounded-xl my-4">
            <div className="p-6 text-xl text-left flex justify-between  ">
              <div className="flex gap-2 ">
                <span class="material-symbols-outlined text-3xl">list</span>
                Offers
              </div>
              <span
                class="material-symbols-outlined cursor-pointer"
                onClick={() => {
                  setOfferDropdown(!offerDropdown);
                }}
              >
                {!offerDropdown ? 'expand_more' : 'expand_less'}
              </span>
            </div>
            {offerDropdown ? (
              <div className="w-full h-48 border-t  border-gray-300"></div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftDetail;
