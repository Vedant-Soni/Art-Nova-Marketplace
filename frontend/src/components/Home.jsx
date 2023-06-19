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
        <div className="bg-blue-500 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div className=" bg-green-200 rounded-xl h-full transition-all duration-300 hover:bg-blue-400 flex flex-col justify-between">
            <div className="bg-orange-400 h-fit rounded-xl">
              {/* <img src='' alt='img' /> */}
              this is image area
            </div>
            <div>
              <p>Name</p>
              <p>Price</p>
            </div>
          </div>

          <div className=" bg-green-200 rounded-xl ">1aaa</div>
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
        <div className="bg-blue-500 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          <div className=" bg-green-200 rounded-xl h-full transition-all duration-300 hover:bg-blue-400 flex flex-col justify-between">
            <div className="bg-orange-400 h-fit rounded-xl">
              {/* <img src='' alt='img' /> */}
              this is image area
            </div>
            <div>
              <p>Name</p>
              <p>Price</p>
            </div>
          </div>
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
