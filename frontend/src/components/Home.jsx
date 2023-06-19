import React from 'react';
import cover from '../../src/images/cover.jpg';

const Home = () => {
  return (
    <div>
      <div className=" w-full  mt-4 flex flex-col gap-5 sm:px-8 md:px-10 lg:px-16 px-4">
        <div className="rounded-xl w-full my-6 ">
          <img
            src={cover}
            className="w-screen object-cover h-96 rounded-3xl mt-4"
            alt="img"
          />
        </div>
        <div className="text-left m-2">
          <p className="text-lg">Top NFT </p>
        </div>
        <div className="bg-blue-500 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div className="relative group hover:h-96 hover:absolute">
            <div className="h-48 bg-green-200 rounded-xl ">1 hocer</div>
            <div className="absolute left-0 w-full h-80  bg-red-400 hidden group-hover:block">
              nft in detail
            </div>
          </div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
        </div>

        <div className="text-left m-2">
          <p className="text-lg">ALL NFT COllection </p>
        </div>
        <div className="bg-blue-500 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
          <div className="h-48 bg-green-200 rounded-xl">1</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
