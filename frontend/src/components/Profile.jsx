import React, { useState } from 'react';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
import Collected from './Collected';
import Created from './Created';
import Favorited from './Favorited';

const Profile = () => {
  const [component, setComponent] = useState('Collected');

  return (
    <div>
      {/* image part  */}
      <div className="relative">
        <div className="lg:h-96 h-36 bg-slate-500 items-center flex md:h-60 sm:h-40 "></div>
        <div className="rounded-full h-24 w-24 lg:h-48 lg:w-48 md:h-36 md:w-36 sm:h-28 sm:w-28 bg-red-300  absolute  left-2 sm:left-4 md:left-6 lg:left-8 -bottom-10 border-2 border-white"></div>
      </div>

      <div className="px-2 sm:px-4 md:px-6 lg:px-8 ">
        {/* name and address */}
        <div className=" h-24 mt-12  px-3.5">
          <div className="flex">
            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl">
              Unnamed
            </p>
          </div>
          <div className="flex">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500">
              address of user
            </p>
          </div>
        </div>

        {/* navigation: collected , created */}
        <div className="h-fit flex border-b-2 border-gray-300 text-gray-700">
          <div
            className={
              component === 'Collected'
                ? 'mx-4 py-2 cursor-pointer text-black border-b-2 border-black'
                : 'mx-4 py-2 cursor-pointer'
            }
            onClick={() => {
              setComponent('Collected');
            }}
          >
            Collected
          </div>
          <div
            className={
              component === 'Created'
                ? 'mx-4 py-2 cursor-pointer text-black border-b-2 border-black'
                : 'mx-4 py-2 cursor-pointer'
            }
            onClick={() => {
              setComponent('Created');
            }}
          >
            Created
          </div>
          <div
            className={
              component === 'Favorited'
                ? 'mx-4 py-2 cursor-pointer text-black border-b-2 border-black'
                : 'mx-4 py-2 cursor-pointer'
            }
            onClick={() => {
              setComponent('Favorited');
            }}
          >
            Favorited
          </div>
        </div>

        {/* navigated componnent */}
        <div>
          {component === 'Collected' ? (
            <Collected />
          ) : component === 'Created' ? (
            <Created />
          ) : component === 'Favorited' ? (
            <Favorited />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
