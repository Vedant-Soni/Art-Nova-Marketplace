import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import { ThreeDots } from 'react-loader-spinner';
const Collected = () => {
  const [nftData, setNftData] = useState(null);
  const [walletAddress, setWalletAddress] = useState('0x00');
  const { address, connector, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    isConnected ? setWalletAddress(address) : console.log('needd to connect');
  }, []);

  const networks = {
    1: 'Ethereum Mainnet',
    11155111: 'Sepolia',
    80001: 'Polygon Mumbai',
    137: 'Polygon Mainnet',
  };
  // const [walletAddress, setWalletAddress] = useState('0x00');
  // const { address, connector, isConnected } = useAccount();

  useEffect(() => {
    const getNftData = async () => {
      try {
        setLoading(true);
        isConnected
          ? setWalletAddress(address)
          : console.log('need to connect');
        const response = await fetch(
          `http://localhost:5000/collections/${address}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const getnftData = await response.json();
        setNftData(getnftData.nftData);
        console.log('inside try block............');
        console.log(getnftData.nftData);
      } catch (error) {
        console.log('get Nft error', error);
      } finally {
        setLoading(false);
      }
    };
    getNftData();
  }, []);

  return (
    <div>
      <div className=" h-full py-4 pb-24 px-4 rounded-xl">
        <div className="grid grid-cols-8 py-2 border-b-2 border-gray-200 text-gray-400 text-left">
          <div className="col-span-2 pl-2">Items</div>
          <div>Floor price</div>
          <div>Best offer</div>
          <div>Listing price</div>
          <div>Cost</div>
          <div>Difference</div>
          <div></div>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#9DB2BF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        ) : (
          <>
            {nftData &&
              nftData.map((nftdetail, key) => {
                return (
                  <NavLink
                    to={{
                      pathname: `/nftdetail/${nftdetail.nftContractAddress}/${nftdetail.tokenId}`,
                    }}
                  >
                    <div className="grid grid-cols-8 py-2 border-b-2 border-gray-200 group cursor-pointer text-left items-center">
                      <div className="col-span-2 pl-2 relative image  items-center">
                        <div className="flex items-center">
                          <img
                            src={
                              nftdetail.nftJsonData.rawMetadata.image
                                ? nftdetail.nftJsonData.rawMetadata.image
                                : 'https://cdn3.iconfinder.com/data/icons/nft/64/nft_non_fungible_token_blockchain_sign_coin-512.png'
                            }
                            alt="NFT"
                            className="h-10 w-10 m-2"
                          />
                          {nftdetail.nftJsonData.title === ''
                            ? '#untitled'
                            : nftdetail.nftJsonData.title}
                        </div>
                        <div class="absolute left-0  mt-0 w-40 bg-gray-200 z-10 border border-gray-200 p-4 rounded-md shadow-lg h-40 hidden group-hover:block">
                          <img
                            src={
                              nftdetail.nftJsonData.rawMetadata.image
                                ? nftdetail.nftJsonData.rawMetadata.image
                                : 'https://cdn3.iconfinder.com/data/icons/nft/64/nft_non_fungible_token_blockchain_sign_coin-512.png'
                            }
                            alt="NFT"
                            className="h-fit "
                          />
                        </div>
                      </div>
                      <div>-- -- </div>
                      <div>-- --</div>
                      <div>-- --</div>
                      <div>{nftdetail.nftJsonData.contract.tokenType}</div>
                      <div>{networks[nftdetail.network]}</div>
                      <div className=" justify-center hidden group-hover:flex">
                        <span class="material-symbols-outlined text-center">
                          sell
                        </span>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Collected;
