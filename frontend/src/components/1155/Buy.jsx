import React, { useContext, useState } from 'react';
import { fulfillorder } from '../../fulfillOrder';
import { useAccount, useConnect, useEnsName, useSigner } from 'wagmi';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../../App';

const Buy = (props) => {
  //navigation
  const navigate = useNavigate();
  const accsessToken = localStorage.getItem('ArtNovaJwt');
  const { address, connector, isConnected } = useAccount();
  //wallet action

  const { walletopen, setWalletOpen } = useContext(AppContext);
  const handleCloseWallet = () => {
    setWalletOpen(false);
  };
  const handlewalletOpen = () => {
    setWalletOpen(true);
  };
  const { data: walletClient } = useSigner();
  const [tokenAmount, setTokenAmount] = useState(1);
  console.log(props.total1155.totalListed);

  function increase() {
    if (tokenAmount < props.total1155.totalListed) {
      setTokenAmount(tokenAmount + 1);
    }
  }

  function decrease() {
    if (tokenAmount > 1) {
      setTokenAmount(tokenAmount - 1);
    }
  }

  async function handleBuyer() {
    const nftContract = props.total1155.nftData?.nftJsonData.contract.address;
    const tokenId = props.total1155.nftData?.tokenId;
    const response = await fetch(
      `http://localhost:5000/getOrder/${nftContract}/${tokenId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accsessToken}`,
        },
      },
    );
    const order = await response.json();
    if (order) {
      const nftPurchase = await fulfillorder({
        order,
        fulfiller: address,
        signer: walletClient,
        unitsToFill: tokenAmount,
      });
      if (nftPurchase) {
        const updatedData = {
          nftOwner: props.total1155.nftData?.nftOwnerAddress,
          nftContract,
          tokenId,
          units: tokenAmount,
          newnftOwner: address,
        };
        await fetch(`http://localhost:5000/orderfulfill1155`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accsessToken}`,
          },
          body: JSON.stringify(updatedData),
        });
        console.log('Success');
        navigate('/profile');
      }
    }
  }

  const isButtonDisabled = props.total1155.totalListed < 1;

  return (
    <div>
      <div className="grid grid-cols-2 p-6 text-center ">
        <div className="mx-4">
          <button
            className="flex justify-center gap-4 h-full w-full text-blue-500 border border-gray-300 text-xl p-4 rounded-xl"
            disabled={isButtonDisabled}
            onClick={() => {
              isConnected ? handleBuyer() : handlewalletOpen();
            }}
          >
            <span className="material-symbols-outlined text-3xl">sell</span>
            Buy {tokenAmount} item
          </button>
        </div>
        <div className="flex gap-6 text-2xl h-full w-fit p-4 px-8 rounded-xl text-center border border-gray-300">
          <div className="cursor-pointer" onClick={() => decrease()}>
            -
          </div>
          <div>
            <p>{tokenAmount}</p>
          </div>
          <div className="cursor-pointer" onClick={() => increase()}>
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
