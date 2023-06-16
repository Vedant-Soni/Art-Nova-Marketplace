import React from 'react';

const Home = () => {
  return (
    <div>
      <div className=" w-full  mt-4 flex gap-5 sm:px-8 md:px-10 lg:px-16 px-4">
        {/* <div className=" w-full mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:px-8 md:px-10 lg:px-16 px-4"> */}
        <div className="rounded-xl w-full ">
          <img
            src="https://image.mux.com/TWkn1Dn00bl00fj7qZv5RIFzYbKKz97C01jNL1O00CH7gkM/thumbnail.jpg?auto=format&dpr=1&w=2560"
            className="w-screen object-cover h-1/2 rounded-3xl mt-4"
            alt="img"
          />
        </div>
        {/* <div className="rounded-xl ">
          <img
            src="https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png"
            className="rounded-xl hidden sm:block"
            alt="img"
          />
        </div>
        <div className="rounded-xl ">
          <img
            src="https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png"
            className="rounded-xl hidden md:block "
            alt="img"
          />
        </div>
        <div className="rounded-xl ">
          <img
            src="https://nftnow.com/wp-content/uploads/2023/02/Ordinal-Punk-78.png"
            className="rounded-xl hidden lg:block"
            alt="img"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
