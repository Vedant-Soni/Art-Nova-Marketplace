import React, { useContext, useEffect } from 'react';
import { AppContext } from '../App';
//images
import MetaMask from '../images/MetaMask.png';
import TrustWallet from '../images/TrustWallet.png';
import CoinbaseWallet from '../images/coinbase.png';
//MUI component
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
//Wagmi
import { useConnect, useAccount } from 'wagmi';
import { ethers } from 'ethers';

const WalletConnect = () => {
  const { walletopen, setWalletOpen } = useContext(AppContext);
  //Wagmi wallet connection
  const { connectors, connect } = useConnect();
  const { address, connector, isConnected, status } = useAccount();
  //MUI constant
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setWalletOpen(true);
  };
  const handleClose = () => {
    setWalletOpen(false);
  };

  useEffect(() => {
    if (isConnected) {
      console.log('yes it is working ');
      handleWalletConnect();
    } else {
      console.log('isConnect is not true');
    }
    console.log('inside useeffect : ', isConnected);
  }, [isConnected]);

  function connectWallet() {
    const connectrespo = connect({
      connector: connectors[0],
    });
  }

  const handleWalletConnect = async () => {
    try {
      console.log(address);
      if (isConnected) {
        //check for address is in table or not : null or object
        const checkLoginDetail = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json ;charset=utf-8',
          },
          body: JSON.stringify({ address: address }),
        });
        const loginStatus = await checkLoginDetail.json();
        console.log('this is loginStatus', loginStatus);

        if (loginStatus == null) {
          try {
            //generate random number
            const randomNumber =
              Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

            //add address and random number as nounce in databse
            const createlogin = await fetch('http://localhost:5000/newLogin', {
              headers: {
                'Content-Type': 'application/json ;charset=utf-8',
              },
              method: 'POST',
              body: JSON.stringify({
                address: address,
                nounce: randomNumber,
              }),
            });

            //GET inserted data as response
            const createdUserData = await createlogin.json();
            console.log(
              'after creating data in table return it : ',
              createdUserData,
            );

            //make msg object and sign it with metamask
            const message = JSON.stringify({
              address: createdUserData.address,
              nounce: createdUserData.nounce,
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const signature = await signer.signMessage(message);

            //send signature to backend and verify user
            const authenticate = await fetch(
              'http://localhost:5000/authenticate',
              {
                headers: {
                  'Content-Type': 'application/json ;charset=utf-8',
                },
                method: 'POST',
                body: JSON.stringify({
                  address: address,
                  signature: signature,
                  message: message,
                }),
              },
            );
            const status = await authenticate.json();
            console.log('signature verification status : ', status);

            if (status) {
              console.log(process.env.REACT_APP_JWT_SECRET_KEY);
              //generate jwt token
              const accsesstoken = await fetch(
                'http://localhost:5000/jwtauth',
                {
                  headers: {
                    'Content-Type': 'application/json ;charset=utf-8',
                  },
                  method: 'POST',
                  body: JSON.stringify({
                    account: address,
                  }),
                },
              );

              const jwt = await accsesstoken.json();
              console.log('this is jwt token :', jwt.accsessToken);
              localStorage.setItem('ArtNovaJwt', jwt.accsessToken);
            } else {
              //toast
              console.log('error');
            }
          } catch (e) {
            //toast
            console.log(e);
          }
        } else {
          try {
            //verify jwt
            const accsessToken = localStorage.getItem('ArtNovaJwt');
            const verifyStatus = await fetch(
              'http://localhost:5000/verifyJWT',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json ;charset=utf-8',
                  Authorization: `Bearer ${accsessToken}`,
                },
              },
            );

            const verifyResult = await verifyStatus.json();
            const verify = verifyResult.verify;
            console.log(verify);
            if (!verify) {
              console.log('inside false block');

              //get user address and nounce from backend
              const userDetail = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json ;charset=utf-8',
                },
                body: JSON.stringify({ address: address }),
              });
              const userDetailObject = await userDetail.json();
              const { address, nounce } = userDetailObject;
              console.log('new data', address, nounce);

              //sign message drom frontend using metamask
              const message = JSON.stringify({
                address: address,
                nounce: nounce,
              });
              const provider = new ethers.providers.Web3Provider(
                window.ethereum,
              );
              const signer = provider.getSigner();
              const signature = await signer.signMessage(message);

              //authenticate user signature by sending it to backend
              const authenticate = await fetch(
                'http://localhost:5000/authenticate',
                {
                  headers: {
                    'Content-Type': 'application/json ;charset=utf-8',
                  },
                  // mode: 'no-cors',
                  method: 'POST',
                  body: JSON.stringify({
                    address: address,
                    signature: signature,
                    message: message,
                  }),
                },
              );

              const status = await authenticate.json();
              if (status) {
                //generate jwt token
                const accsesstoken = await fetch(
                  'http://localhost:5000/jwtauth',
                  {
                    headers: {
                      'Content-Type': 'application/json ;charset=utf-8',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                      secretkey: process.env.REACT_APP_JWT_SECRET_KEY,
                      account: address,
                    }),
                  },
                );

                const jwt = await accsesstoken.json();
                console.log(jwt.accsessToken);
                localStorage.setItem('ArtNovaJwt', jwt.accsessToken);
              } else {
                //toast
                console.log('error');
              }
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        console.log('wallet not connected');
      }
    } catch (e) {
      console.log('JWT Token generation error : ', e);
    } finally {
      handleClose();
    }
  };

  return (
    <div>
      <DialogTitle id="responsive-dialog-title">
        <p className="font-semibold text-2xl">Connect Wallet</p>
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col cursor-pointer ">
          <div
            className="h-16 border bg-gray-100 m-2 p-2 rounded-xl flex items-center hover:bg-gray-300 transition-all duration-300  "
            onClick={() => {
              connectWallet();
            }}
          >
            <img src={MetaMask} alt="wallet" className="h-full mx-6" />
            <p className="text-xl mx-8 font-medium text-gray-800">
              Metamask Wallet{' '}
            </p>
          </div>
          <div
            className="h-16 border bg-gray-100 m-2 p-2 rounded-xl flex items-center hover:bg-gray-300 transition-all duration-300"
            onClick={async () => {
              // connect({ connector: connectors[0] });
              connectWallet();
            }}
          >
            <img src={TrustWallet} alt="wallet" className="h-full mx-6" />
            <p className="text-xl mx-8 font-medium text-gray-800">
              Trust Wallet{' '}
            </p>
          </div>
          <div
            className="h-16 border bg-gray-100 hover:bg-gray-300 transition-all duration-300 m-2 p-2 rounded-xl flex items-center "
            onClick={() => {
              connectWallet();
            }}
          >
            <img src={CoinbaseWallet} alt="wallet" className="h-full mx-6" />
            <p className="text-xl mx-8 font-medium text-gray-800">
              Coinbase Wallet{' '}
            </p>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </div>
  );
};

export default WalletConnect;
