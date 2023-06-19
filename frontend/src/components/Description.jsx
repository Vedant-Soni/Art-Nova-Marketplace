import React, { useState } from 'react';
import { useEffect } from 'react';

const Description = ({ c_id }) => {
  //dropdown hooks
  const [traitsDropdown, setTraitsDropdown] = useState(false);
  const [levelsDropdown, setLevelsDropdown] = useState(false);
  const [detailsDropdown, setDetailsDropdown] = useState(false);

  const descriptionString = 'this is description of nft';
  const traitsAvailable = true;
  const levelsAvailable = true;
  //detail's variable
  const contractAddress = '0x00';
  const tokenId = 123;
  const chain = 'sepolia';
  const tokenStandard = 'ERC721';
  return (
    <div>
      <div className="border-2 border-gray-200 rounded-xl">
        <div className=" h-full w-full text-center rounded-xl my-2">
          {/* description */}
          <div className="p-6 text-xl text-left flex justify-between  ">
            <div className="flex gap-2 items-center">
              <span class="material-symbols-outlined">view_headline</span>
              <p className="text-xl">Description</p>
            </div>
          </div>
          <div className="w-full h-fit border-t text-left p-6 border-gray-300">
            <p className="text-gray-500">{descriptionString}</p>
          </div>
          {/* Traits */}
          {traitsAvailable ? (
            <div className="border-t border-gray-200  text-xl gap-2 text-left ">
              <div className="flex justify-between p-6">
                <div className="flex gap-2">
                  <span class="material-symbols-outlined">label</span>
                  <p className="text-xl ">Traits</p>
                </div>
                <span
                  class="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    setTraitsDropdown(!traitsDropdown);
                  }}
                >
                  {!traitsDropdown ? 'expand_more' : 'expand_less'}
                </span>
              </div>
              {traitsDropdown ? (
                <div className="w-full h-fit border-t p-6 text-gray-500 border-gray-300">
                  this is traits
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          {/* levels */}
          {levelsAvailable ? (
            <div className="border-t border-gray-200  text-xl gap-2 text-left ">
              <div className="flex justify-between p-6">
                <div className="flex gap-2 items-center">
                  <span class="material-symbols-outlined">stars</span>
                  <p className="text-xl ">Levels</p>
                </div>
                <span
                  class="material-symbols-outlined cursor-pointer"
                  onClick={() => {
                    setLevelsDropdown(!levelsDropdown);
                  }}
                >
                  {!levelsDropdown ? 'expand_more' : 'expand_less'}
                </span>
              </div>
              {levelsDropdown ? (
                <div className="w-full h-fit border-t p-6 text-gray-500 border-gray-300">
                  this is levels
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}

          {/* Details */}
          <div className="border-t border-gray-200  text-xl gap-2 text-left ">
            <div className="flex justify-between p-6">
              <div className="flex gap-2 items-center">
                <span class="material-symbols-outlined">full_coverage</span>
                <p className="text-xl ">Details</p>
              </div>
              <span
                class="material-symbols-outlined cursor-pointer"
                onClick={() => {
                  setDetailsDropdown(!detailsDropdown);
                }}
              >
                {!detailsDropdown ? 'expand_more' : 'expand_less'}
              </span>
            </div>

            {detailsDropdown ? (
              <div className="w-full h-fit border-t p-6 text-gray-500 border-gray-300">
                <div className="flex justify-between text-gray-600 text-base ">
                  <p>Contract Address</p> <p>{contractAddress}</p>
                </div>
                <div className="flex justify-between text-gray-600 text-base ">
                  <p>TokenId</p> <p>{tokenId}</p>
                </div>
                <div className="flex justify-between text-gray-600 text-base ">
                  <p>Token Standard</p> <p>{tokenStandard}</p>
                </div>
                <div className="flex justify-between text-gray-600 text-base ">
                  <p>Chain</p> <p>{chain}</p>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
