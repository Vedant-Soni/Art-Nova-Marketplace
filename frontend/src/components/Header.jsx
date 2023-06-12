import React, { useState } from 'react';
import openseaLogo from '../images/openseaLogo.png';
//Styling 


export const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <>
      {menuToggle
        ?
        <div className='py-4 px-4 text-black h-screen'>
          <div className='flex flex-col justify-between h-full' >
            <div>
              <nav className=' flex lg:grid lg:grid-cols-3 justify-between'>

                {/* logo and nav section  */}
                <div className='justify-self-start  flex items-center'>

                  <div className='text-black pt-2 mr-3  md:hidden lg:hidden' >
                    <button onClick={() => setMenuToggle(!menuToggle)}>

                      <span class="material-symbols-outlined" onClick={() => setMenuToggle(!menuToggle)}>
                        close
                      </span>
                    </button>
                  </div>

                  <div className='h-10 w-10'>
                    <img src={openseaLogo} alt="logo" className='h-fit w-fit' />
                  </div>
                  <div className='ml-2 text-black'>
                    <p className="font-bold">
                      OpenSea
                    </p>
                  </div>
                </div>



                {/* Wallet and cart section  */}
                <div className='flex justify-self-end'>
                  <div className=' bg-opacity-10 rounded-xl flex items-center bg-white bg-blur-xl text-white'>
                    <div className='lg:flex hidden'>
                      <span class="mx-2 material-symbols-outlined">
                        wallet
                      </span>
                      <p className='px-2'>Connect Wallet</p>
                    </div>
                    <div className='border-solid border-white justify-end lg:border lg:border-y-0 lg:border-r-0 h-full hidden md:flex lg:flex items-center border-opacity-20 mx-2 px-4 '>
                      <span class="material-symbols-outlined" >
                        account_circle
                      </span>
                    </div>
                    <div className='border-solid border-gray-400 border-2 text-black justify-end  h-full  rounded-xl flex items-center border-opacity-20 mx-2 px-2 '>
                      <span class="material-symbols-outlined" >
                        search
                      </span>
                    </div>
                  </div>
                  <div className='border-solid border-gray-400 border-2 text-black justify-end  h-full  rounded-xl flex items-center border-opacity-20 mx-2 px-2'>
                    <span class="material-symbols-outlined">
                      shopping_cart
                    </span>
                  </div>
                </div>

              </nav>
            </div>
            <div className='h-full py-6'>

              <div className=' flex justify-start h-12 my-4 mx-4 text-xl font-bold items-center'>
                <span class="material-symbols-outlined" >
                  edit
                </span><p className='mx-4'>menus</p>
              </div>
              <div className=' flex justify-start h-12 my-4 mx-4 text-xl font-bold items-center'>
                <span class="material-symbols-outlined" >
                  edit
                </span><p className='mx-4'>menus</p>
              </div>
              <div className=' flex justify-start h-12 my-4 mx-4 text-xl font-bold items-center'>
                <span class="material-symbols-outlined" >
                  edit
                </span><p className='mx-4'>menus</p>
              </div>
              <div className=' flex justify-start h-12 my-4 mx-4 text-xl font-bold items-center'>
                <span class="material-symbols-outlined" >
                  edit
                </span><p className='mx-4'>menus</p>
              </div>
            </div>
            <div className='items-end'>
              <button className='bg-blue-500 text-white rounded-xl h-12 text-xl w-full my-4'>Connect Wallet</button>
            </div>
          </div>
        </div>
        :
        <div className='sm:px-8 md:px-10 lg:px-16 px-4 h-full bg-slate-500 py-3.5'>

          <div >
            <nav className=' flex lg:grid lg:grid-cols-3 justify-between'>

              {/* logo and nav section  */}
              <div className='justify-self-start  flex items-center'>

                <div className='text-white pt-2 mx-2  md:hidden lg:hidden' >
                  <button onClick={() => setMenuToggle(!menuToggle)}>

                    <span class="material-symbols-outlined">
                      menu
                    </span>
                  </button>
                </div>

                <div className='h-10 w-10'>
                  <img src={openseaLogo} alt="logo" className='h-fit w-fit' />
                </div>
                <div className='ml-2 text-white'>
                  <p className="font-bold">
                    OpenSea
                  </p>
                </div>
                <div className='w-px h-8 mx-6 bg-gray-500'>
                </div>
                <div className='lg:flex hidden'>
                  <p className='mx-2 text-white'>Drops</p>
                  <p className='mx-2 text-white'>Stats</p>
                </div>
                <div>
                </div>
              </div>

              {/* search bar section  */}
              <div className=' p-2 rounded-xl md:flex lg:flex items-center bg-white bg-opacity-10 bg-blur-xl hidden '>
                <div className='mt-2 pr-2 text-white'>
                  <span class="material-symbols-outlined">
                    search
                  </span>
                </div>
                <input className='bg-transparent border-0 outline-0 text-white' placeholder='Search items, collections, and accounts' />
              </div>

              {/* Wallet and cart section  */}
              <div className='flex justify-self-end'>
                <div className=' bg-opacity-10 rounded-xl flex items-center bg-white bg-blur-xl text-white'>
                  <div className='lg:flex hidden'>
                    <span class="mx-2 material-symbols-outlined">
                      wallet
                    </span>
                    <p className='px-2'>Connect Wallet</p>
                  </div>
                  <div className='border-solid border-white justify-end lg:border lg:border-y-0 lg:border-r-0 h-full hidden md:flex lg:flex items-center border-opacity-20 mx-2 px-4 '>
                    <span class="material-symbols-outlined" >
                      account_circle
                    </span>
                  </div>
                  <div className='border-solid border-white justify-end lg:border border-y-0 border-r-0 h-full lg:hidden md:hidden flex items-center border-opacity-20 mx-2 px-4 '>
                    <span class="material-symbols-outlined" >
                      search
                    </span>
                  </div>
                </div>
                <div className='ml-2 px-4 bg-opacity-10 rounded-xl flex items-center bg-white bg-blur-xl text-white'>
                  <span class="material-symbols-outlined">
                    shopping_cart
                  </span>
                </div>
              </div>

            </nav>

          </div>

          <div className=' w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            <div className='rounded-xl'>
              <img src='https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png' className='rounded-xl  ' />
            </div>
            <div className='rounded-xl '>
              <img src='https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png' className='rounded-xl hidden sm:block' />
            </div>
            <div className='rounded-xl '>
              <img src='https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png' className='rounded-xl hidden md:block ' />
            </div>
            <div className='rounded-xl '>
              <img src='https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png' className='rounded-xl hidden lg:block' />
            </div>
          </div>
        </div>
      }
    </>
  )
};
