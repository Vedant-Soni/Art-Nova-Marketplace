import { ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAccount, useSigner } from 'wagmi';
import { ABI1155 } from '../ABI1155';
import Buy from './1155/Buy';
import Sell from './1155/Sell';
import Buy721 from './721/Buy721';
import Description from './Description';

const NftDetail = () => {
  const { address, id } = useParams();
  const { address: walletAddress } = useAccount();
  const [historyDropdown, setHistoryDropdown] = useState(false);
  const [listDropdown, setListDropdown] = useState(false);
  const [offerDropdown, setOfferDropdown] = useState(false);
  const [amount1155, setAmount1155] = useState(10);
  const [component, setComponent] = useState('Sell');
  const [totalSupply1155, setTotalSupply] = useState(10000);
  const [nftData, setNftData] = useState();
  const { data: walletClient } = useSigner();
  const [imageSrc, setImageSrc] = useState(
    'https://cdn3.iconfinder.com/data/icons/nft/64/nft_non_fungible_token_blockchain_sign_coin-512.png',
  );

  // const [totalListed, settotalListed] = useState();
  const [offerAmount, setOfferAmount] = useState(0);
  const [offererAddress, setOfferer] = useState(
    '0x00000000000000000000000000000000000',
  );
  const offerData = false;

  const [flag, setFlag] = useState(0);
  console.log('hii');
  const networks = {
    1: 'ETH Mainnet',
    11155111: 'ETH Sepolia',
    80001: 'MATIC Mumbai',
    137: 'MATIC Mainnet',
  };
  useEffect(() => {
    const fetchData = async () => {
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
        // console.log(getnftData.nft.balance);
        console.log(getnftData.nft);
        const contract = new ethers.Contract(address, ABI1155, walletClient);
        // const balance = await contract.balanceOf(walletAddress, id); commet by vivek
        // setAmount1155(balance);
      } catch (error) {
        console.log(error);
      }
      // setNftData(response);
    };
    if (walletClient) {
      fetchData();
    }
  }, [address, id, flag, walletAddress, walletClient]);

  window.ethereum.on('accountsChanged', (accounts) => {
    setFlag(flag + 1);
    if (accounts.length === 0) {
    }
  });
  const fetchImage = async () => {
    try {
      const response = await fetch(
        nftData && nftData.nftJsonData.rawMetadata.image
          ? nftData.nftJsonData.rawMetadata.image
          : 'https://cdn3.iconfinder.com/data/icons/nft/64/nft_non_fungible_token_blockchain_sign_coin-512.png',
      );
      if (response.ok) {
        setImageSrc(response.url);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchImage();
  const totalListed = nftData?.totalListed;
  const availableToList = nftData?.availableForListing || amount1155;
  const tokenStandard = nftData?.nftJsonData.tokenType;
  const priceOfToken = nftData?.listingPrice;
  const chainCrypto = networks[nftData?.network];
  const chainId = nftData?.network;
  const ownerOfNft = nftData?.nftOwnerAddress;
  const buyLimit = totalSupply1155 - amount1155;
  console.log(buyLimit);
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
              <img src={imageSrc} alt="NFT" className="rounded-xl w-full " />
            </div>
          </div>

          {/* details */}
          <div className=" h-fit w-full rounded-xl my-4">
            {nftData && <Description nftdata={nftData} />}
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
              <p className="text-base text-left my-4">
                Owned by {ownerOfNft === walletAddress ? 'You' : ownerOfNft}{' '}
              </p>{' '}
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
                  <div>You own {amount1155.toString()}</div>
                </div>
                <div className="border-t border-gray-300">
                  {component === 'Buy' ? (
                    <Buy total1155={{ totalListed, nftData }} />
                  ) : component === 'Sell' ? (
                    <Sell own1155={{ availableToList, nftData }} />
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
                      {parseFloat(priceOfToken)} {chainCrypto}
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
              <div className="w-full h-48 border-t  border-gray-300">
                {!offerData ? (
                  <p className="m-4 text-gray-400">No Offer Yet..!</p>
                ) : (
                  <div className="p-6 flex justify-between text-lg border-b items-center mx-4 border-gray-200 text-left">
                    <p>
                      Amount : {offerAmount}{' '}
                      {chainId === 80001 || chainId === 137 ? 'Matic' : 'ETH'}
                    </p>
                    <p>By : {offererAddress}</p>
                    <button className="bg-blue-400 text-white rounded-xl p-2 hover:bg-blue-500">
                      Accept
                    </button>
                  </div>
                )}
              </div>
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
