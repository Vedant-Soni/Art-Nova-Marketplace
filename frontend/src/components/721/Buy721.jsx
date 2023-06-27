import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createListing } from '../../createOrder';
import { useAccount, useConnect, useEnsName, useSigner } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { fulfillorder } from '../../fulfillOrder';
import { cancelOrder } from '../../cancelOrder';
import { createOffer } from '../../createOffer';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { ThreeDots } from 'react-loader-spinner';

import { useNetwork, useSwitchNetwork } from 'wagmi';

import { AppContext } from '../../App';
import WalletConnect from '../WalletConnect';
const Buy721 = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { walletopen, setWalletOpen } = useContext(AppContext);
  const { isSuccess, switchNetwork } = useSwitchNetwork();
  const [open, setOpen] = React.useState(false);
  const [offerAmount, setOfferAmount] = useState(0);
  const [listingValue, setListingValue] = useState(0);
  const [walletAddress, setWalletAddress] = useState('0x00');
  const { address, connector, isConnected } = useAccount();
  const [flag, setFlag] = useState(0);
  const { data: walletClient } = useSigner();
  const [loading, setLoading] = useState(false);
  //by vivek chain change
  window.ethereum.on('accountsChanged', (accounts) => {
    setFlag(flag + 1);
    if (accounts.length === 0) {
    }
  });
  const handleCloseWallet = () => {
    setWalletOpen(false);
  };
  const handlewalletOpen = () => {
    setWalletOpen(true);
  };
  const handleBuyNow = async () => {
    handleClickOpen();
    try {
      setLoading(true);
      const nftContract = props.nftData?.nftJsonData.contract.address;
      const tokenId = props.nftData?.tokenId;
      console.log(nftContract, tokenId);
      const response = await fetch(
        `http://localhost:5000/getOrder/${nftContract}/${tokenId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const order = await response.json();
      const nftPurchase = await fulfillorder({
        order,
        fulfiller: address,
        signer: walletClient,
      });
      if (nftPurchase) {
        const updatedData = { nftOwner: address, nftContract, tokenId };
        await fetch(`http://localhost:5000/orderfulfill`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        console.log('Success');
      }
      console.log('Finallyyyyyyyy:----');
    } catch (e) {
      console.log('Buy now error:', e);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // confirm listing
  const handleListItem = async () => {
    const networkChangetx = switchNetwork(props.nftData.network); //network switch handled
    console.log(isSuccess, ' :after listing after network switch req');
    console.log('signer', walletClient);
    isConnected ? setWalletAddress(address) : console.log('need to connect');
    console.log(listingValue); //listing value accsessible here
    const nftOwner = props.nftData?.nftOwnerAddress;
    const nftContract = props.nftData?.nftJsonData.contract.address;
    const tokenId = props.nftData?.tokenId;
    try {
      setLoading(true);
      const order = await createListing({
        price: listingValue,
        tokenAddress: nftContract,
        signer: walletClient,
        tokenId,
        offerer: address,
      });

      console.log('Order:- ------', order);
      if (order) {
        const listedNftData = {
          nftOwner,
          nftContract,
          tokenId,
          order,
          listprice: listingValue,
        };
        const response = await fetch(`http://localhost:5000/list721`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(listedNftData),
        });
        const responseData = await response.json();
        console.log(responseData);
      }

      console.log('Here');
    } catch (e) {
      console.log('Listing error: ', e);
    } finally {
      setLoading(false);
      handleClose();
    }
    // window.location.reload();
  };
  //cancel list
  const handleCancelList = async () => {
    //code logic and wait is here
    try {
      setLoading(true);
      const nftContract = props.nftData?.nftJsonData.contract.address;
      const tokenId = props.nftData?.tokenId;
      console.log(nftContract, tokenId);
      const response = await fetch(
        `http://localhost:5000/getOrder/${nftContract}/${tokenId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const order = await response.json();
      console.log(order);
      const cancel = await cancelOrder({
        order,
        offerer: address,
        signer: walletClient,
      });
      await cancel.wait();
      console.log(cancel);
      if (cancel) {
        const params = { nftContract, tokenId };
        const updateDB = await fetch(`http://localhost:5000/cancelOrder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
        const message = await updateDB.json();
        console.log(message);
      }
    } catch (e) {
      console.log('cancel list error : ', e);
    } finally {
      setLoading(false);
      handleClose();
    }
  };
  const handleMakeOffer = async () => {
    try {
      setLoading(true);

      console.log(offerAmount);
      console.log('signer', walletClient);
      isConnected ? setWalletAddress(address) : console.log('need to connect');

      const nftOwner = props.nftData?.nftOwnerAddress;
      const nftContract = props.nftData?.nftJsonData.contract.address;
      const tokenId = props.nftData?.tokenId;
      const offer = await createOffer({
        price: offerAmount,
        tokenAddress: nftContract,
        signer: walletClient,
        tokenId,
        offerer: address,
      });
      const params = {
        nftOwner,
        nftContract,
        tokenId,
        offer,
        offerAmount,
        offerer: address,
      };
      if (offer) {
        const dbUpdate = await fetch(`http://localhost:5000/createOffer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });
        console.log(dbUpdate);
      }

      // console.log(props.nftData.network);
    } catch (e) {
      console.log('Make offer error :', e);
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const listed = props.nftData?.isListed;
  const userAddress = address;
  return (
    <div>
      <div className="grid grid-cols-2 p-6 text-center ">
        {props.nftData?.nftOwnerAddress === userAddress && listed === true ? (
          <>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center ">
              <button
                className="flex justify-center gap-4 h-full w-full text-blue-500 border  transition-all duration-300  hover:bg-blue-600 hover:text-white border-gray-300 text-xl p-4 rounded-xl"
                onClick={() => {
                  // handleCancelList();
                  handleClickOpen();
                }}
              >
                Cancel list
              </button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Are you sure to cancel listing ?
                </DialogTitle>
                <DialogContent>
                  <div className="text-center  flex flex-col">
                    {/* <img
                      src={props.nftData.nftJsonData.tokenUri.raw}
                      alt="image"
                      className="border border-gray-200 rounded-xl p-4"
                    /> */}
                    <div className="flex justify-between">
                      <p>Name</p>
                      <p>Price</p>
                    </div>
                  </div>
                </DialogContent>
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
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      variant="contained"
                      onClick={handleCancelList}
                      autoFocus
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                )}
              </Dialog>
            </div>
          </>
        ) : props.nftData?.nftOwnerAddress === userAddress &&
          listed === false ? (
          <>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center">
              <button
                className="flex justify-center gap-4 h-full w-full text-white border bg-blue-400 transition-all duration-300 hover:bg-blue-600 border-gray-300 text-xl p-4 rounded-xl"
                onClick={async () => {
                  handleClickOpen();
                }}
              >
                List item
              </button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Amount</DialogTitle>
                <DialogContent>
                  <div className="text-center  flex flex-col">
                    {/* <img
                      src={props.nftData.nftJsonData.tokenUri.raw}
                      alt="image"
                      className="border border-gray-200 rounded-xl p-4"
                    /> */}
                    <div className="flex justify-between">
                      <p>{props.nftData.nftJsonData.title}</p>
                    </div>
                  </div>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Value of NFT"
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={(event) => {
                      setListingValue(event.target.value);
                    }}
                  />
                </DialogContent>
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
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      onClick={() => handleListItem()}
                      variant="contained"
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                )}
              </Dialog>
            </div>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center "></div>
          </>
        ) : props.nftData?.nftOwnerAddress !== userAddress &&
          listed === true ? (
          <>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center">
              <button
                className="flex justify-center gap-4 h-full w-full text-white border bg-blue-400 hover:bg-blue-600 transition-all duration-300  border-gray-300 text-xl p-4 rounded-xl"
                onClick={() => {
                  isConnected ? handleBuyNow() : handlewalletOpen();
                }}
              >
                Buy now
              </button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>NFT Detail</DialogTitle>
                <DialogContent>
                  <div className="text-center  flex flex-col">
                    <img
                      src={props.nftData.nftJsonData.tokenUri.raw}
                      alt="image"
                      className="border border-gray-200 rounded-xl p-4"
                    />
                    <div className="flex justify-between">
                      <p>{props.nftData.nftJsonData.title}</p>
                      <p>{props.nftData?.listingPrice}</p>
                    </div>
                  </div>
                </DialogContent>
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
                  <DialogActions></DialogActions>
                )}
              </Dialog>
              <Dialog
                fullScreen={fullScreen}
                open={walletopen}
                onClose={handleCloseWallet}
                aria-labelledby="responsive-dialog-title"
              >
                <WalletConnect />
              </Dialog>
            </div>
          </>
        ) : props.nftData?.nftOwnerAddress !== userAddress &&
          listed === false ? (
          <>
            <div className="flex gap-6 text-2xl h-full w-full p-4 px-8 rounded-xl text-center">
              <button
                className="flex justify-center gap-4 h-full w-full text-white border bg-blue-400 transition-all duration-300 hover:bg-blue-600 border-gray-300 text-xl p-4 rounded-xl"
                onClick={() => {
                  // setAmountPopup(true);
                  // setPopupOption(3);
                  handleClickOpen();
                }}
              >
                Make Offer
              </button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Amount</DialogTitle>
                <DialogContent>
                  <div className="text-center  flex flex-col">
                    <img
                      src={props.nftData.nftJsonData.tokenUri.raw}
                      alt="image"
                      className="border border-gray-200 rounded-xl p-4"
                    />
                    <div className="flex justify-between">
                      <p>{props.nftData.nftJsonData.title}</p>
                    </div>
                  </div>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Value of NFT"
                    type="number"
                    fullWidth
                    variant="standard"
                    onChange={(event) => {
                      setOfferAmount(event.target.value);
                    }}
                  />
                </DialogContent>

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
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      onClick={() => handleMakeOffer()}
                      variant="contained"
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                )}
              </Dialog>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Buy721;
