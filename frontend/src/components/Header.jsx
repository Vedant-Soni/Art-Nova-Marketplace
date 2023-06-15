import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import openseaLogo from '../images/openseaLogo.png';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Connector, useConnect } from 'wagmi';

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
//Styling

const Header = () => {
  const { connectors, connect } = useConnect();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [menuToggle, setMenuToggle] = useState(false);
  const [profileDropdown, setDropdown] = useState(false);

  //metamask connectors
  const { address, connector, isConnected } = useAccount();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {menuToggle ? (
        <div className="py-4 px-4 text-black h-screen">
          <div className="flex flex-col justify-between h-full">
            <div>
              <nav className=" flex lg:grid lg:grid-cols-3 justify-between">
                {/* logo and nav section  */}
                <div className="justify-self-start  flex items-center">
                  <div className="text-black pt-2 mr-3  md:hidden lg:hidden">
                    <button onClick={() => setMenuToggle(!menuToggle)}>
                      <span
                        class="material-symbols-outlined"
                        onClick={() => setMenuToggle(!menuToggle)}
                      >
                        close
                      </span>
                    </button>
                  </div>

                  <div className="h-10 w-10">
                    <img src={openseaLogo} alt="logo" className="h-fit w-fit" />
                  </div>
                  <div className="ml-2 text-black">
                    <p className="font-bold">OpenSea</p>
                  </div>
                </div>

                {/* Wallet and cart section  */}
                <div className="flex justify-self-end">
                  <div className=" bg-opacity-10 rounded-xl flex items-center bg-white bg-blur-xl text-white">
                    <div className="lg:flex hidden">
                      <span class="mx-2 material-symbols-outlined">wallet</span>
                      <p className="px-2">Connect Wallet</p>
                    </div>
                    <div className="border-solid border-white justify-end lg:border lg:border-y-0 lg:border-r-0 h-full hidden md:flex lg:flex items-center border-opacity-20 mx-2 px-4 ">
                      <span class="material-symbols-outlined">
                        account_circle
                      </span>
                    </div>
                    <div className="border-solid border-gray-400 border-2 text-black justify-end  h-full  rounded-xl flex items-center border-opacity-20 mx-2 px-2 ">
                      <span class="material-symbols-outlined">search</span>
                    </div>
                  </div>
                  <div className="border-solid border-gray-400 border-2 text-black justify-end  h-full  rounded-xl flex items-center border-opacity-20 mx-2 px-2">
                    <span class="material-symbols-outlined">shopping_cart</span>
                  </div>
                </div>
              </nav>
            </div>
            <div className="h-full py-6">
              <div className=" flex justify-start h-12 my-4 mx-4 text-xl font-bold items-center">
                <span class="material-symbols-outlined">edit</span>
                <p className="mx-4">menus</p>
              </div>
              <div className=" flex justify-start h-12 my-4 mx-4 text-xl font-bold items-center">
                <span class="material-symbols-outlined">edit</span>
                <p className="mx-4">menus</p>
              </div>
              <div className=" flex justify-start h-12 my-4 mx-4 text-xl font-bold items-center">
                <span class="material-symbols-outlined">edit</span>
                <p className="mx-4">menus</p>
              </div>
              <div className=" flex justify-start h-12 my-4 mx-4 text-xl font-bold items-center">
                <span class="material-symbols-outlined">edit</span>
                <p className="mx-4">menus</p>
              </div>
            </div>
            <div className="items-end">
              <button className="bg-blue-500 text-white rounded-xl h-12 text-xl w-full my-4">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:px-8 md:px-10 lg:px-16 border-b border-gray-200 px-4 h-fit bg-white py-3.5">
          <div>
            <nav className=" flex lg:grid lg:grid-cols-3 justify-between">
              {/* logo and nav section  */}
              <div className="justify-self-start  flex items-center">
                <div className="text-black pt-2 mx-2  md:hidden lg:hidden">
                  <button onClick={() => setMenuToggle(!menuToggle)}>
                    <span class="material-symbols-outlined">menu</span>
                  </button>
                </div>

                <div className="flex">
                  <NavLink to="/home" className="flex items-center">
                    <div className="h-10 w-10">
                      <img
                        src={openseaLogo}
                        alt="logo"
                        className="h-fit w-fit"
                      />
                    </div>
                    <div className="ml-2 text-white">
                      <p className="font-bold text-black">OpenSea</p>
                    </div>
                  </NavLink>
                </div>

                <div className="w-px h-8 mx-6 bg-gray-500"></div>
                <div className="lg:flex hidden">
                  <p className="mx-2 text-black">Drops</p>
                  <p className="mx-2 text-black">Stats</p>
                </div>
                <div></div>
              </div>

              {/* search bar section  */}
              <div className=" p-2 rounded-xl md:flex lg:flex items-center bg-white bg-opacity-10 bg-blur-xl hidden border-2 border-gray-400">
                <div className="mt-2 pr-2 text-gray-600">
                  <span class="material-symbols-outlined">search</span>
                </div>
                <input
                  className="bg-transparent border-0 outline-0 text-gray-600"
                  placeholder="Search items, collections, and accounts"
                />
              </div>

              {/* Wallet and cart section  */}
              <div className="flex justify-self-end">
                <div className=" bg-opacity-10 rounded-xl flex items-center bg-white bg-blur-xl border-2 border-gray-400">
                  <div
                    className="lg:flex hidden text-gray-700 cursor-pointer"
                    onClick={() => {
                      handleClickOpen();
                      console.log('connect');
                    }}
                  >
                    <span class="mx-2 material-symbols-outlined">wallet</span>
                    <p className="px-2">
                      {isConnected
                        ? address.slice(0, 6) + '...' + address.slice(-4)
                        : 'Connect Wallet'}
                    </p>
                  </div>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      Connect Wallet
                    </DialogTitle>
                    <DialogContent>
                      {isConnected ? (
                        <div>
                          <img src={ensAvatar} alt="ENS Avatar" />
                          <div>{address}</div>
                          <div>Connected to {connector.name}</div>
                          <button onClick={disconnect}>Disconnect</button>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-2">
                            <div
                              className="border border-gray-400 m-2 p-2 rounded-xl "
                              onClick={() => {
                                const connectrespo = connect({
                                  connector: connectors[0],
                                });
                                console.log(connectrespo);
                              }}
                            >
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                                alt="wallet"
                              />
                            </div>
                            <div
                              className="border border-gray-400 m-2 p-2 rounded-xl "
                              onClick={() => {
                                connect({ connector: connectors[0] });
                              }}
                            >
                              <img
                                src="data:image/png;base64,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"
                                alt="wallet"
                              />
                            </div>
                            <div
                              className="border border-gray-400 m-2 p-2 rounded-xl "
                              onClick={() => {
                                connect({ connector: connectors[0] });
                              }}
                            >
                              <img
                                src="data:image/png;base64,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"
                                alt="wallet"
                              />
                            </div>
                            <div
                              className="border border-gray-400 m-2 p-2 rounded-xl "
                              onClick={() => {
                                connect({ connector: connectors[0] });
                              }}
                            >
                              <img
                                src="https://trustwallet.com/assets/images/media/assets/vertical_blue.png"
                                alt="wallet"
                              />
                            </div>
                          </div>
                          {/* {connectors.map((connector) => (
                        <button
                          key={connector.id}
                          onClick={() => {
                            connect({ connector });
                          }}
                        >
                          {connector.name}
                        </button>
                      ))} */}
                        </>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                  </Dialog>
                  <div
                    onMouseOver={() => setDropdown(true)}
                    onMouseLeave={() => setDropdown(false)}
                    className="h-full"
                  >
                    <div className=" text-gray-600 border-solid border-gray-400 justify-end lg:border lg:border-y-0 lg:border-r-0 h-full hidden md:flex lg:flex items-center border-opacity-100 mx-2 px-4 cursor-pointer">
                      <span class="material-symbols-outlined">
                        account_circle
                      </span>
                    </div>

                    <div class="relative">
                      <div class="cursor-pointer"></div>
                      {profileDropdown ? (
                        <div class="absolute right-0 mt-0 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                          {isConnected ? (
                            <NavLink to="/profile">
                              <p class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Profile
                              </p>
                            </NavLink>
                          ) : (
                            <p
                              class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                              onClick={() => {
                                handleClickOpen();
                              }}
                            >
                              Profile
                            </p>
                          )}
                          {isConnected ? (
                            <NavLink to="/create">
                              <p class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                Create
                              </p>
                            </NavLink>
                          ) : (
                            <p
                              class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                              onClick={() => {
                                handleClickOpen();
                              }}
                            >
                              Create
                            </p>
                          )}
                          <p
                            class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                            href="#"
                          >
                            Option 3
                          </p>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  <div className="border-solid text-gray-600 border-gray-400 justify-end lg:border border-y-0 border-r-0 h-full lg:hidden md:hidden flex items-center border-opacity-20 mx-2 px-4 ">
                    <span class="material-symbols-outlined">search</span>
                  </div>
                </div>
                <div className="cursor-pointer ml-2 px-4 bg-opacity-10  text-gray-600 rounded-xl flex items-center bg-white bg-blur-xl border-2 border-gray-400">
                  <span class="material-symbols-outlined">shopping_cart</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
