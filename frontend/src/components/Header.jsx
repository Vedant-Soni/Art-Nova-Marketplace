import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import openseaLogo from '../images/openseaLogo.png';
//Styling

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [profileDropdown, setDropdown] = useState(false);
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
        <div className="sm:px-8 md:px-10 lg:px-16 border-b border-gray-200 px-4 h-full bg-white py-3.5">
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
                  <div className="lg:flex hidden text-gray-700 cursor-pointer">
                    <span class="mx-2 material-symbols-outlined">wallet</span>
                    <p className="px-2">Connect Wallet</p>
                  </div>
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
                          <NavLink to="/profile">
                            <p class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                              Profile
                            </p>
                          </NavLink>
                          <NavLink to="/create">
                            <p
                              class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                              href="#"
                            >
                              Create
                            </p>
                          </NavLink>
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
