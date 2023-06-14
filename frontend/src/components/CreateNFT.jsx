import React, { useState } from 'react';
import { IPFS } from './IPFS';

const CreateNFT = () => {
  const [traitsDropdown, setTraitsDropdown] = useState(false);
  const [traitsType, setTraitType] = useState('');
  const [traitsValue, setTraitsValue] = useState('');
  const [traits, setTraitData] = useState([]);
  const [supply, setSupply] = useState(1);
  const [blockchainDropdown, setBlockchainDropdown] = useState(false);
  const chainName = 'Ethereum';
  const symbolSrc =
    'https://ethresear.ch/uploads/default/original/1X/bc9ee6d276a251519dd12dca7202a9e3658a7eb3.png';
  console.log(
    'length:',
    traits.length,
    'type:',
    traitsType,
    'value:',
    traitsValue,
    'traits:',
    traits,
  );
  const setTrait = () => {
    if (traitsType != '' && traitsValue != '') {
      const currentTrait = {
        traitType: traitsType,
        traitValue: traitsValue,
      };
      setTraitData([...traits, currentTrait]);
    }
  };

  const removeTraits = (index) => {
    const indexToRemove = index; // Index of the object to remove
    if (indexToRemove >= 0 && indexToRemove < traits.length) {
      const newArray = [...traits];
      newArray.splice(indexToRemove, 1);
      setTraitData(newArray);
    }
  };
  return (
    <div>
      <div className="justify-center flex pt-8 text-left">
        {/* title */}
        <div className="bg-yellow-400 w-1/3">
          <p className="text-3xl my-4 p-4">Create New Item</p>
          {/* image upload */}
          <div className="bg-red-200 p-4">
            <IPFS />
          </div>

          {/* Name */}
          <div className="flex flex-col p-4">
            <label> Name</label>
            <input
              type="text"
              placeholder="Item Name"
              className="bg-transparent border border-gray-400 rounded-xl p-4 outline-0"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col p-4">
            <label> Description</label>
            <textarea
              rows=""
              cols=""
              placeholder="provide a detailed description of your item."
              className="bg-transparent border border-gray-400 rounded-xl p-4 outline-0"
            />
          </div>

          {/* properties-traits */}
          <div className="flex flex-col p-4 justify-center ">
            <div className="flex justify-between bg-transparent rounded-xl ">
              <p>Properties</p>
              <div>
                <span
                  class="material-symbols-outlined mx-4 bg-gray-200 rounded-xl p-2 cursor-pointer"
                  onClick={() => setTraitsDropdown(!traitsDropdown)}
                >
                  {!traitsDropdown ? 'add' : 'close'}
                </span>
              </div>
            </div>

            {/* current traits div */}
            {traits.length > 0 ? (
              <div className="bg-transparent border grid grid-cols-3 p-4 gap-2 border-gray-400 rounded-xl my-2 ">
                {traits.map((e, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-blue-100 p-2 rounded-md text-center flex items-center justify-between"
                    >
                      <div>
                        <p>{e.traitType}</p>
                        <p className="text-gray-600">{e.traitValue}</p>
                      </div>
                      <div>
                        <span
                          class="material-symbols-outlined cursor-pointer"
                          onClick={() => {
                            console.log(index);
                            removeTraits(index);
                            // setTraitData(traits.splice(index, 1));
                          }}
                        >
                          close
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
            {/* prop form */}
            {traitsDropdown ? (
              <div className="bg-transparent border border-gray-400 rounded-xl my-2">
                <div className="my-2 flex w-full gap-4 text-center p-6 ">
                  <div>
                    <p>Type</p>
                    <input
                      type="text"
                      placeholder="Type"
                      className="w-full border border-gray-400 rounded-xl p-2 bg-transparent"
                      onChange={(event) => {
                        setTraitType(event.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <p>Name</p>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full border border-gray-400 rounded-xl p-2 bg-transparent"
                      onChange={(event) => {
                        setTraitsValue(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="p-8">
                  <button
                    className="p-2 bg-blue-500 w-full rounded-xl text-white my-2"
                    onClick={() => setTrait()}
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* supply */}
          <div className="flex flex-col p-4">
            <label>Supply</label>
            <input
              type="text"
              placeholder="1"
              className="bg-transparent border border-gray-400 rounded-xl p-4 outline-0"
              onChange={(event) => {
                setSupply(event.target.value);
              }}
            />
          </div>
          {/* Blockchain */}
          <div className="flex flex-col p-4">
            <p>Blockchain</p>
            <div className="border-2 border-gray-200 h-full w-full text-center rounded-xl my-4">
              <div className="p-6 text-xl text-left flex justify-between  ">
                <div className="flex gap-2 ">
                  <img
                    src="https://ethresear.ch/uploads/default/original/1X/bc9ee6d276a251519dd12dca7202a9e3658a7eb3.png"
                    className="h-8 bg-pink-400 rounded-full p-2 "
                  />
                  Ethereum
                </div>
                <span
                  class="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    setBlockchainDropdown(!blockchainDropdown);
                  }}
                >
                  {!blockchainDropdown ? 'expand_more' : 'expand_less'}
                </span>
              </div>
              {blockchainDropdown ? (
                <>
                  <div className="w-full py-4 px-6 border-t text-left border-gray-300 flex items-center gap-2">
                    <img
                      src="https://ethresear.ch/uploads/default/original/1X/bc9ee6d276a251519dd12dca7202a9e3658a7eb3.png"
                      className="h-8 bg-pink-400 rounded-full p-2 "
                    />
                    Sepolia
                  </div>
                  <div className="w-full py-4 px-6 border-t text-left flex item-center  border-gray-300 gap-2">
                    <img
                      src="https://w7.pngwing.com/pngs/659/334/png-transparent-polygon-matic-coin-cryptocoin-exchange-coins-crypto-blockchain-cryptocurrency-logo-glyph-icon-thumbnail.png"
                      className="h-8 bg-pink-400 rounded-full p-2 "
                    />
                    Mumbai
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
